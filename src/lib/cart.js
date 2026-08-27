import { client } from './client.js';

// Cart abstraction over Storefront API.
//
// Concepts:
//   - Single cart per browser, persisted via localStorage (`olto_cart_<configId>`)
//   - Cart id is exchanged for a Shopify-hosted checkout URL — that's where Buy goes
//   - Every line added during one configuration session gets a `_config_id`
//     line attribute, so the cart drawer can group items by bike-configuration
//
// Public API:
//   initCart(config) — restore from localStorage or create new
//   addLine / addLines / removeLine / removeLines / updateLineAttributes
//   getCart / getCheckoutUrl / getCurrentConfigSessionId / startNewConfigSession
//   onChange(handler) — pub/sub, fires once immediately with current state

const STORAGE_PREFIX = 'olto_cart_';
const SESSION_PREFIX = 'cfg_';
const URL_SESSION_PARAM = 'config';

let cartId = null;
let cartState = null; // optimistic state — what UI bindings see
let serverCartState = null; // server-confirmed state — what queue decisions use
let configId = null;
// Main product handle — the quantity anchor for a session. See getSessionQuantity.
let mainHandle = null;
let currentConfigSessionId = null;
let handlers = [];
let sessionHandlers = [];

// Apply an API response to BOTH the server-truth state AND the optimistic
// state. After this, both views agree until the next optimistic update.
function applyServerResponse(cart) {
  serverCartState = cart;
  cartState = cart;
}

// Products reference for optimistic line construction. Set once after fetch.
let productsRef = null;
export function setProducts(p) {
  productsRef = p;
}

export async function initCart(config) {
  configId = config.id;
  mainHandle = config.product?.handle || null;
  // Session id resolution order:
  //   1. ?config=<id> in URL (shareable, survives reload)
  //   2. Most-recently-used session from existing cart lines
  //   3. Brand new session id
  currentConfigSessionId = readSessionFromUrl() || newSessionId();

  const stored = readStoredCartId();
  if (stored) {
    try {
      const restored = await queryCart(stored);
      if (restored) {
        cartId = stored;
        applyServerResponse(restored);
      }
    } catch (err) {
      console.warn('[Cart] Failed to restore cart, will create new:', err);
    }
  }

  if (!cartId) {
    const created = await createCart();
    applyServerResponse(created);
    cartId = created.id;
    writeStoredCartId(cartId);
  }

  // If URL didn't specify a session and the cart has lines, adopt the most
  // recent session so the user resumes their last config on reload.
  if (!readSessionFromUrl() && cartState?.lines?.length) {
    const last = latestSessionFromCart(cartState);
    if (last) currentConfigSessionId = last;
  }
  writeSessionToUrl(currentConfigSessionId);

  notify();
  fireSessionChange();
  return cartState;
}

export function getCart() {
  return cartState;
}

export function getCheckoutUrl() {
  return cartState?.checkoutUrl;
}

export function getCurrentConfigSessionId() {
  return currentConfigSessionId;
}

// Call when user clicks "Add another configuration" — next addLine calls
// will be grouped under a new _config_id. URL updates so reload preserves.
export function startNewConfigSession() {
  currentConfigSessionId = newSessionId();
  writeSessionToUrl(currentConfigSessionId);
  fireSessionChange();
  return currentConfigSessionId;
}

// Switch to an existing config (e.g., from cart drawer "Edit" button).
// Other modules (main-product-cart) react to onSessionChange and align URL
// variant + load that config's existing lines into the configurator UI.
export function switchToConfig(sessionId) {
  if (!sessionId || sessionId === currentConfigSessionId) return;
  currentConfigSessionId = sessionId;
  writeSessionToUrl(currentConfigSessionId);
  fireSessionChange();
}

export function onSessionChange(handler) {
  sessionHandlers.push(handler);
  return () => {
    sessionHandlers = sessionHandlers.filter((h) => h !== handler);
  };
}

// Remove all lines belonging to a config session. Used by the cart drawer's
// per-config "Remove" button. If we're removing the CURRENT session, also
// rolls over to a fresh empty session.
export async function removeConfig(sessionId) {
  ensureInitialized();
  const cart = serverCartState;
  const lineIds = (cart?.lines || [])
    .filter((l) => l.attributesByKey?._config_id === sessionId)
    .map((l) => l.id);
  if (lineIds.length === 0) return;
  await removeLines(lineIds);
  if (sessionId === currentConfigSessionId) startNewConfigSession();
}

