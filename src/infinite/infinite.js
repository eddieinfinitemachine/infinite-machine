// Infinite configurator page for Olto.
// Standalone shell (dist/infinite/) — reuses the SDK's data + cart layer,
// builds its own DOM. GSAP comes from the page (CDN) like Webflow provides
// it in prod.

// Imported as text (esbuild `loader: {'.css':'text'}`) and injected by mount().
// One artifact, one version pin — the Webflow page cannot drift a separate
// stylesheet tag out of sync with the bundle.
import baseConfig from '../configs/olto.js';
import {
  addLines,
  getCart,
  getCheckoutUrl,
  getCurrentConfigSessionId,
  initCart,
  removeConfig,
  removeLines,
  setDiscountCodes,
  setLineForProduct,
  setProducts,
  startNewConfigSession,
  updateLine,
} from '../lib/cart.js';
import { client } from '../lib/client.js';
import { countries } from '../lib/countries.js';
import { fetchProducts } from '../lib/products.js';
import infiniteCss from './infinite.css';
import { initRepChat, openRepChat } from './intercom.js';
import {
  getState,
  gidForVariant,
  initState,
  numericId,
  setPayMode,
  setRegion,
  subscribe,
} from './state.js';
import {
  ACCESSORY_LAYERS,
  buildPage,
  buildSummaryRows,
  firstVariant,
  formatMoney,
  imgUrl,
  KITS,
  OLTO_WORDMARK_SVG,
  paymentFigures,
  productTitle,
  variantForOptions,
} from './ui.js';

const gsap = window.gsap || null;
if (gsap && window.ScrollTrigger) gsap.registerPlugin(window.ScrollTrigger);

// Shallow clone: boot() writes defaultVariantId, and configs/olto.js is shared
// with the parts-kit engine (src/configurator.js) and /configure-p1.
const config = { ...baseConfig };

// Assigned by mount(). Every query and listener here is scoped to it, which is
// what lets the same UI run standalone or inside the Webflow page.
let app = null;

let products = null;
let wrapVariantsByColor = new Map();
let heroActive = 'a';
let heroShownKey = null;

// Pixel-measured (canvas bbox scan): the EU avif, US Shopify shots, and all
// "3.4" wrap photos frame the bike identically (within ~1%), and the layer
// art registers natively on all of them — NO transform needed. Sand is the
// one exception: a side-view shot that can never register with the layers.
const NON_COMPOSITE_WRAPS = new Set(['Sand']);
// Shipping now (GTM-433). The live page achieved this with a MutationObserver
// patch script (oltodeliverycopy@1.0.0) overwriting the bundle's per-variant
// dates; the new UI states it directly and that patch retires at cutover.
const DELIVERY_COPY = 'Ships now';
const DELIVERY_COPY_SHORT = 'Now'; // the rail carries its own label

// The country NAME, not the code. crm-backend compares it literally
// (resolve-build.ts: `isUS = country === "united states"`), and
// webflow_submissions.country is the only record of the US/international split
// the call sheet has.
let countryName = '';
let variantParamShown = null;
let totalShown = 0;
let totalTween = null;

/**
 * Render the configurator into `root`.
 *
 * Hosts call this — src/infinite/standalone.js for the Vercel demo, and
 * src/olto-configurator.js for the Webflow page. Nothing runs at import time.
 */
export async function mount(root) {
  app = root;
  if (!app) {
    console.error('[Olto] mount(): no root element — nothing rendered.');
    return;
  }
  // Every rule in infinite.css is scoped to this class so the stylesheet cannot
  // reshape the Webflow page it is injected into (or be reshaped by it).
  app.classList.add('olto-cfg');
  injectStyles();
  // One base color (Aug 26 meeting): Silver anodized is the only finish —
  // Black sells as a vinyl wrap now — so Silver becomes the default variant
  // (the upstream config still defaults to Black for the live site).
  const silverId = Object.entries(config.variants).find(([, m]) => /silver/i.test(m.color))?.[0];
  if (silverId) config.defaultVariantId = silverId;

  try {
    products = await fetchProducts(config);
  } catch (err) {
    console.error('[Infinite] Failed to load products:', err);
    renderBootError();
    return;
  }
  await addKitOnlyProducts();

  // Same matching rule as modules/wrap-orchestration.js — the wrap product
  // has one variant per color, keyed by a "Color(s)" option.
  wrapVariantsByColor = buildWrapVariantMap(products.wrap);

  setProducts(products);
  await initCart(config);
  await pruneForeignSessions('boot');
  // KITS (page-defined bundles) feed the store's exact-set active detection
  initState({
    config,
    products,
    bundles: KITS.filter((k) => k.items.length).map((k) => ({
      handle: k.key,
      price: k.price, // tier price replaces the summed item prices when matched
      label: k.label,
      products: k.items.map((h) => ({ handle: h })),
    })),
  });

  // ?layout=rail brings back the three-pane wide-desktop layout (left spec
  // rail) for comparison; the default desktop is the tablet-style two-pane one
  // Eddie picked on Aug 26.
  if (new URLSearchParams(window.location.search).get('layout') === 'rail') {
    app.classList.add('is-rail');
  }

  app.innerHTML = buildPage({ config, products, wrapVariantsByColor });
  bindEvents();
  subscribe(update);
  update(getState());
  initPaneScroll();
  initVideo();
  // Load the messenger behind the page so "Talk to a rep" can open it inline;
  // idle so it never competes with the hero imagery for bandwidth
  const idle = window.requestIdleCallback || ((fn) => setTimeout(fn, 1500));
  idle(() => initRepChat());

  // A shared ?d= link fully describes a configuration — rebuild it into a
  // fresh session (works cross-device; the cart is created on this browser).
  const design = readDesignParam();
  if (design) {
    applyDesign(design);
  } else if (!getState().bikeLine) {
    // The configurator always carries a bike line so the total is honest from
    // first paint (upstream adds it on variant selection).
    setLineForProduct(products.main.handle, gidForVariant(config.defaultVariantId));
  }

  detectRegion();
  pushDataLayer('view_configurator');
  initReveals();

  // Preload wrap vehicle shots so the wrap-color crossfade never flashes
  for (const v of wrapVariantsByColor.values()) {
    if (v.image?.url) new Image().src = v.image.url;
  }
  // Preload the US base shots (Shopify variant images) — the default hero
  for (const v of products.main.variants) {
    if (v.image?.url) new Image().src = imgUrl(v.image.url, 1600);
  }
}

// The Bottom Cover sells but lives outside the accessories collection, so
// fetchProducts never sees it — pull it directly for the Commuter kit
// (Eddie, Aug 26). It joins products.accessories for pricing/cart lookups
// but stays out of the Accessories row (ROW_HIDDEN in ui.js — no photos).
async function addKitOnlyProducts() {
  try {
    const { data } = await client.request(
      `query { product(handle: "bottom-cover") { id handle title availableForSale featuredImage { url altText } variants(first: 5) { edges { node { id title availableForSale price { amount currencyCode } selectedOptions { name value } image { url altText } } } } } }`
    );
    const p = data?.product;
    if (p) products.accessories.push({ ...p, variants: p.variants.edges.map((e) => e.node) });
  } catch (err) {
    console.warn('[Infinite] Kit-only product fetch failed:', err); // Commuter just omits it
  }
}

function buildWrapVariantMap(wrap) {
  const map = new Map();
  if (!wrap) return map;
  for (const v of wrap.variants) {
    const colorOpt = v.selectedOptions?.find((o) => /colou?rs?/i.test(o.name));
    const color = colorOpt?.value || v.title;
    if (color) map.set(color, v);
  }
  return map;
}

