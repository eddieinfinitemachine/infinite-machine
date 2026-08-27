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

  // One quantity applies to every line in the session ("N sets of this
  // configuration") — same semantic as modules/config-quantity.js.
  state.quantity = lines[0]?.quantity || 1;

  // Client-side sum of session line prices — matches modules/price-display.js.
  // Excludes tax/shipping; Shopify is authoritative at checkout.
  let total = 0;
  for (const l of lines) {
    total += parseFloat(l.merchandise.price.amount) * (l.quantity || 1);
    if (l.merchandise.price.currencyCode) state.currency = l.merchandise.price.currencyCode;
  }

  // Active bundle = session accessory set exactly matches a bundle's product
  // set (same rule as lib/selection.js). Because the test is on the SET, an
  // accessory that is removed and re-added lands back in the bundle and the
  // discount comes back with it (obodom, Aug 26).
  const selected = new Set(state.accessoryLines.map((l) => l.merchandise.product.handle));
  state.activeBundle = null;
  let activeKit = null;
  for (const b of bundles) {
    const members = (b.products || []).map((p) => p.handle);
    if (
      members.length &&
      members.length === selected.size &&
      members.every((h) => selected.has(h))
    ) {
      state.activeBundle = b.handle;
      activeKit = b;
      break;
    }
  }

  // Bundle pricing: the tier price REPLACES the summed item prices, so a
  // matched bundle bills base + tier, not base + every accessory (obodom,
  // Aug 26: "3500 + 600 should = 4100, but it says 4415").
  // TODO(eddie): display-only for now — the Shopify cart still holds
  // full-price lines, so checkout will show the undiscounted number until the
  // tiers exist as automatic discounts or bundle products in the store.
  state.bundleSavings = 0;
  if (activeKit && typeof activeKit.price === 'number') {
    const itemsPerSet = state.accessoryLines.reduce(
      (sum, l) => sum + parseFloat(l.merchandise.price.amount),
      0
    );
    const savedPerSet = itemsPerSet - activeKit.price;
    if (savedPerSet > 0) {
      state.bundleSavings = savedPerSet * state.quantity;
      total -= state.bundleSavings;
    }
  }
  state.total = total;

  state.ready = true;
  emit();
}