export async function addLine({ variantId, quantity = 1, attributes = {} }) {
  return addLines([{ variantId, quantity, attributes }]);
}

export async function addLines(items) {
  ensureInitialized();
  const previous = cartState;
  const sessionQty = getSessionQuantity(currentConfigSessionId);

  // ---- Optimistic update ----
  const optimisticLines = items
    .map((item) =>
      buildOptimisticLine(item.variantId, item.quantity || sessionQty, {
        ...(item.attributes || {}),
        _config_id: currentConfigSessionId,
      })
    )
    .filter(Boolean);

  if (optimisticLines.length) {
    cartState = mergeLines(cartState, optimisticLines);
    notify();
  }

  // ---- API in background (under global write lock) ----
  const lines = items.map((item) => ({
    merchandiseId: item.variantId,
    quantity: item.quantity || sessionQty,
    attributes: toAttrPairs({
      ...(item.attributes || {}),
      _config_id: currentConfigSessionId,
    }),
  }));
  try {
    applyServerResponse(
      await withWriteLock(() =>
        runCartMutation(
          'cartLinesAdd',
          `
      mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
        cartLinesAdd(cartId: $cartId, lines: $lines) {
          cart { ${CART_FIELDS} }
          userErrors { field message }
        }
      }
    `,
          { cartId, lines }
        )
      )
    );
    notify();
    return cartState;
  } catch (err) {
    cartState = previous;
    notify();
    throw err;
  }
}

export async function removeLine(lineId) {
  return removeLines([lineId]);
}

export async function removeLines(lineIds) {
  ensureInitialized();
  const previous = cartState;
  const idSet = new Set(lineIds);

  // ---- Optimistic ----
  if (cartState) {
    cartState = { ...cartState, lines: cartState.lines.filter((l) => !idSet.has(l.id)) };
    notify();
  }

  // ---- API in background (under global write lock) ----
  try {
    applyServerResponse(
      await withWriteLock(() =>
        runCartMutation(
          'cartLinesRemove',
          `
      mutation CartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
        cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
          cart { ${CART_FIELDS} }
          userErrors { field message }
        }
      }
    `,
          { cartId, lineIds }
        )
      )
    );
    notify();
    return cartState;
  } catch (err) {
    cartState = previous;
    notify();
    throw err;
  }
}

// Update one or more aspects of a line in a single mutation. Use this for
// variant swaps (e.g. wrap color change) instead of remove + add — one API
// round-trip instead of two, no UI flicker.
//
//   await updateLine({ lineId, variantId: newVariantGid })       // swap variant
//   await updateLine({ lineId, quantity: 2 })                     // change qty
//   await updateLine({ lineId, attributes: { note: 'gift' } })    // change attrs
//   // any combination of the above also works
export async function updateLine({ lineId, variantId, quantity, attributes }) {
  ensureInitialized();
  const previous = cartState;

  // ---- Optimistic ----
  if (cartState) {
    cartState = {
      ...cartState,
      lines: cartState.lines.map((l) => {
        if (l.id !== lineId) return l;
        const next = { ...l };
        if (variantId !== undefined) {
          const merch = buildMerchandise(variantId) || l.merchandise;
          next.merchandise = merch;
        }
        if (quantity !== undefined) next.quantity = quantity;
        if (attributes !== undefined) {
          const pairs = toAttrPairs(attributes);
          next.attributes = pairs;
          next.attributesByKey = Object.fromEntries(pairs.map((a) => [a.key, a.value]));
        }
        return next;
      }),
    };
    notify();
  }

  // ---- API in background ----
  const update = { id: lineId };
  if (variantId !== undefined) update.merchandiseId = variantId;
  if (quantity !== undefined) update.quantity = quantity;
  if (attributes !== undefined) update.attributes = toAttrPairs(attributes);

  try {
    applyServerResponse(
      await withWriteLock(() =>
        runCartMutation(
          'cartLinesUpdate',
          `
      mutation CartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
        cartLinesUpdate(cartId: $cartId, lines: $lines) {
          cart { ${CART_FIELDS} }
          userErrors { field message }
        }
      }
    `,
          { cartId, lines: [update] }
        )
      )
    );
    notify();
    return cartState;
  } catch (err) {
    cartState = previous;
    notify();
    throw err;
  }
}