function injectStyles() {
  if (document.getElementById('olto-cfg-css')) return;
  const style = document.createElement('style');
  style.id = 'olto-cfg-css';
  style.textContent = infiniteCss;
  document.head.appendChild(style);
}

function renderBootError() {
  app.innerHTML = `
    <div class="boot">
      <div class="boot_mark">INFINITE MACHINE</div>
      <div class="boot_label">Couldn&rsquo;t reach the store. Check your connection.</div>
      <button type="button" class="boot_retry" onclick="location.reload()">Retry</button>
    </div>
  `;
}

// ---------- Events ----------

function bindEvents() {
  app.addEventListener('click', (e) => {
    // Consolidated Color row: '' = Silver (bare base), anything else = a wrap
    const colorSwatch = e.target.closest('[data-color-swatch]');
    if (colorSwatch) return selectWrap(colorSwatch.dataset.colorSwatch);

    const accScroll = e.target.closest('[data-acc-scroll]');
    if (accScroll) return scrollRow('[data-acc-list]', Number(accScroll.dataset.accScroll));

    const accBtn = e.target.closest('[data-acc-toggle]');
    if (accBtn) return toggleAccessory(accBtn.dataset.accToggle);

    // Play badge sits inside the card — it must not also add the accessory
    const accPlay = e.target.closest('[data-acc-play]');
    if (accPlay) return openVideo(accPlay.dataset.accPlay);
    if (e.target.closest('[data-video-close]')) return closeVideo();

    // The whole card is the target, not just its Add button (Eddie, Aug 26 pm:
    // "tapping an accessory here should add it"). The size/colour selects keep
    // their own clicks — picking a variant must not add or drop the line.
    const accCard = e.target.closest('[data-acc]');
    if (accCard && !e.target.closest('select, label')) {
      return toggleAccessory(accCard.dataset.acc);
    }

    const bundleBtn = e.target.closest('[data-bundle]');
    if (bundleBtn) return selectBundle(bundleBtn.dataset.bundle);

    const payBtn = e.target.closest('[data-pay-mode]');
    if (payBtn) return setPayMode(payBtn.dataset.payMode);

    if (e.target.closest('[data-qty-dec]')) return changeQty(-1);
    if (e.target.closest('[data-qty-inc]')) return changeQty(1);

    if (e.target.closest('[data-save]')) {
      // Every save goes through the form (Eddie, Aug 26) — a returning
      // visitor gets it prefilled from their stored lead
      return openLeadModal('save');
    }
    // Rep chat: hand the click to Intercom when the widget is up, otherwise
    // do nothing and let the anchor's href open /contact as before
    if (e.target.closest('[data-rep-chat]')) {
      if (openRepChat({ message: repChatMessage(), lead: getStoredLead() })) {
        e.preventDefault();
      }
      return;
    }
    if (e.target.closest('[data-save-image]')) return saveDesignImage();
    if (e.target.closest('[data-save-close]')) return toggleSaveModal(false);
    if (e.target.closest('[data-config-reset]')) return clearConfiguration();
    if (e.target.closest('[data-cta]')) {
      // The CTA is an <a sf-checkout href={checkoutUrl}> so im-attribution's
      // capture-phase backstop can see it — that listener has already run by
      // the time we get here. Navigation stays on the tested JS path.
      e.preventDefault();
      return primaryAction();
    }
  });

  // The visitor overriding geo-IP. This is the only way `location` gets set
  // when the lookup is blocked, and the only way a mis-geolocated buyer can
  // reach the interest form instead of a checkout we cannot fulfil.
  app.addEventListener('change', (e) => {
    const select = e.target.closest('[data-country]');
    if (select) applyCountry(select.value);
  });

  app.addEventListener('submit', (e) => {
    if (e.target.closest('[data-save-form]')) {
      e.preventDefault();
      submitSaveForm(e.target);
      return;
    }
    // The adopted Webflow form. NEVER preventDefault — Webflow's own AJAX
    // handler owns this submit, and that is what puts the lead in Webflow Forms
    // and fires the form_submission webhook into crm-backend.
    if (e.target.closest('[data-wf-form-slot]')) {
      fillLeadFormSnapshot(); // re-stamp in case the cart settled while open
      pushDataLayer('form_submit', { form_name: 'Olto Interest Form' });
    }
  });

  // Option selects on accessory cards (helmet size/color — team review,
  // Aug 26). Changing an option while the accessory is in the cart swaps the
  // line to the matching variant; before Add it just stages the choice.
  app.addEventListener('change', (e) => {
    const select = e.target.closest('[data-acc-option]');
    if (!select) return;
    const card = select.closest('[data-acc]');
    if (!card) return;
    const handle = card.dataset.acc;
    const added = getState().accessoryLines.some((l) => l.merchandise.product.handle === handle);
    if (!added) return;
    const variant = cardVariant(handle);
    if (variant) setLine(handle, variant.id);
  });
}

// The variant an accessory card currently points at: its option selects if it
// has any, else the first sellable variant.
function cardVariant(handle) {
  const product = products.accessories.find((p) => p.handle === handle);
  if (!product) return null;
  const card = app.querySelector(`[data-acc="${handle}"]`);
  const selects = card ? [...card.querySelectorAll('[data-acc-option]')] : [];
  if (!selects.length) return firstVariant(product);
  const selections = {};
  for (const s of selects) selections[s.dataset.accOption] = s.value;
  return variantForOptions(product, selections) || firstVariant(product);
}

// Shared arrow-scroll for the horizontal card rows (accessories + bundles).
// Roughly one viewport-third per tap. Native smooth scrollBy no-ops on these
// containers in Chrome, and GSAP can't tween scrollLeft on a DOM target
// without ScrollToPlugin (CSSPlugin swallows it) — so tween a proxy object,
// same pattern as updateTotal. 0.45s IM ease as everywhere.
const rowScrollTweens = new Map();
function scrollRow(selector, dir) {
  const list = app.querySelector(selector);
  if (!list) return;
  const from = list.scrollLeft;
  const target = Math.max(0, Math.min(list.scrollWidth - list.clientWidth, from + dir * 320));
  // Same document.hidden guard as updateTotal: rAF pauses in background
  // tabs, which would freeze the tween at frame 0
  if (gsap && !document.hidden) {
    rowScrollTweens.get(selector)?.kill();
    const obj = { v: from };
    rowScrollTweens.set(
      selector,
      gsap.to(obj, {
        v: target,
        duration: 0.45,
        ease: 'power2.out',
        onUpdate: () => {
          list.scrollLeft = obj.v;
        },
      })
    );
  } else {
    list.scrollLeft = target;
  }
}

// The cart write queue drains serially, but a pack batch sent while an
// earlier setLineForProduct is still in flight can be wiped by that write's
// late server snapshot (same race class as the per-product-burst dead end).
// Track single-line writes so selectBundle can wait them out.
let lastLineWrite = Promise.resolve();
function setLine(handle, variantId) {
  const p = setLineForProduct(handle, variantId);
  lastLineWrite = p.catch(() => null); // settled-state only — errors surface on p
  return p;
}

function selectWrap(color) {
  pushDataLayer('select_color', { olto_selected_color: color || 'Silver' });
  const wrapHandle = config.wrap.productHandle;
  if (!color) return setLine(wrapHandle, null);
  const variant = wrapVariantsByColor.get(color);
  if (variant) setLine(wrapHandle, variant.id);
}

