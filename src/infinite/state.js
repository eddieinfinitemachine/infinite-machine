// Derived-state store for the Infinite configurator page.
//
// The cart (lib/cart.js) is the single source of truth — every selection the
// user makes becomes a cart line tagged with the current `_config_id`. This
// store subscribes to cart changes and derives the view model the UI renders
// from. It deliberately does NOT import lib/selection.js, which hard-couples
// to the Webflow DOM (variant-observer's ?variant= polling, location-flow's
// #country select).

import { getCurrentConfigSessionId, onChange } from '../lib/cart.js';

let config = null;
let products = null;
let bundles = [];

let listeners = [];

const state = {
  ready: false,
  region: '', // 'us' | 'row' | '' (unresolved — treated as checkout, same as upstream)
  baseNumericId: null, // numeric variant id of the selected base color
  bikeLine: null,
  wrapLine: null,
  accessoryLines: [],
  accessoryQty: {}, // handle -> count per configuration (absent = 1)
  activeBundle: null, // bundle handle when session accessories exactly match a bundle
  bundleSavings: 0, // item value minus the matched bundle's tier price
  quantity: 1,
  total: 0,
  currency: 'USD',
  payMode: 'cash', // 'cash' | 'lease' | 'finance' — picker scratched (team review, Aug 26); cash is the view
  cart: null,
};

export function numericId(gid) {
  return String(gid).split('/').pop();
}

export function gidForVariant(numeric) {
  return `gid://shopify/ProductVariant/${numeric}`;
}

export function initState(ctx) {
  config = ctx.config;
  products = ctx.products;
  bundles = ctx.bundles || [];
  state.baseNumericId = config.defaultVariantId;
  // onChange fires immediately with current cart state (initCart ran first)
  onChange(recompute);
}

export function getState() {
  return state;
}

export function subscribe(fn) {
  listeners.push(fn);
  return () => {
    listeners = listeners.filter((l) => l !== fn);
  };
}

export function setRegion(region) {
  state.region = region;
  emit();
}

export function setPayMode(mode) {
  state.payMode = mode;
  emit();
}

function emit() {
  for (const fn of listeners) fn(state);
}

function recompute(cart) {
  const sessionId = getCurrentConfigSessionId();
  const lines = (cart?.lines || []).filter((l) => l.attributesByKey?._config_id === sessionId);

  const mainHandle = products.main.handle;
  const wrapHandle = config.wrap?.productHandle;
  const accessoryHandles = new Set(products.accessories.map((p) => p.handle));

  state.cart = cart;
  state.bikeLine = lines.find((l) => l.merchandise.product.handle === mainHandle) || null;
  state.wrapLine = lines.find((l) => l.merchandise.product.handle === wrapHandle) || null;
  state.accessoryLines = lines.filter((l) => accessoryHandles.has(l.merchandise.product.handle));

  if (state.bikeLine) state.baseNumericId = numericId(state.bikeLine.merchandise.id);

  // The CONFIGURATION quantity — "N sets of this config", same semantic as
  // modules/config-quantity.js. Anchored to the bike line, not lines[0]:
  // accessories can now carry their own multiple (two helmets on one bike), so
  // a line's raw quantity is configQty × its own count and only the bike is
  // guaranteed to be exactly configQty.
  state.quantity = state.bikeLine?.quantity || lines[0]?.quantity || 1;

  // Per-accessory count, independent of how many configurations are ordered.
  // A cart line holds configQty × accQty, so this divides the anchor back out.
  state.accessoryQty = {};
  for (const l of state.accessoryLines) {
    const each = Math.max(1, Math.round((l.quantity || 1) / state.quantity));
    state.accessoryQty[l.merchandise.product.handle] = each;
  }

  // Client-side sum of session line prices — matches modules/price-display.js.
  // Excludes tax/shipping; Shopify is authoritative at checkout.
  let total = 0;
  for (const l of lines) {
    total += parseFloat(l.merchandise.price.amount) * (l.quantity || 1);
    if (l.merchandise.price.currencyCode) state.currency = l.merchandise.price.currencyCode;
  }

  // Active bundle = the session CONTAINS every product in a bundle. A superset
  // counts: adding a helmet on top of the Commuter kit used to drop the match,
  // which silently pulled the discount code off the cart and charged full price
  // for the kit ("make sure the bundle discount is still applied if someone ADDS
  // something to the cart but also has the bundle" — obodom, Aug 27). Punishing
  // an upsell was exactly backwards.
  //
  // Largest kit first, so a cart holding all of Max is credited as Max rather
  // than as the Commuter subset it also contains. Because the test is on the
  // SET, an accessory removed and re-added lands back in the bundle and the
  // discount comes back with it (obodom, Aug 26).
  const selected = new Set(state.accessoryLines.map((l) => l.merchandise.product.handle));
  state.activeBundle = null;
  let activeKit = null;
  const bySize = [...bundles].sort((a, b) => (b.products?.length || 0) - (a.products?.length || 0));
  for (const b of bySize) {
    const members = (b.products || []).map((p) => p.handle);
    if (members.length && members.every((h) => selected.has(h))) {
      state.activeBundle = b.handle;
      activeKit = b;
      break;
    }
  }

  // Bundle pricing comes from SHOPIFY, never from local arithmetic.
  //
  // This used to compute the tier saving here and subtract it from the
  // displayed total, which made the page quote a number the store would not
  // honour: the cart held full-price lines, so checkout charged the
  // undiscounted sum. Measured on staging: page $4,195, Shopify $4,321.
  //
  // The authoritative figure is what the store actually took off. Note it is
  // NOT cost.subtotalAmount - cost.totalAmount: a code discount is allocated
  // PER LINE and subtotalAmount is already net of it, so that difference is
  // always zero. The real amount is the sum of the lines' own
  // discountAllocations (cart.js exposes it as line.discountedAmount).
  //
  // Reading it back rather than trusting the tier price means the page can
  // only ever show a saving Shopify agreed to: if a code stops applying, the
  // honest a-la-carte price appears instead of a silent overcharge.
  const lineDiscounts = lines.reduce((sum, l) => sum + (l.discountedAmount || 0), 0);
  state.bundleSavings = lineDiscounts > 0 ? lineDiscounts : 0;
  total -= state.bundleSavings;

  if (activeKit && typeof activeKit.price === 'number' && state.bundleSavings === 0) {
    // Loud on purpose: a matched bundle with no discount is money the customer
    // was shown and will not get.
    console.warn(
      `[Olto] Bundle "${activeKit.handle}" is in the cart but Shopify applied no discount. ` +
        'Checkout will bill the full component price.'
    );
  }
  state.total = total;

  state.ready = true;
  emit();
}