// Back-compat thin wrapper — same behavior as before, just routed through updateLine
export async function updateLineAttributes(lineId, attributes) {
  return updateLine({ lineId, attributes });
}

// Set cart-level attributes (metadata that persists with the cart, restored
// on reload). Used for UI state that isn't a Shopify "thing" — e.g. which
// bundle preset the user clicked. Optimistic + coalesced under key "cart:attrs".
//
//   await setCartAttributes({ _active_bundle: 'basic' });
//   await setCartAttributes({ _active_bundle: '' });  // clear
/**
 * Replace the cart's discount codes.
 *
 * Shopify's cartDiscountCodesUpdate REPLACES the whole set rather than adding,
 * so callers must pass every code they want to keep — see syncBundleDiscount()
 * in src/infinite/infinite.js, which preserves any code it does not own so a
 * referral or employee code is never silently dropped.
 */
export async function setDiscountCodes(codes) {
  ensureInitialized();
  const next = [...new Set((codes || []).filter(Boolean))];
  return coalesce(`cart:discounts`, async () => {
    applyServerResponse(
      await runCartMutation(
        'cartDiscountCodesUpdate',
        `
      mutation($cartId: ID!, $discountCodes: [String!]!) {
        cartDiscountCodesUpdate(cartId: $cartId, discountCodes: $discountCodes) {
          cart { ${CART_FIELDS} } userErrors { field message }
        }
      }
    `,
        { cartId, discountCodes: next }
      )
    );
    notify();
  });
}

export async function setCartAttributes(attrs) {
  ensureInitialized();
  const pairs = toAttrPairs(attrs);
  const byKey = Object.fromEntries(pairs.map((a) => [a.key, a.value]));

  // Optimistic: merge into existing attributes so unrelated keys are preserved
  if (cartState) {
    const merged = { ...(cartState.attributesByKey || {}), ...byKey };
    const mergedPairs = Object.entries(merged).map(([key, value]) => ({ key, value }));
    cartState = { ...cartState, attributes: mergedPairs, attributesByKey: merged };
    notify();
  }

  return coalesce(`cart:attrs`, async () => {
    applyServerResponse(
      await runCartMutation(
        'cartAttributesUpdate',
        `
      mutation($cartId: ID!, $attributes: [AttributeInput!]!) {
        cartAttributesUpdate(cartId: $cartId, attributes: $attributes) {
          cart { ${CART_FIELDS} } userErrors { field message }
        }
      }
    `,
        { cartId, attributes: pairs }
      )
    );
    notify();
  });
}

export function onChange(handler) {
  handlers.push(handler);
  if (cartState) handler(cartState);
  return () => {
    handlers = handlers.filter((h) => h !== handler);
  };
}

// ----- Internal -----

const CART_FIELDS = `
  id
  checkoutUrl
  totalQuantity
  attributes { key value }
  discountCodes { code applicable }
  cost {
    subtotalAmount { amount currencyCode }
    totalAmount { amount currencyCode }
  }
  lines(first: 100) {
    edges {
      node {
        id
        quantity
        attributes { key value }
        discountAllocations { discountedAmount { amount currencyCode } }
        merchandise {
          ... on ProductVariant {
            id
            title
            price { amount currencyCode }
            image { url altText }
            product { id handle title }
            selectedOptions { name value }
          }
        }
      }
    }
  }
`;

async function createCart() {
  const { data, errors } = await client.request(`
    mutation CartCreate {
      cartCreate(input: {}) {
        cart { ${CART_FIELDS} }
        userErrors { field message }
      }
    }
  `);
  if (errors) throw new Error(`[Cart] createCart errors: ${JSON.stringify(errors)}`);
  const userErrors = data?.cartCreate?.userErrors;
  if (userErrors?.length)
    throw new Error(`[Cart] createCart userErrors: ${JSON.stringify(userErrors)}`);
  return flattenCart(data.cartCreate.cart);
}