// What a removal took down with it, so re-adding the same item puts the set
// back exactly as it was — otherwise dropping the rear rack silently drops the
// basket and mounting plate, and re-adding the rack alone leaves the bundle
// short two items and un-discounted (obodom, Aug 26: "if someone unclicks one
// of the items in accessories and re-adds it, we should make sure the bundle
// discount still applies").
let lastCascade = null;

function toggleAccessory(handle) {
  const state = getState();
  const has = state.accessoryLines.some((l) => l.merchandise.product.handle === handle);
  pushDataLayer(has ? 'remove_accessory' : 'add_accessory', { olto_accessory: handle });
  const deps = config.accessoryDependencies || {};

  if (has) {
    setLine(handle, null);
    // Removing a parent removes the children that require it
    const children = deps[handle]?.requiredBy || [];
    const cascaded = [];
    for (const child of children) {
      if (state.accessoryLines.some((l) => l.merchandise.product.handle === child)) {
        setLine(child, null);
        cascaded.push(child);
      }
    }
    lastCascade = cascaded.length ? { trigger: handle, removed: cascaded } : null;
    return;
  }

  addAccessory(handle);
  if (lastCascade?.trigger === handle) {
    for (const child of lastCascade.removed) addAccessory(child);
    lastCascade = null;
  }
  // Adding a child pulls its required parent in
  for (const [parent, rule] of Object.entries(deps)) {
    if (rule.requiredBy?.includes(handle)) {
      const parentAdded = state.accessoryLines.some((l) => l.merchandise.product.handle === parent);
      if (!parentAdded) addAccessory(parent);
    }
  }
}

function addAccessory(handle) {
  // Cards with option selects (helmet size/color) add the chosen variant
  const variant = cardVariant(handle);
  if (variant) setLine(handle, variant.id);
}

// Pack selection mirrors modules/bundles-ui.js: two BATCH mutations
// (removeLines then addLines) instead of a per-product burst — a burst takes
// seconds to drain through the write queue and the card state flickers the
// whole way. The awaited round trips take ~1-2s, so the tapped card is
// highlighted optimistically (pendingBundleView, read by update()) and a tap
// landing mid-flight queues up instead of being swallowed — latest tap wins.
let bundleBusy = false;
let bundleQueued = null;
let pendingBundleView = null; // { value: handle|null } while a selection is in flight
async function selectBundle(handle) {
  pushDataLayer('select_bundle', { olto_selected_bundle: handle || 'none' });
  if (bundleBusy) {
    if (handle !== pendingBundleView?.value) {
      bundleQueued = handle;
      pendingBundleView = { value: handle };
      update(getState());
    }
    return;
  }
  bundleBusy = true;
  // Tapping the active pack again just clears it
  const intent = getState().activeBundle === handle ? null : handle;
  pendingBundleView = { value: intent };
  update(getState());
  try {
    // Let any in-flight single-line write settle first — its late server
    // snapshot would otherwise wipe this batch's lines
    await lastLineWrite;

    // Selecting a pack replaces the currently-staged accessories
    const lineIds = getState()
      .accessoryLines.map((l) => l.id)
      .filter((id) => !String(id).startsWith('tmp_'));
    if (lineIds.length) await removeLines(lineIds);

    const kit = KITS.find((k) => k.key === handle);
    if (!intent || !kit?.items.length) return;

    const items = kit.items
      .map((h) => {
        const variant = firstVariant(products.accessories.find((a) => a.handle === h));
        // _bundle rides along for checkout-side analytics (same as upstream);
        // the UI's active state is derived from the line set, not this attribute.
        return variant ? { variantId: variant.id, attributes: { _bundle: handle } } : null;
      })
      .filter(Boolean);
    if (items.length) await addLines(items);
  } catch (err) {
    console.error('[Infinite] Bundle select failed:', err);
  } finally {
    bundleBusy = false;
    if (bundleQueued) {
      const next = bundleQueued;
      bundleQueued = null;
      selectBundle(next);
    } else {
      pendingBundleView = null;
      update(getState());
    }
  }
}

function changeQty(delta) {
  pushDataLayer('change_quantity', { olto_quantity_delta: delta });
  const state = getState();
  const lines = [state.bikeLine, state.wrapLine, ...state.accessoryLines].filter(Boolean);
  const next = Math.min(99, Math.max(1, state.quantity + delta));
  if (next === state.quantity) return;
  // Quantity applies to every line in the session — N sets of this config
  // (same semantic as modules/config-quantity.js). Skip optimistic tmp lines;
  // the server sync inherits session quantity for them.
  const real = lines.filter((l) => !String(l.id).startsWith('tmp_'));
  Promise.all(real.map((l) => updateLine({ lineId: l.id, quantity: next })));
}

// ---------- Save / share ----------
// Encodes the whole configuration into a ?d= param:
//   <baseVariantId>.<wrapColor|''>.<qty>.<payMode>.<accHandle~accHandle...>
// Anyone opening the link gets the design rebuilt into a fresh cart session.

/**
 * One cart, one configuration.
 *
 * The Shopify cart is browser-scoped (localStorage olto_cart_olto) but the
 * config session is URL-scoped (?config=). The UI filters lines by
 * `_config_id`; Shopify checkout does not — it charges the whole cart. So any
 * URL-supplied session the cart has never seen strands the previous lines:
 * invisible on the page, still billed.
 *
 * Measured on staging before this existed: build a config ($4,195 shown),
 * open a ?d= share link, then a ?config= link, and the page read $3,495 while
 * the cart held 10 lines across 3 sessions totalling $11,839 — three bikes.
 * Both paths come from the SAVE-AND-SHARE flow, which is the main lead loop,
 * and nothing reconciles them because the cart drawer that could show or
 * remove other sessions is disabled (openCartDrawer has no call sites).
 *
 * Deliberately fixed here and not in lib/cart.js: multi-config is a real
 * feature there (switchToConfig + the drawer) that the parts-kit engine still
 * uses, and that bundle is the rollback path. This UI is single-config, so it
 * enforces that itself. Buying two Oltos is what `quantity` is for.
 */
async function pruneForeignSessions(reason) {
  const current = getCurrentConfigSessionId();
  if (!current) return 0;
  const foreign = (getCart()?.lines || [])
    .filter((l) => {
      // Optimistic lines are client-side only and have no server id to remove.
      if (!l.id || String(l.id).startsWith('tmp_')) return false;
      return l.attributesByKey?._config_id !== current;
    })
    .map((l) => l.id);
  if (!foreign.length) return 0;
  try {
    await removeLines(foreign);
    console.warn(
      `[Olto] Dropped ${foreign.length} cart line(s) from a previous configuration (${reason}). ` +
        'This cart shows one configuration at a time.'
    );
    return foreign.length;
  } catch (err) {
    // Never block the page — but this one matters, so say so loudly.
    console.error('[Olto] Failed to clear stale cart lines; checkout may overcharge:', err);
    return 0;
  }
}

function readDesignParam() {
  const raw = new URLSearchParams(window.location.search).get('d');
  if (!raw) return null;
  const [base, wrap, qty, pay, accs] = raw.split('.');
  if (!base || !config.variants[base]) return null;
  return {
    base,
    wrap: wrap || null,
    qty: Math.min(99, Math.max(1, parseInt(qty, 10) || 1)),
    // 'lease' still parses from old links but maps to cash — the plan is gone
    pay: ['cash', 'finance'].includes(pay) ? pay : 'cash',
    accs: (accs || '').split('~').filter(Boolean),
  };
}

