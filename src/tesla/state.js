// Derived-state store for the Tesla-style page.
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
  quantity: 1,
  total: 0,
  currency: 'USD',
  payMode: 'cash', // 'cash' | 'lease' | 'finance' — Tesla-style payment toggle
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
  state.total = total;

  // Active bundle = session accessory set exactly matches a bundle's product
  // set (same rule as lib/selection.js).
  const selected = new Set(state.accessoryLines.map((l) => l.merchandise.product.handle));
  state.activeBundle = null;
  for (const b of bundles) {
    const members = (b.products || []).map((p) => p.handle);
    if (
      members.length &&
      members.length === selected.size &&
      members.every((h) => selected.has(h))
    ) {
      state.activeBundle = b.handle;
      break;
    }
  }

  state.ready = true;
  emit();
}