async function queryCart(id) {
  const { data, errors } = await client.request(
    `
    query GetCart($id: ID!) {
      cart(id: $id) { ${CART_FIELDS} }
    }
  `,
    { variables: { id } }
  );
  if (errors) throw new Error(`[Cart] queryCart errors: ${JSON.stringify(errors)}`);
  if (!data?.cart) return null;
  return flattenCart(data.cart);
}

async function runCartMutation(name, mutationGql, variables) {
  const { data, errors } = await client.request(mutationGql, { variables });
  if (errors) throw new Error(`[Cart] ${name} errors: ${JSON.stringify(errors)}`);
  const result = data?.[name];
  if (result?.userErrors?.length) {
    throw new Error(`[Cart] ${name} userErrors: ${JSON.stringify(result.userErrors)}`);
  }
  return flattenCart(result.cart);
}

function flattenCart(cart) {
  const cartAttrs = cart.attributes || [];
  return {
    id: cart.id,
    checkoutUrl: cart.checkoutUrl,
    totalQuantity: cart.totalQuantity,
    cost: cart.cost,
    attributes: cartAttrs,
    attributesByKey: Object.fromEntries(cartAttrs.map((a) => [a.key, a.value])),
    lines: cart.lines.edges.map(({ node: line }) => ({
      id: line.id,
      quantity: line.quantity,
      attributes: line.attributes,
      attributesByKey: Object.fromEntries(line.attributes.map((a) => [a.key, a.value])),
      // What Shopify actually took off this line. A code discount is allocated
      // per line, and cost.subtotalAmount is already NET of it, so this is the
      // only place the saving can be read back — see state.js.
      discountedAmount: (line.discountAllocations || []).reduce(
        (sum, a) => sum + parseFloat(a.discountedAmount?.amount || 0),
        0
      ),
      merchandise: line.merchandise,
    })),
  };
}

function toAttrPairs(obj) {
  return Object.entries(obj)
    .filter(([, v]) => v != null && v !== '')
    .map(([key, value]) => ({ key, value: String(value) }));
}

function ensureInitialized() {
  if (!cartId) throw new Error('[Cart] Called before initCart(config)');
}

function notify() {
  for (const h of handlers) h(cartState);
}