async function applyDesign(design) {
  startNewConfigSession();
  // The shared link rebuilds THIS exact Olto, so it replaces whatever was in
  // the cart rather than stacking on top of it.
  await pruneForeignSessions('shared design');
  const items = [{ variantId: gidForVariant(design.base), quantity: design.qty }];
  const wrapVariant = design.wrap ? wrapVariantsByColor.get(design.wrap) : null;
  if (wrapVariant) items.push({ variantId: wrapVariant.id, quantity: design.qty });
  for (const handle of design.accs) {
    const variant = firstVariant(products.accessories.find((a) => a.handle === handle));
    if (variant) items.push({ variantId: variant.id, quantity: design.qty });
  }
  setPayMode(design.pay);
  try {
    await addLines(items);
  } catch (err) {
    console.error('[Infinite] Failed to apply shared design:', err);
  }
  // Drop ?d= so a reload doesn't re-seed another copy (?config= stays — the
  // cart layer keeps it in sync)
  const params = new URLSearchParams(window.location.search);
  params.delete('d');
  window.history.replaceState({}, '', `${window.location.pathname}?${params.toString()}`);
}

function designUrl() {
  const state = getState();
  const wrapColor = state.wrapLine
    ? wrapColorOf(state.wrapLine.merchandise) || state.wrapLine.merchandise.title
    : '';
  const accs = state.accessoryLines.map((l) => l.merchandise.product.handle).join('~');
  const code = [state.baseNumericId, wrapColor, state.quantity, state.payMode, accs].join('.');
  const url = new URL(window.location.href);
  url.searchParams.set('d', code);
  return url.toString();
}

// What the rep sees in their inbox: the build, the price the visitor is
// looking at, and the ?d= link that rebuilds it on their side.
function repChatMessage() {
  const state = getState();
  const wrap = state.wrapLine
    ? wrapColorOf(state.wrapLine.merchandise) || state.wrapLine.merchandise.title
    : '';
  const base = config.variants[state.baseNumericId]?.color || 'Silver';
  const bits = [wrap ? `${wrap} wrap` : `${base} finish`];
  const accessories = state.accessoryLines.map((l) =>
    productTitle(l.merchandise.product.handle, l.merchandise.product.title)
  );
  if (accessories.length) bits.push(accessories.join(', '));
  if (state.quantity > 1) bits.push(`qty ${state.quantity}`);

  const total = formatMoney(state.total, state.currency);
  let price = `Total ${total}`;
  if (state.payMode === 'finance') {
    const { amount } = paymentFigures(state.total, state.currency, 'finance');
    price = `${formatMoney(amount, state.currency)}/mo with Shop Pay (${total} total)`;
  }

  return [
    'Hi — I’m designing an Olto and have a question.',
    '',
    `My build: ${bits.join(' · ')}`,
    price,
    designUrl(),
    '',
  ].join('\n');
}

// Same action as the live configurator's [data-config-reset] (config-reset.js):
// remove every line in the current session, roll to a fresh session, re-seed
// the default bike. Two-tap confirm instead of window.confirm — no blocking
// native dialog.
let clearArmed = null;
function setClearButtons(text, armed) {
  for (const btn of app.querySelectorAll('[data-config-reset]')) {
    btn.textContent = text;
    btn.classList.toggle('is-armed', armed);
  }
}
async function clearConfiguration() {
  if (!clearArmed) {
    setClearButtons('Tap again to clear', true);
    clearArmed = setTimeout(() => {
      clearArmed = null;
      setClearButtons('Clear configuration', false);
    }, 3000);
    return;
  }
  clearTimeout(clearArmed);
  clearArmed = null;
  setClearButtons('Clear configuration', false);
  try {
    await removeConfig(getCurrentConfigSessionId());
  } catch (err) {
    console.error('[Infinite] Clear failed:', err);
  }
  lastCascade = null;
  setPayMode('cash'); // back to the default view
  // Fresh session starts empty — re-seed the default bike (upstream's
  // main-product-cart does the same on the live site)
  setLineForProduct(products.main.handle, gidForVariant(config.defaultVariantId));
}

function primaryAction() {
  const state = getState();
  if (!state.ready) return;
  if (state.region === 'row') return openLeadModal('row');
  const url = getCheckoutUrl();
  if (!url) return;
  pushDataLayer('begin_checkout', { checkout_url: url });
  window.location.href = url;
}

// ---------- Accessory instruction videos ----------
// The live configurator plays a Bunny HLS clip per accessory from the
// custom.instruction_video metafield (modules/accessory-video.js); this page
// was showing stills only ("put back the videos that are in the current
// configurator" — Eddie, Aug 26 pm). Same sources, same click-to-open modal:
// plays with sound (the click is the user gesture), closes on the backdrop,
// the X, ESC, or when the clip ends.
//
// Safari plays .m3u8 natively; everywhere else needs hls.js, so the library is
// warmed at idle — loading it inside the click would burn the user activation
// and drop us to muted playback.

const HLS_CDN = 'https://cdn.jsdelivr.net/npm/hls.js@1.5.17/dist/hls.min.js';
let hlsLib = null;
let hlsPending = null;
let hlsInstance = null;
let currentVideoUrl = null;

function videoEl() {
  return app.querySelector('[data-video-el]');
}

function nativeHls() {
  return Boolean(videoEl()?.canPlayType('application/vnd.apple.mpegurl'));
}

// Memoized loader — warmed at idle for the browsers we know need it, and
// awaited on demand when a browser that CLAIMED native HLS then fails on it.
function loadHls() {
  if (window.Hls) return Promise.resolve(window.Hls);
  if (hlsPending) return hlsPending;
  hlsPending = new Promise((resolve) => {
    const script = document.createElement('script');
    script.async = true;
    script.src = HLS_CDN;
    script.onload = () => {
      hlsLib = window.Hls || null;
      resolve(hlsLib);
    };
    script.onerror = () => {
      console.warn('[Infinite] hls.js failed to load — videos disabled');
      resolve(null);
    };
    document.head.appendChild(script);
  });
  return hlsPending;
}

function warmHls() {
  if (nativeHls() || window.Hls || hlsLib) return;
  const anyVideo = products?.accessories?.some((p) => p.instructionVideo);
  if (!anyVideo) return;
  loadHls();
}

function openVideo(handle) {
  const product = products?.accessories?.find((p) => p.handle === handle);
  const url = product?.instructionVideo;
  const modal = app.querySelector('[data-video-modal]');
  const video = videoEl();
  if (!url || !modal || !video) return;

  setText('[data-video-title]', productTitle(handle, product.title));
  currentVideoUrl = url;
  const Hls = window.Hls || hlsLib;
  if (nativeHls()) {
    video.src = url;
  } else if (Hls?.isSupported()) {
    if (!hlsInstance) {
      hlsInstance = new Hls({ maxBufferLength: 30 });
      hlsInstance.attachMedia(video);
    }
    hlsInstance.loadSource(url);
  } else {
    video.src = url; // last resort — some browsers manage .m3u8 on their own
  }

  modal.hidden = false;
  video.muted = false;
  // Called inside the click's call stack, so unmuted playback is allowed; if a
  // browser still refuses, fall back to muted rather than a dead player.
  const played = video.play?.();
  if (played?.catch) {
    played.catch(() => {
      video.muted = true;
      video.play?.().catch((err) => console.warn('[Infinite] Video playback blocked:', err));
    });
  }
}

function closeVideo() {
  const modal = app.querySelector('[data-video-modal]');
  const video = videoEl();
  if (!modal || modal.hidden) return;
  video?.pause?.();
  modal.hidden = true;
}

