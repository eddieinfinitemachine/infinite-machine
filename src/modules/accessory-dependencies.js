import { setLineForProduct } from '../lib/cart.js';
import { onSelectionChange } from '../lib/selection.js';
import { findProductByHandle } from '../lib/products.js';

// Auto-adds a "parent" accessory when any of its "required-by" children are
// in the cart. Configured via config.accessoryDependencies:
//
//   accessoryDependencies: {
//     'olto-rear-rack': { requiredBy: ['olto-rear-basket', 'olto-side-mounting-plate'] }
//   }
//
// One-way: only adds the parent, doesn't prevent removal. setLineForProduct
// uses the same coalesce + global lock as everything else, so concurrent
// child clicks don't race.

let processing = false;

export function initAccessoryDependencies(config, products) {
  if (!config.accessoryDependencies) return;

  onSelectionChange(async (sel) => {
    if (processing) return;
    processing = true;
    try {
      const presentHandles = new Set(sel.accessories.map((a) => a.handle));

      for (const [parentHandle, dep] of Object.entries(config.accessoryDependencies)) {
        const childPresent = dep.requiredBy.some((h) => presentHandles.has(h));
        if (!childPresent || presentHandles.has(parentHandle)) continue;

        const parentProduct = findProductByHandle(products, parentHandle);
        const variant = parentProduct?.variants[0];
        if (!variant) {
          console.warn(`[AccessoryDependencies] Parent not found: ${parentHandle}`);
          continue;
        }
        await setLineForProduct(parentHandle, variant.id);
        presentHandles.add(parentHandle); // avoid re-firing this tick
      }
    } catch (err) {
      console.error('[AccessoryDependencies] Error:', err);
    } finally {
      processing = false;
    }
  });
}