function newSessionId() {
  return `${SESSION_PREFIX}${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

// What qty should a new line in this session use? The session's CONFIGURATION
// quantity — "N sets of this config" — which is the main product's line.
//
// Anchored to the main product rather than "any session line": accessories can
// now carry their own multiple (two helmets on one bike), so the first line to
// hand is no longer a reliable stand-in. Without the anchor, adding a second
// accessory after bumping the helmet to 2 would silently join at 2 as well.
// Falls back to the old behaviour when the main product isn't in the session
// yet (the very first write) or when no handle was configured.
function getSessionQuantity(sessionId) {
  const cart = serverCartState || cartState;
  if (!cart?.lines?.length) return 1;
  const inSession = cart.lines.filter((l) => l.attributesByKey?._config_id === sessionId);
  const anchor =
    (mainHandle && inSession.find((l) => l.merchandise?.product?.handle === mainHandle)) ||
    inSession[0];
  return anchor?.quantity || 1;
}

function fireSessionChange() {
  for (const h of sessionHandlers) h(currentConfigSessionId);
}

function readSessionFromUrl() {
  if (typeof window === 'undefined') return null;
  return new URLSearchParams(window.location.search).get(URL_SESSION_PARAM);
}

function writeSessionToUrl(id) {
  if (typeof window === 'undefined') return;
  const params = new URLSearchParams(window.location.search);
  if (id) params.set(URL_SESSION_PARAM, id);
  else params.delete(URL_SESSION_PARAM);
  window.history.replaceState({}, '', `${window.location.pathname}?${params.toString()}`);
}

function latestSessionFromCart(cart) {
  if (!cart?.lines?.length) return null;
  // Sessions are timestamp-prefixed (cfg_<ms>_<rand>) — picking the
  // lexicographically largest gives the newest.
  const sessions = cart.lines
    .map((l) => l.attributesByKey?._config_id)
    .filter(Boolean)
    .sort();
  return sessions[sessions.length - 1] || null;
}

// ----- Global write serialization + per-key coalescing -----
//
// Two layers:
//   1. Global write lock: ensures only ONE cart API request is in flight at
//      a time, regardless of which call site invoked it. Without this, a
//      bundle addLines + a swatch setLineForProduct can both queue API calls
//      in parallel — the swatch op reads cartState before addLines responds,
//      sees no real helmet line, and adds a SECOND one. Tom hit this.
//   2. Per-key coalesce (unchanged): for rapid clicks on the same product,
//      only the latest op runs. 3 clicks (Sand → Crimson → Sky) → at most 2
//      API calls.
//
// All cart mutations route their API call through `withWriteLock` to take
// part in the serialization. Optimistic updates remain instant (no lock).

let writeChain = Promise.resolve();

async function withWriteLock(fn) {
  const previous = writeChain;
  let release;
  writeChain = new Promise((r) => {
    release = r;
  });
  await previous;
  try {
    return await fn();
  } finally {
    release();
  }
}

const opQueues = new Map(); // key -> { inflight: Promise | null, latest: () => Promise }

function coalesce(key, op) {
  const entry = opQueues.get(key) || { inflight: null, latest: null };
  entry.latest = op;
  opQueues.set(key, entry);

  if (entry.inflight) return entry.inflight;

  entry.inflight = (async () => {
    while (entry.latest) {
      const next = entry.latest;
      entry.latest = null;
      try {
        // Each coalesce op takes the global write lock for its API portion.
        // This way coalesced ops on different keys still serialize.
        await withWriteLock(next);
      } catch (err) {
        console.error(`[Cart] coalesce(${key}) error:`, err);
      }
    }
    entry.inflight = null;
    opQueues.delete(key);
  })();

  return entry.inflight;
}

// High-level "I want product X to have variant Y (or be absent if null)".
// Cart figures out add/update/remove based on current state. Coalesced per
// product handle — rapid clicks coalesce to one final API call.
//
//   await setLineForProduct('olto-wrap', sandVariantGid)     // add or swap
//   await setLineForProduct('olto-wrap', null)               // remove
export async function setLineForProduct(productHandle, variantId) {
  ensureInitialized();
  const sessionAtCall = currentConfigSessionId;

  // ---- Optimistic update of local cart ----
  if (cartState) {
    // Find existing line for this product IN THE CURRENT SESSION — must be
    // session-scoped so adding a bike for session B doesn't clobber session
    // A's bike line.
    const existingIdx = cartState.lines.findIndex(
      (l) =>
        l.merchandise.product.handle === productHandle &&
        l.attributesByKey?._config_id === sessionAtCall
    );

    if (existingIdx >= 0 && variantId === null) {
      // Optimistic remove
      cartState = {
        ...cartState,
        lines: cartState.lines.filter((_, i) => i !== existingIdx),
      };
    } else if (existingIdx >= 0 && variantId) {
      // Optimistic update (swap merchandise on existing line)
      const newMerch = buildMerchandise(variantId);
      if (newMerch) {
        cartState = {
          ...cartState,
          lines: cartState.lines.map((l, i) =>
            i === existingIdx ? { ...l, merchandise: newMerch } : l
          ),
        };
      }
    } else if (existingIdx < 0 && variantId) {
      // Optimistic add — match session qty so multi-qty configs add new
      // accessories at the right quantity from the first paint.
      const qty = getSessionQuantity(sessionAtCall);
      const line = buildOptimisticLine(variantId, qty, { _config_id: sessionAtCall });
      if (line) cartState = mergeLines(cartState, [line]);
    }
    notify();
  }

  // ---- Coalesced API call ----
  // The closure captures `variantId` = the LATEST click's intent. We treat
  // it as the source of truth and unconditionally fire the right API based
  // on whether a real (non-tmp) line exists for this product.
  //
  // Critical: do NOT check `existing.merchandise.id !== variantId` here —
  // the optimistic update already changed local state, so that check would
  // skip the API and leave the server out of sync (Tom hit this bug:
  // wrap reverted to whatever the server last knew on reload).
  // Coalesce per (product, session) — different sessions for the same
  // product (e.g., bike in config A vs config B) get their own queues so
  // they don't fight each other.
  return coalesce(`product:${productHandle}:${sessionAtCall}`, async () => {
    // Use serverCartState (last confirmed by API) AND filter by session.
    const realLine = serverCartState?.lines.find(
      (l) =>
        l.merchandise.product.handle === productHandle &&
        l.attributesByKey?._config_id === sessionAtCall
    );

    if (variantId === null) {
      if (realLine) {
        applyServerResponse(
          await runCartMutation(
            'cartLinesRemove',
            `
          mutation($cartId: ID!, $lineIds: [ID!]!) {
            cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
              cart { ${CART_FIELDS} } userErrors { field message }
            }
          }
        `,
            { cartId, lineIds: [realLine.id] }
          )
        );
        notify();
      }
      return;
    }

    // variantId is set — either update existing real line or add new
    if (realLine) {
      applyServerResponse(
        await runCartMutation(
          'cartLinesUpdate',
          `
        mutation($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
          cartLinesUpdate(cartId: $cartId, lines: $lines) {
            cart { ${CART_FIELDS} } userErrors { field message }
          }
        }
      `,
          { cartId, lines: [{ id: realLine.id, merchandiseId: variantId }] }
        )
      );
    } else {
      // New lines join the session at the session's current quantity —
      // so adding an accessory while the config qty is 2 doesn't leave the
      // accessory stuck at qty 1.
      const sessionQty = getSessionQuantity(sessionAtCall);
      applyServerResponse(
        await runCartMutation(
          'cartLinesAdd',
          `
        mutation($cartId: ID!, $lines: [CartLineInput!]!) {
          cartLinesAdd(cartId: $cartId, lines: $lines) {
            cart { ${CART_FIELDS} } userErrors { field message }
          }
        }
      `,
          {
            cartId,
            lines: [
              {
                merchandiseId: variantId,
                quantity: sessionQty,
                // Use the session captured at call time, not current — the queue
                // may have moved on (user switched configs).
                attributes: toAttrPairs({ _config_id: sessionAtCall }),
              },
            ],
          }
        )
      );
    }
    notify();
  });
}

// ----- Optimistic-update helpers -----

// Locate a variant in productsRef and shape it like a cart merchandise object.
// Returns null if productsRef isn't set (cart will still send the API call —
// just no instant UI update).
function buildMerchandise(variantGid) {
  if (!productsRef) return null;
  const all = [productsRef.main, productsRef.wrap, ...(productsRef.accessories || [])].filter(
    Boolean
  );
  for (const product of all) {
    const variant = product.variants.find((v) => v.id === variantGid);
    if (!variant) continue;
    return {
      id: variant.id,
      title: variant.title,
      price: variant.price,
      image: variant.image,
      selectedOptions: variant.selectedOptions,
      product: { id: product.id, handle: product.handle, title: product.title },
    };
  }
  return null;
}

// Construct an optimistic line. Uses a temp id (tmp_*) — replaced when API
// responds. Subscribers see the line immediately for instant UI feedback.
function buildOptimisticLine(variantGid, quantity, attributes) {
  const merch = buildMerchandise(variantGid);
  if (!merch) return null;
  const pairs = toAttrPairs(attributes);
  return {
    id: `tmp_${Math.random().toString(36).slice(2, 10)}`,
    quantity,
    attributes: pairs,
    attributesByKey: Object.fromEntries(pairs.map((a) => [a.key, a.value])),
    merchandise: merch,
  };
}

// Append new lines to an existing cart state (used for optimistic add).
function mergeLines(cart, newLines) {
  if (!cart) return cart;
  return {
    ...cart,
    lines: [...cart.lines, ...newLines],
    totalQuantity: (cart.totalQuantity || 0) + newLines.reduce((n, l) => n + (l.quantity || 1), 0),
  };
}

function readStoredCartId() {
  if (typeof localStorage === 'undefined') return null;
  return localStorage.getItem(`${STORAGE_PREFIX}${configId}`);
}

function writeStoredCartId(id) {
  if (typeof localStorage === 'undefined') return;
  localStorage.setItem(`${STORAGE_PREFIX}${configId}`, id);
}