function initVideo() {
  const video = videoEl();
  if (!video) return;
  video.addEventListener('ended', closeVideo);
  // Chrome reports canPlayType('…mpegurl') === 'maybe' and does play HLS; if a
  // browser claims that and then fails, retry the same clip through hls.js
  // instead of leaving a dead player.
  video.addEventListener('error', async () => {
    if (!currentVideoUrl || hlsInstance) return;
    console.warn('[Infinite] Native HLS failed — retrying through hls.js');
    const Hls = window.Hls || hlsLib || (await loadHls());
    if (!Hls?.isSupported() || hlsInstance) return;
    hlsInstance = new Hls({ maxBufferLength: 30 });
    hlsInstance.attachMedia(video);
    hlsInstance.loadSource(currentVideoUrl);
    video.play?.().catch((err) => console.warn('[Infinite] hls.js retry failed:', err));
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeVideo();
  });
  warmHls();
}

// Desktop panes: the sheet is the only scroll container on the page, so a
// wheel over the hero or the left rail did nothing at all — two thirds of the
// window was a dead zone ("weird side scroll", Eddie, Aug 26 pm). Forward
// those gestures to the sheet so the layout reads as one scrolling page.
// Anything that scrolls itself (the sheet, a modal, the accessories row)
// keeps its native behaviour.
function initPaneScroll() {
  const sheet = app.querySelector('.sheet');
  if (!sheet) return;
  const panes = window.matchMedia('(min-width: 900px)');
  window.addEventListener(
    'wheel',
    (e) => {
      if (!panes.matches) return;
      const target = e.target instanceof Element ? e.target : null;
      if (target?.closest('.sheet, .modal')) return;
      // deltaMode: 0 = pixels, 1 = lines, 2 = pages
      const unit = e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? sheet.clientHeight : 1;
      sheet.scrollTop += e.deltaY * unit;
    },
    { passive: true }
  );
}

// The save nudge (a pop-up card that slid in at the Quantity section, run as
// a 50/50 A/B) is gone — Eddie, Aug 26 pm: "remove the pop up". Saving is the
// order bar's Save button, and "Talk to a rep" moved next to Clear
// configuration in the summary/rail.

/**
 * Open the single lead modal.
 *
 * Mirrors modules/primary-action.js:121-134 — rest-of-world sees "Register
 * your interest", the US sees "Save your design", and BOTH submit the one
 * Webflow form. Only the copy differs.
 */
function openLeadModal(mode) {
  const modal = app.querySelector('[data-save-modal]');
  if (!modal) return;
  const row = mode === 'row';
  const title = modal.querySelector('[data-save-title]');
  const copy = modal.querySelector('[data-save-copy]');
  if (title) title.textContent = row ? 'Register your interest' : 'Save your design';
  if (copy) {
    copy.textContent = row
      ? 'Olto ships in the United States and Canada today. Leave your details and we\u2019ll tell you the moment it reaches you.'
      : 'We\u2019ll save this exact Olto so you can pick up where you left off on any device.';
  }
  fillLeadFormSnapshot();
  pushDataLayer(row ? 'interest_form_open' : 'save_configuration_open');
  toggleSaveModal(true);
}

// ---------- Webflow lead-form contract ----------
//
// These hidden inputs are what the parts-kit configurator has always submitted
// (modules/primary-action.js:155-175, which scraped .sf-active out of the DOM).
// crm-backend and the CRM read them as literal strings, so the VALUE FORMATS
// below are a contract, not a preference:
//   location    country NAME ("United States") — resolve-build.ts compares it
//               exactly, lowercased; the call sheet's only US/intl signal
//   accessories comma-joined Shopify product TITLES — re-resolved against
//               product titles by resolve-build.ts:88-98
// `product` is a static hidden input authored in Webflow; never touched here.
function leadFormSnapshot() {
  const state = getState();
  const wrapColor = state.wrapLine
    ? wrapColorOf(state.wrapLine.merchandise) || state.wrapLine.merchandise.title
    : '';
  return {
    location: countryName,
    variant: config.variants?.[state.baseNumericId]?.color || '',
    wrap: wrapColor,
    pack: state.activeBundle || '',
    quantity: String(state.quantity || 1),
    accessories: state.accessoryLines
      .map((l) => l.merchandise.product.title)
      .filter(Boolean)
      .join(', '),
    design_url: designUrl(),
  };
}

/**
 * Write the snapshot into the adopted Webflow form's hidden inputs.
 *
 * Only ever SETS `.value` on inputs that already exist — it must never add,
 * remove or re-render children of that form, because im-attribution stamps its
 * 16 im_* hidden inputs as the form's last children and latches
 * `data-im-stamped` so it will not re-stamp.
 */
function fillLeadFormSnapshot() {
  const form = app.querySelector('[data-wf-form-slot] form');
  if (!form) return; // standalone demo — no Webflow form adopted
  const snap = leadFormSnapshot();
  for (const [name, value] of Object.entries(snap)) {
    const input = form.querySelector(`input[name="${name}"]`);
    if (input) input.value = value;
  }
}

// ---------- dataLayer ----------
//
// GA4 on this site has no tags of its own: all 28 events fire from GTM triggers
// historically bound to DOM selectors and Webflow CSS classes, which a rebuilt
// DOM silently breaks. These explicit pushes are the replacement contract —
// GTM triggers should key on `event` here, never on markup again.
function pushDataLayer(event, extra) {
  try {
    const state = getState();
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event,
      configurator: 'olto',
      olto_variant: config.variants?.[state.baseNumericId]?.color || '',
      olto_wrap: state.wrapLine
        ? wrapColorOf(state.wrapLine.merchandise) || state.wrapLine.merchandise.title
        : '',
      olto_pack: state.activeBundle || '',
      olto_quantity: state.quantity || 1,
      olto_accessory_count: state.accessoryLines.length,
      olto_value: Number(state.total || 0),
      olto_savings: Number(state.bundleSavings || 0),
      olto_currency: state.currency || 'USD',
      olto_region: state.region || 'unresolved',
      olto_config_id: getCurrentConfigSessionId() || '',
      ...(extra || {}),
    });
  } catch (err) {
    console.warn('[Olto] dataLayer push failed:', err); // never block the UI
  }
}

// ---------- Save-design lead capture ----------

// The form fronts every save (repeat visitors get it prefilled) but is
// deliberately NOT wired to a backend yet (Eddie's call, 2026-08-25) — the
// lead only lands in the visitor's own localStorage. When it's time to wire
// it (CRM endpoint), submitSaveForm is the single hook point.
const LEAD_KEY = 'olto_infinite_lead';

function getStoredLead() {
  try {
    const lead = JSON.parse(localStorage.getItem(LEAD_KEY));
    return lead?.email ? lead : null;
  } catch {
    return null;
  }
}

function toggleSaveModal(open) {
  const modal = app.querySelector('[data-save-modal]');
  if (!modal) return;
  modal.hidden = !open;
  if (open) {
    const form = modal.querySelector('[data-save-form]');
    const done = modal.querySelector('[data-save-done]');
    if (form) {
      form.hidden = false;
      const lead = getStoredLead();
      // Legacy leads stored a single `name` — split it across the new
      // first/last fields (Eddie, Aug 26 pm: "break out first and last name
      // ... make sure we're getting all the qualified info")
      const [legacyFirst, ...legacyRest] = (lead?.name || '').split(/\s+/);
      const prefill = {
        first_name: lead?.first || legacyFirst || '',
        last_name: lead?.last || legacyRest.join(' ') || '',
        email: lead?.email || '',
        phone: lead?.phone || '',
      };
      for (const [key, value] of Object.entries(prefill)) {
        const input = form.querySelector(`input[name="${key}"]`);
        if (input && !input.value) input.value = value;
      }
    }
    if (done) done.hidden = true;
    modal.querySelector('input[name="first_name"]')?.focus();
  }
}

