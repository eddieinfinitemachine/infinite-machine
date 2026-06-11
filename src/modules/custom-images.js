import $ from '../lib/jquery.js';
import { onChange } from '../lib/cart.js';
import { findProductByHandle } from '../lib/products.js';

// Image substitution based on accessory combinations. Configured via
// config.customImageRules:
//
//   customImageRules: [
//     {
//       when: ['olto-soft-bag', 'olto-rear-basket'],
//       replace: { 'olto-soft-bag': '<bag-in-basket-url>' },
//     },
//     {
//       when: ['olto-charging-dock', 'olto-battery'],
//       replace: { 'olto-battery': '<plugged-url>' },
//       hide: ['olto-charging-dock'],
//     },
//   ]
//
// Existing Webflow markup uses [data-product-layer="<numeric-id>"] — we
// resolve handle → ID via the loaded products data so the markup stays
// unchanged from the Shopyflow era.

export function initCustomImages(config, products) {
  if (!Array.isArray(config.customImageRules) || config.customImageRules.length === 0) return;

  // handle → numeric product ID (e.g. "olto-battery" → "8437614510236")
  const idCache = new Map();
  const resolveId = (handle) => {
    if (idCache.has(handle)) return idCache.get(handle);
    const p = findProductByHandle(products, handle);
    if (!p) return null;
    const numeric = p.id.split('/').pop();
    idCache.set(handle, numeric);
    return numeric;
  };

  // Original src per product layer — captured on first replacement so we can
  // restore when the combination is no longer met
  const originalSrcs = new Map();
  const captureOriginal = (productId) => {
    if (originalSrcs.has(productId)) return;
    const src = imgFor(productId).attr('src');
    if (src) originalSrcs.set(productId, src);
  };

  onChange((cart) => {
    if (!cart) return;

    const presentHandles = new Set(cart.lines.map((l) => l.merchandise.product.handle));

    for (const rule of config.customImageRules) {
      const matches = rule.when.every((h) => presentHandles.has(h));

      if (matches) applyRule(rule, resolveId, captureOriginal);
      else revertRule(rule, resolveId, originalSrcs);
    }
  });
}

function imgFor(productId) {
  return $(`.checkout_product-layers [data-product-layer="${productId}"] img`);
}

function applyRule(rule, resolveId, captureOriginal) {
  if (rule.replace) {
    for (const [handle, url] of Object.entries(rule.replace)) {
      const id = resolveId(handle);
      if (!id) continue;
      captureOriginal(id);
      imgFor(id).attr('src', url);
    }
  }
  if (rule.hide) {
    for (const handle of rule.hide) {
      const id = resolveId(handle);
      if (!id) continue;
      imgFor(id).hide();
    }
  }
}

function revertRule(rule, resolveId, originalSrcs) {
  if (rule.replace) {
    for (const handle of Object.keys(rule.replace)) {
      const id = resolveId(handle);
      if (!id) continue;
      const original = originalSrcs.get(id);
      if (original) imgFor(id).attr('src', original);
    }
  }
  if (rule.hide) {
    for (const handle of rule.hide) {
      const id = resolveId(handle);
      if (!id) continue;
      imgFor(id).show();
    }
  }
}
