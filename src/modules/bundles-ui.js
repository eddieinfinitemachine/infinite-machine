import $ from '../lib/jquery.js';
import { findProductByHandle } from '../lib/products.js';
import { addLines, removeLines } from '../lib/cart.js';
import { getSelection } from '../lib/selection.js';

// Renders the bundle preset list (Basic / Kids / Cargo / etc) and wires
// click-to-add behavior. Clicking a bundle:
//   1. Clears any currently-staged accessories
//   2. Adds the bundle's products as a batch
//   3. Marks the bundle preset as sf-active (existing CSS hook)
//
// Markup conventions (existing):
//   [data-option-group="bundle"]      — mount point
//   [data-preset-value]               — each preset element (cloned from CMS)
//
// In the new world the presets come from Shopify metaobjects instead of
// Webflow CMS, but the rendered DOM is the same so existing CSS keeps working.

let isProcessing = false;

export async function initBundlesUi(config, products, bundles) {
  if (!config.bundles?.metaobjectType) return;
  if (!bundles?.length) {
    console.warn('[BundlesUi] No bundles to render');
    return;
  }

  // Sort by `order` field if present
  bundles.sort((a, b) => (Number(a.order) || 0) - (Number(b.order) || 0));

  const $mount = $('[data-option-group="bundle"]');
  if (!$mount.length) {
    console.warn('[BundlesUi] No [data-option-group="bundle"] mount');
    return;
  }

  const $template = $mount.find('[data-preset-value]').first();
  if (!$template.length) {
    console.warn('[BundlesUi] No [data-preset-value] template found inside mount');
    return;
  }

  const templateHtml = $template[0].outerHTML;
  $mount.find('[data-preset-value]').remove();

  // Render each bundle
  for (const bundle of bundles) {
    const $clone = $(templateHtml);
    $clone.attr('data-preset-value', bundle.handle);

    // Title — Webflow template uses .checkout_option-text. Also support a
    // [data-preset-label] attribute if the markup is updated to use that.
    const title = bundle.label || bundle.handle;
    const $titleEl = $clone.find('[data-preset-label], .checkout_option-text').first();
    if ($titleEl.length) $titleEl.text(title);

    // Product names list
    $clone.find('[data-accessory-label]').text(
      (bundle.products || []).map((p) => p.title).join(', ')
    );

    // Strip the inner .hide.w-dyn-list — that was legacy CMS data used by
    // the old code to know which products to add. Bundle products now come
    // from the metaobject, so this list is dead weight. Without removing it,
    // every clone contains the first template's items (looks stale/wrong).
    $clone.find('.w-dyn-list, [data-bundle-product]').remove();

    $mount.append($clone);
  }

  // Delegated click — survives any future re-render.
  // sf-active state is now driven by ui-bindings based on cart.attributes._active_bundle
  // (set via setCartAttributes here, so it persists across reloads).
  $mount.off('click.bundles').on('click.bundles', '[data-preset-value]', async function () {
    if (isProcessing) return;
    isProcessing = true;
    const handle = $(this).attr('data-preset-value');
    const wasActive = getSelection()?.activeBundle === handle;

    try {
      // Selecting a bundle replaces previously-staged accessories (legacy behavior)
      await clearStagedAccessories(config);

      // Toggle off — accessories already cleared, derived activeBundle now null.
      if (wasActive) return;

      const bundle = bundles.find((b) => b.handle === handle);
      if (!bundle?.products?.length) return;

      const items = bundle.products
        .map((p) => {
          const variantId = findProductByHandle(products, p.handle)?.variants[0]?.id;
          // Tag each line with the bundle handle for checkout-side analytics.
          // UI's "active bundle" state is derived (in selection.js) and doesn't
          // depend on this attribute — it just rides along for tracking.
          return variantId ? { variantId, attributes: { _bundle: handle } } : null;
        })
        .filter(Boolean);

      if (items.length) await addLines(items);
    } catch (err) {
      console.error('[BundlesUi] Click handler error:', err);
    } finally {
      isProcessing = false;
    }
  });
}

async function clearStagedAccessories(config) {
  // Use the selection's accessories — already filtered to the current session.
  // Don't reach into cart.lines directly or we'd wipe other configs' accessories.
  const sel = getSelection();
  const accessoryLineIds = sel.accessories.map((a) => a.lineId);
  if (accessoryLineIds.length) await removeLines(accessoryLineIds);
}