async function submitSaveForm(form) {
  const first = form.first_name.value.trim();
  const last = form.last_name.value.trim();
  const email = form.email.value.trim();
  const phone = form.phone.value.trim();
  const error = form.querySelector('[data-save-error]');
  let problem = null;
  if (!first || !last) problem = 'Please add your first and last name.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    problem = 'That email doesn’t look right.';
  } else if (phone.replace(/\D/g, '').length < 7) {
    problem = 'That phone number looks too short.';
  }
  if (problem) {
    if (error) {
      error.textContent = problem;
      error.hidden = false;
    }
    return;
  }
  if (error) error.hidden = true;

  try {
    localStorage.setItem(LEAD_KEY, JSON.stringify({ first, last, email, phone }));
  } catch {
    // Storage blocked (private mode) — the form just shows again next save
  }

  const url = designUrl();
  let copied = true;
  try {
    await navigator.clipboard.writeText(url);
  } catch {
    copied = false;
  }

  form.hidden = true;
  const done = app.querySelector('[data-save-done]');
  if (done) {
    done.hidden = false;
    const msg = done.querySelector('[data-save-done-msg]');
    if (msg) {
      msg.textContent = copied
        ? 'Link copied to your clipboard — it rebuilds this exact Olto.'
        : 'Copy your link below — it rebuilds this exact Olto.';
    }
    const link = done.querySelector('[data-save-link]');
    if (link) link.textContent = url;
  }
}

// ---------- Save-as-image ----------
// "It might also be cool to have an option to save this as an image" (Eddie,
// Aug 26 pm). Renders the current build — hero shot, visible accessory
// layers, config summary — onto a 1080×1350 canvas and downloads it as a
// PNG. Offered only on the post-save panel so the lead form still fronts
// every save. CDN images load with crossOrigin=anonymous (Shopify + Webflow
// both serve ACAO *); if one refuses, the canvas would taint, so we fail
// soft with a note instead of a broken download.

function loadImage(src, cors) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    if (cors) img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`image failed: ${src}`));
    img.src = src;
  });
}

function drawContain(ctx, img, box) {
  const scale = Math.min(box.w / img.naturalWidth, box.h / img.naturalHeight);
  const w = img.naturalWidth * scale;
  const h = img.naturalHeight * scale;
  ctx.drawImage(img, box.x + (box.w - w) / 2, box.y + (box.h - h) / 2, w, h);
}

const IMG_FONT_TEXT = '"Helvetica Now Text", "Helvetica Neue", Helvetica, Arial, sans-serif';
const IMG_FONT_DISPLAY = '"Helvetica Now Display", "Helvetica Neue", Helvetica, Arial, sans-serif';

async function saveDesignImage() {
  const note = app.querySelector('[data-save-image-note]');
  if (note) note.hidden = true;
  try {
    const state = getState();
    const W = 1080;
    const H = 1350;
    const canvas = document.createElement('canvas');
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, W, H);

    // Red Olto wordmark — the inline SVG rasterized via a same-origin blob
    // (the string carries no intrinsic size, so Safari needs it spelled out)
    const svg = OLTO_WORDMARK_SVG.replace('<svg ', '<svg width="922" height="201" ');
    const svgUrl = URL.createObjectURL(new Blob([svg], { type: 'image/svg+xml' }));
    try {
      drawContain(ctx, await loadImage(svgUrl), { x: W / 2 - 160, y: 64, w: 320, h: 70 });
    } finally {
      URL.revokeObjectURL(svgUrl);
    }

    // Hero + the accessory layers currently on the bike — same paint order
    // (DOM order) and the same non-composite suppression rule as the page
    const box = { x: 90, y: 190, w: 900, h: 620 };
    const heroSrc = app.querySelector('.hero_img.is-active')?.src;
    if (heroSrc) drawContain(ctx, await loadImage(heroSrc, true), box);
    const suppressed = app.querySelector('[data-layers]')?.classList.contains('is-suppressed');
    if (!suppressed) {
      for (const el of app.querySelectorAll('.hero_layer.is-on')) {
        try {
          drawContain(ctx, await loadImage(el.src, true), box);
        } catch {
          // one refused layer shouldn't sink the whole export
        }
      }
    }

    // Config summary — same rows the sheet shows
    const rows = [];
    if (state.bikeLine) {
      rows.push([
        `Olto - ${config.variants[state.baseNumericId]?.color || state.bikeLine.merchandise.title}`,
        parseFloat(state.bikeLine.merchandise.price.amount),
      ]);
    }
    if (state.wrapLine) {
      rows.push([
        `Wrap - ${state.wrapLine.merchandise.title}`,
        parseFloat(state.wrapLine.merchandise.price.amount),
      ]);
    }
    for (const l of state.accessoryLines) {
      rows.push([
        productTitle(l.merchandise.product.handle, l.merchandise.product.title),
        parseFloat(l.merchandise.price.amount),
      ]);
    }

    if (state.bundleSavings > 0) {
      rows.push(['Bundle discount', -state.bundleSavings / (state.quantity || 1)]);
    }

    const left = 120;
    const right = W - 120;
    let y = 880;
    const shown = rows.slice(0, 7);
    ctx.font = `26px ${IMG_FONT_TEXT}`;
    for (const [label, amount] of shown) {
      ctx.textAlign = 'left';
      ctx.fillStyle = '#6a6a6a';
      ctx.fillText(label, left, y);
      ctx.textAlign = 'right';
      ctx.fillStyle = '#252525';
      ctx.fillText(formatMoney(amount, state.currency), right, y);
      y += 44;
    }
    if (rows.length > shown.length) {
      ctx.textAlign = 'left';
      ctx.fillStyle = '#6a6a6a';
      ctx.fillText(`+ ${rows.length - shown.length} more`, left, y);
      y += 44;
    }

    y += 8;
    ctx.strokeStyle = '#e5e5e5';
    ctx.beginPath();
    ctx.moveTo(left, y);
    ctx.lineTo(right, y);
    ctx.stroke();
    y += 56;

    ctx.font = `500 34px ${IMG_FONT_DISPLAY}`;
    ctx.textAlign = 'left';
    ctx.fillStyle = '#252525';
    ctx.fillText('Total', left, y);
    ctx.textAlign = 'right';
    ctx.fillText(formatMoney(state.total, state.currency), right, y);
    y += 40;
    if (state.quantity > 1) {
      ctx.font = `22px ${IMG_FONT_TEXT}`;
      ctx.textAlign = 'right';
      ctx.fillStyle = '#6a6a6a';
      ctx.fillText(`${state.quantity} configurations`, right, y);
    }

    ctx.font = `22px ${IMG_FONT_TEXT}`;
    ctx.textAlign = 'left';
    ctx.fillStyle = '#9a9a9a';
    ctx.fillText('Taxes and shipping calculated at checkout - infinitemachine.com', left, H - 80);

    canvas.toBlob((blob) => {
      if (!blob) {
        if (note) {
          note.textContent =
            'Couldn’t generate the image in this browser — a screenshot works too.';
          note.hidden = false;
        }
        return;
      }
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'my-olto.png';
      a.click();
      setTimeout(() => URL.revokeObjectURL(a.href), 10000);
    }, 'image/png');
  } catch (err) {
    console.error('[Infinite] Image export failed:', err);
    if (note) {
      note.textContent = 'Couldn’t generate the image in this browser — a screenshot works too.';
      note.hidden = false;
    }
  }
}

