import $ from '../lib/jquery.js';
import { onSelectionChange } from '../lib/selection.js';

// Shows/hides the product-image layer for each accessory on the product visual,
// driven by selection. The layers — .checkout_product-layers
// [data-product-layer="<numericId>"], one per accessory — are authored in
// Webflow. ShopyFlow used to toggle these off its own added-state; this restores
// that behavior now that ShopyFlow is gone.
//
// Only ACCESSORY layers are touched (matched by product id). The bike + wrap
// base layers are left alone — blindly hiding every "unselected" layer would
// wipe the base product image.
//
// Combo substitutions (swap/hide a layer's <img> for specific pairs, e.g.
// bag-in-basket) are a separate concern handled by custom-images.js and compose
// on top of this (they target the inner <img>, this targets the layer element).

export function initAccessoryLayers(config, products) {
  if (!products.accessories?.length) return;

  const $stack = $('.checkout_product-layers');
  if (!$stack.length) {
    console.warn('[AccessoryLayers] No .checkout_product-layers container — layers not toggled');
    return;
  }

  // accessory handle → numeric product ID (matches [data-product-layer])
  const idByHandle = new Map();
  for (const p of products.accessories) idByHandle.set(p.handle, p.id.split('/').pop());

  onSelectionChange((sel) => {
    const selected = new Set((sel.accessories || []).map((a) => a.handle));
    for (const p of products.accessories) {
      const id = idByHandle.get(p.handle);
      const $layer = $stack.find(`[data-product-layer="${id}"]`);
      if (!$layer.length) continue;
      $layer.css('visibility', selected.has(p.handle) ? 'visible' : 'hidden');
    }
  });
}
