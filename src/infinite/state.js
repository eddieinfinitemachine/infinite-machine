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

  // Bundle pricing comes from SHOPIFY, never from local arithmetic.
  //
  // This used to compute the tier saving here and subtract it from the
  // displayed total, which made the page quote a number the store would not
  // honour: the cart holds full-price component lines, so checkout charged the
  // undiscounted sum. Measured on staging: page $4,195, Shopify $4,321.
  //
  // The authoritative figure is what the store actually took off — the gap
  // between the cart's subtotal and its total. That is 0 until the automatic
  // discount exists (see BUNDLE_DISCOUNT_LIVE in ui.js), so today the page
  // shows the honest a-la-carte price; the moment the discount goes live the
  // saving appears here with no code change, and if it ever breaks the page
  // reverts to the truth instead of silently overcharging.
  const cost = cart?.cost;
  const applied =
    cost?.subtotalAmount && cost?.totalAmount
      ? parseFloat(cost.subtotalAmount.amount) - parseFloat(cost.totalAmount.amount)
      : 0;
  state.bundleSavings = applied > 0 ? applied : 0;
  total -= state.bundleSavings;

  if (activeKit && typeof activeKit.price === 'number' && state.bundleSavings === 0) {
    // Loud on purpose: a matched bundle with no discount is money the customer
    // was shown and will not get. Harmless while BUNDLE_DISCOUNT_LIVE is false.
    console.warn(
      `[Olto] Bundle "${activeKit.handle}" is in the cart but Shopify applied no discount. ` +
        'Checkout will bill the full component price.'
    );
  }
  state.total = total;

  state.ready = true;
  emit();
}