// Region gate: US + Canada order, everyone else registers interest — same
// rule as modules/location-flow.js (geojs.io, 8s safety timeout, unresolved
// region falls through to checkout).
/**
 * Apply a country code: remember the NAME for the CRM, set the sell/lead
 * region, and reflect it in the picker and the desktop rail.
 */
function applyCountry(code, { silent } = {}) {
  const match = countries.find((c) => c.Code === code);
  countryName = match?.Name || '';
  setRegion(SELLABLE.has(code) ? 'us' : 'row');
  const select = app.querySelector('[data-country]');
  if (select && match) select.value = code;
  setText('[data-rail-country]', countryName || '—');
  if (!silent) pushDataLayer('select_country', { olto_country: countryName || code });
}

async function detectRegion() {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 8000);
  try {
    const res = await fetch('https://get.geojs.io/v1/ip/country', { signal: controller.signal });
    const code = (await res.text()).trim().toUpperCase();
    // applyCountry keeps the country NAME, which is the `location` field the
    // CRM splits US from international on — from the same lib/countries.js list
    // the parts-kit <select> used, so the submitted strings are identical.
    applyCountry(code, { silent: true });
  } catch {
    setRegion(''); // unresolved → checkout, matching primary-action.js
  } finally {
    clearTimeout(timer);
  }
}

// ---------- Render updates ----------

/**
 * Keep ?variant= current in the address bar.
 *
 * Not cosmetic: crm-backend parses ?variant= and ?config= off `pageUrl` on the
 * form submission (webhooks/webflow.ts:49-63) into
 * webflow_submissions.shopify_variant_id — the ONLY machine-readable link from
 * a saved build to a real Shopify SKU, and what the follow-up email's one-click
 * cart link is rebuilt from. Existing params (?lp_location=wf, ?config=) and
 * the hash are preserved.
 */
// The Shopify discount codes that price each bundle. Created and verified by
// bin/create-bundle-discounts.mjs; the amounts live in Shopify, not here.
//
// Codes rather than the Shopify Function because an app-owned automatic
// discount can only be created by the app that OWNS the function, and
// olto-bundles has no backend to authenticate as. Same mechanism the
// ambassadors app already uses for referral codes.
const BUNDLE_CODES = {
  commuter: 'OLTO-COMMUTER-BUNDLE',
  cargo: 'OLTO-CARGO-BUNDLE',
  max: 'OLTO-MAX-BUNDLE',
};
const OUR_CODES = new Set(Object.values(BUNDLE_CODES));

// Markets Olto can actually be fulfilled to; everyone else registers interest.
// Was US-only for a day on this branch — Obie corrected it 2026-08-27. Same set
// as modules/location-flow.js US_COUNTRIES, so the two engines agree.
const SELLABLE = new Set(['US', 'CA']);
let lastDiscountSync = null;

/**
 * Keep the cart's discount codes in step with the selected bundle.
 *
 * cartDiscountCodesUpdate REPLACES the whole set, so anything we do not own —
 * a referral or employee code the visitor arrived with — is carried across
 * deliberately. Dropping one would cost a real customer real money.
 *
 * Nothing here decides an amount: Shopify holds those, and state.js reads back
 * what was actually applied, so the page cannot advertise a saving the store
 * would not honour.
 */
async function syncBundleDiscount() {
  const state = getState();
  if (!state.ready) return;
  const want = state.activeBundle ? BUNDLE_CODES[state.activeBundle] : null;
  const current = (getCart()?.discountCodes || []).map((d) => d.code);
  const preserved = current.filter((c) => !OUR_CODES.has(c));
  const next = want ? [want, ...preserved] : preserved;

  const key = [...next].sort().join('|');
  if (key === lastDiscountSync) return;
  lastDiscountSync = key;
  try {
    await setDiscountCodes(next);
  } catch (err) {
    lastDiscountSync = null; // let the next update retry
    console.error('[Olto] Failed to sync bundle discount:', err);
  }
}

function syncVariantParam(id) {
  if (!id || id === variantParamShown) return;
  variantParamShown = id;
  try {
    const params = new URLSearchParams(window.location.search);
    if (params.get('variant') === String(id)) return;
    params.set('variant', String(id));
    window.history.replaceState(
      {},
      '',
      `${window.location.pathname}?${params}${window.location.hash}`
    );
  } catch (err) {
    console.warn('[Olto] variant param sync failed:', err);
  }
}

