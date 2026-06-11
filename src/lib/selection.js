// Central derived state model. Reads cart + variant URL + region and computes
// a single "selection" shape that UI bindings subscribe to. Replaces the
// scattered "each module subscribes to cart and re-computes its own slice"
// pattern from earlier modules.
//
// Shape:
//   selection = {
//     variant:     { id, gid, color, colorHex, delivery, usImage, euImage } | null
//     wrap:        { lineId, variantId, color, hex } | null
//     accessories: [{ lineId, handle, variantId, title, image }, ...]
//     region:      'us' | 'eu' | ''
//     cart:        raw cart object (escape hatch)
//   }

import {
  onChange as onCartChange,
  getCart,
  onSessionChange,
  getCurrentConfigSessionId,
} from './cart.js';
import { onVariantChange, getCurrentVariant } from '../modules/variant-observer.js';
import { onRegionChange, getCurrentRegion } from '../modules/location-flow.js';
import { findVariantById } from './products.js';

let config = null;
let products = null;
let bundlesRef = null;
let current = null;
const handlers = [];

// Bundle "active" state is DERIVED, not stored: the current session's
// accessory set is compared against each bundle's product list — exact
// match = that bundle is active. Auto-per-config and auto-clears on any
// manual modification. Line-attribute `_bundle` on bundle products still
// rides along for checkout-side analytics.

export function initSelection(cfg, prods, bundles = []) {
  config = cfg;
  products = prods;
  bundlesRef = bundles;
  recompute();
  onCartChange(recompute);
  onVariantChange(recompute);
  onRegionChange(recompute);
  onSessionChange(recompute);
}

export function getSelection() {
  return current;
}

export function onSelectionChange(handler) {
  handlers.push(handler);
  if (current) handler(current);
  return () => {
    const i = handlers.indexOf(handler);
    if (i >= 0) handlers.splice(i, 1);
  };
}

function recompute() {
  const cart = getCart();
  const variantId = getCurrentVariant();
  const region = getCurrentRegion();
  const sessionId = getCurrentConfigSessionId();

  const accessories = buildAccessories(cart, sessionId);
  current = {
    variant: buildVariant(variantId),
    wrap: buildWrap(cart, sessionId),
    accessories,
    activeBundle: deriveActiveBundle(accessories),
    region,
    sessionId,
    cart,
    allConfigs: buildAllConfigs(cart),
  };

  handlers.forEach((h) => h(current));
}

function buildVariant(numericId) {
  if (!numericId) return null;
  const meta = config?.variants?.[numericId] || {};
  const gid = `gid://shopify/ProductVariant/${numericId}`;
  const hit = products ? findVariantById(products, gid) : null;
  return {
    id: numericId,
    gid,
    color: meta.color,
    colorHex: meta.colorHex,
    delivery: meta.delivery,
    usImage: hit?.variant?.image?.url || null,
    euImage: meta.backgroundImage || null,
  };
}

// Filter helper — only current session's lines for per-config UI state
function inCurrentSession(line, sessionId) {
  return line.attributesByKey?._config_id === sessionId;
}

// activeBundle = which bundle (if any) the current session's accessories
// exactly recreate. Auto-clears when extras/missing.
function deriveActiveBundle(sessionAccessories) {
  if (!bundlesRef?.length || sessionAccessories.length === 0) return null;
  const handles = new Set(sessionAccessories.map((a) => a.handle));
  for (const bundle of bundlesRef) {
    const bundleHandles = new Set((bundle.products || []).map((p) => p.handle));
    if (bundleHandles.size === 0) continue;
    if (bundleHandles.size !== handles.size) continue;
    let match = true;
    for (const h of bundleHandles) {
      if (!handles.has(h)) { match = false; break; }
    }
    if (match) return bundle.handle;
  }
  return null;
}

function buildWrap(cart, sessionId) {
  if (!cart || !config?.wrap?.productHandle) return null;
  const wrapHandle = config.wrap.productHandle;
  const line = cart.lines.find(
    (l) => l.merchandise.product.handle === wrapHandle && inCurrentSession(l, sessionId)
  );
  if (!line) return null;
  const colorOpt = line.merchandise.selectedOptions?.find((o) => /colou?rs?/i.test(o.name));
  const color = colorOpt?.value;
  return {
    lineId: line.id,
    variantId: line.merchandise.id,
    color,
    hex: color ? config.wrapColorMap?.[color] : null,
  };
}

function buildAccessories(cart, sessionId) {
  if (!cart) return [];
  const mainHandle = config?.product?.handle;
  const wrapHandle = config?.wrap?.productHandle;
  return cart.lines
    .filter((l) => {
      const h = l.merchandise.product.handle;
      if (h === mainHandle || h === wrapHandle) return false;
      return inCurrentSession(l, sessionId);
    })
    .map((l) => ({
      lineId: l.id,
      handle: l.merchandise.product.handle,
      variantId: l.merchandise.id,
      title: l.merchandise.product.title,
      image: l.merchandise.image?.url || null,
      quantity: l.quantity,
    }));
}

// All cart lines grouped by config session. Used by the cart drawer to
// show multiple bike configurations side by side.
// Returns: [{ sessionId, isCurrent, bikeLine, wrapLine, accessoryLines, totalQuantity }]
function buildAllConfigs(cart) {
  if (!cart?.lines?.length) return [];
  const mainHandle = config?.product?.handle;
  const wrapHandle = config?.wrap?.productHandle;
  const currentSession = getCurrentConfigSessionId();
  const bySession = new Map();

  for (const line of cart.lines) {
    const sid = line.attributesByKey?._config_id || '__loose';
    if (!bySession.has(sid)) {
      bySession.set(sid, { sessionId: sid, bikeLine: null, wrapLine: null, accessoryLines: [], totalQuantity: 0 });
    }
    const group = bySession.get(sid);
    const h = line.merchandise.product.handle;
    if (h === mainHandle) group.bikeLine = line;
    else if (h === wrapHandle) group.wrapLine = line;
    else group.accessoryLines.push(line);
    group.totalQuantity += line.quantity || 0;
  }

  // Order: oldest first (session ids are timestamp-prefixed)
  return [...bySession.values()]
    .sort((a, b) => a.sessionId.localeCompare(b.sessionId))
    .map((g) => ({ ...g, isCurrent: g.sessionId === currentSession }));
}