function update(state) {
  if (!state.ready) return;

  syncVariantParam(state.baseNumericId);
  syncBundleDiscount(); // fire and forget; guarded against redundant calls

  // Per-variant metadata (hero background art). Delivery no longer comes from
  // here — see DELIVERY_COPY.
  const meta = config.variants[state.baseNumericId] || {};
  setText('[data-delivery]', DELIVERY_COPY);
  setText('[data-rail-delivery]', DELIVERY_COPY_SHORT);

  // Color — one row: Silver (bare base) or the active wrap
  const wrapColor = state.wrapLine
    ? wrapColorOf(state.wrapLine.merchandise) || state.wrapLine.merchandise.title
    : '';
  for (const el of app.querySelectorAll('[data-color-swatch]')) {
    el.classList.toggle(
      'is-selected',
      state.wrapLine ? el.dataset.colorSwatch === wrapColor : el.dataset.colorSwatch === ''
    );
  }

  // On-vehicle accessory layers (same mechanism as the live configurator).
  // Combo rules from config.customImageRules swap/hide layers for specific
  // pairs (e.g. soft bag shown inside the rear basket).
  const addedHandles = new Set(state.accessoryLines.map((l) => l.merchandise.product.handle));
  const layerSrc = {};
  const layerHidden = new Set();
  for (const rule of config.customImageRules || []) {
    if (!rule.when.every((h) => addedHandles.has(h))) continue;
    Object.assign(layerSrc, rule.replace || {});
    for (const h of rule.hide || []) layerHidden.add(h);
  }
  let anyLayerOn = false;
  for (const el of app.querySelectorAll('[data-layer]')) {
    const handle = el.dataset.layer;
    const on = addedHandles.has(handle) && !layerHidden.has(handle);
    const src = layerSrc[handle] || ACCESSORY_LAYERS[handle];
    if (src && el.getAttribute('src') !== src) el.setAttribute('src', src);
    el.classList.toggle('is-on', on);
    if (on) anyLayerOn = true;
  }

  // Hero base: accessory layers are aligned to the base bike canvas, so once
  // any layer is showing the base shot wins. The wrapped-vehicle photo (a
  // different shoot) only shows while no accessories are on the bike.
  //
  // Region split (same as the live site's [data-img-local="us"/"eu"] binding):
  // US market shows the Shopify variant image (US-spec bike); the config's
  // backgroundImage is the EU-spec shot and only shows for rest-of-world.
  const usImage = products.main.variants.find((v) => numericId(v.id) === state.baseNumericId)?.image
    ?.url;
  const regionKey = state.region === 'row' ? 'eu' : 'us';
  const baseImage =
    (regionKey === 'eu' ? meta.backgroundImage : imgUrl(usImage, 1600)) ||
    imgUrl(usImage, 1600) ||
    meta.backgroundImage;
  // Wrap photos register onto the layer canvas, so accessories composite on
  // the wrapped bike too. Side-view shots (Sand) can't register — the wrap
  // photo still wins (the color must never vanish when a pack is added;
  // Eddie's call, Aug 26) and the layers hide instead. Black has no wrap
  // photography yet: the black-anodized base shots stand in (vinyl over the
  // same geometry) and take accessory layers natively.
  let wrapImage = state.wrapLine ? wrapVariantsByColor.get(wrapColor)?.image?.url : null;
  let wrapComposites = wrapImage && !NON_COMPOSITE_WRAPS.has(wrapColor);
  if (state.wrapLine && wrapColor === 'Black') {
    const blackVariant = products.main.variants.find(
      (v) => config.variants[numericId(v.id)]?.color === 'Black'
    );
    if (blackVariant?.image?.url) {
      wrapImage = imgUrl(blackVariant.image.url, 1600);
      wrapComposites = true;
    }
  }
  // Custom has no photography at all (its variant image is a placeholder) —
  // the silver base bike stands in
  if (wrapColor === 'Custom') wrapImage = null;
  // Non-composite wrap showing → its layers would misregister; hide them
  app
    .querySelector('[data-layers]')
    ?.classList.toggle('is-suppressed', Boolean(wrapImage) && !wrapComposites && anyLayerOn);
  if (wrapImage) {
    crossfadeHero(wrapImage, `wrap:${wrapColor}`);
  } else {
    crossfadeHero(baseImage, `base:${state.baseNumericId}:${regionKey}`);
  }

  // Bundles — while a selection's round trips are in flight, the tapped
  // card highlights immediately instead of waiting on the cart
  const activeBundle = pendingBundleView ? pendingBundleView.value : state.activeBundle;
  for (const el of app.querySelectorAll('[data-bundle]')) {
    el.classList.toggle('is-selected', el.dataset.bundle === activeBundle);
  }

  // Accessories
  const added = new Set(state.accessoryLines.map((l) => l.merchandise.product.handle));
  for (const el of app.querySelectorAll('[data-acc-toggle]')) {
    const has = added.has(el.dataset.accToggle);
    el.textContent = has ? 'Added' : 'Add';
    el.classList.toggle('is-added', has);
    el.closest('[data-acc]')?.classList.toggle('is-added', has);
  }
  // Cards hold their place in the row. Added ones used to be re-sorted to the
  // end, which yanked the card out from under the tap (Eddie, Aug 26 pm: "the
  // accessories should[n't] leave when tapping them. they should just turn
  // black") — the black is-added state carries the selection now.

  // Quantity
  setText('[data-qty-value]', String(state.quantity));

  // Summary (sheet + desktop rail)
  const rowsHtml = buildSummaryRows(state, config);
  for (const summary of app.querySelectorAll('[data-summary]')) {
    if (summary.innerHTML !== rowsHtml) summary.innerHTML = rowsHtml;
  }
  setText('[data-summary-total]', formatMoney(state.total, state.currency));

  // Payment mode (Cash / Shop Pay Finance — Eddie, Aug 26 pm). Anything
  // that isn't 'finance' (including a legacy 'lease' from an old link)
  // renders as cash.
  const mode = state.payMode === 'finance' ? 'finance' : 'cash';
  const fig = paymentFigures(state.total, state.currency, mode);
  for (const el of app.querySelectorAll('[data-pay-mode]')) {
    el.classList.toggle('is-active', el.dataset.payMode === mode);
  }
  setText('[data-pay-figure]', formatMoney(fig.amount, state.currency) + fig.suffix);
  setText('[data-pay-sub]', fig.sub);

  // Footer reflects the selected payment mode
  updateTotal(fig.amount, fig.suffix, state.currency);
  setText('[data-total-label]', fig.label);
  // Total savings on the sticky bar (obodom, Aug 26: "i think we show the
  // total savings on the bottom sticky banner?")
  for (const el of app.querySelectorAll('[data-total-save]')) {
    el.textContent = state.bundleSavings
      ? `You save ${formatMoney(state.bundleSavings, state.currency)}`
      : '';
    el.hidden = !state.bundleSavings;
  }

  const cta = app.querySelector('[data-cta]');
  if (cta) {
    // Keep the real checkout URL on the anchor so im-attribution can see it.
    const url = state.region === 'row' ? '' : getCheckoutUrl();
    cta.setAttribute('href', url || '#');
  }
  if (cta) cta.textContent = state.region === 'row' ? 'Register interest' : 'Order';
}

function wrapColorOf(merchandise) {
  const opt = merchandise.selectedOptions?.find((o) => /colou?rs?/i.test(o.name));
  return opt?.value || null;
}

// Applies to every match — [data-summary-total], [data-config-reset] etc.
// exist twice (sheet + desktop rail)
function setText(selector, text) {
  for (const el of app.querySelectorAll(selector)) {
    if (el.textContent !== text) el.textContent = text;
  }
}

// IM ease: cubic-bezier(0.215, 0.61, 0.355, 1) at 450ms == easeOutCubic ==
// GSAP power2.out at 0.45 — used for every animated transition on the page.
function updateTotal(value, suffix, currency) {
  const el = app.querySelector('[data-total]');
  if (!el) return;
  // Skip the tween when the tab isn't visible — rAF is throttled there, so a
  // tween would freeze mid-flight and leave a stale figure on screen.
  if (gsap && !document.hidden && totalShown !== value) {
    if (totalTween) totalTween.kill();
    const obj = { v: totalShown };
    totalTween = gsap.to(obj, {
      v: value,
      duration: 0.45,
      ease: 'power2.out',
      onUpdate: () => {
        el.textContent = formatMoney(obj.v, currency) + suffix;
      },
      onComplete: () => {
        el.textContent = formatMoney(value, currency) + suffix;
      },
    });
  } else {
    el.textContent = formatMoney(value, currency) + suffix;
  }
  totalShown = value;
}

function crossfadeHero(src, key) {
  if (!src || key === heroShownKey) return;
  const imgs = {
    a: app.querySelector('[data-hero-img="a"]'),
    b: app.querySelector('[data-hero-img="b"]'),
  };
  if (!imgs.a || !imgs.b) return;

  if (heroShownKey === null) {
    // First paint — buildPage seeded the default variant's image; a restored
    // session may have a different color/wrap, so sync without animating.
    imgs[heroActive].src = src;
    heroShownKey = key;
    return;
  }

  const showing = imgs[heroActive];
  const incoming = imgs[heroActive === 'a' ? 'b' : 'a'];
  incoming.src = src;
  heroActive = heroActive === 'a' ? 'b' : 'a';
  heroShownKey = key;

  if (gsap) {
    gsap.set(incoming, { opacity: 0, scale: 1.04, xPercent: 0, yPercent: 0 });
    incoming.classList.add('is-active');
    gsap.to(incoming, { opacity: 1, scale: 1, duration: 0.45, ease: 'power2.out' });
    gsap.to(showing, {
      opacity: 0,
      duration: 0.45,
      ease: 'power2.out',
      onComplete: () => showing.classList.remove('is-active'),
    });
  } else {
    incoming.classList.add('is-active');
    incoming.style.opacity = 1;
    showing.classList.remove('is-active');
    showing.style.opacity = 0;
  }
}

// (A scroll-linked hero "tray" was tried here for the Aug 26 team review and
// removed the same day — Eddie: "this scroll thing is a little bit janky...
// we should probably just get rid of it.")

function initReveals() {
  if (!gsap || !window.ScrollTrigger) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const scroller = app.querySelector('.sheet');
  for (const section of app.querySelectorAll('.opt')) {
    gsap.from(section, {
      y: 24,
      opacity: 0,
      duration: 0.45,
      ease: 'power2.out',
      scrollTrigger: { trigger: section, scroller, start: 'top 88%', once: true },
    });
  }
}
