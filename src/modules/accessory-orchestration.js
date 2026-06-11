import $ from '../lib/jquery.js';
import { setLineForProduct } from '../lib/cart.js';
import { getSelection } from '../lib/selection.js';

const sel = () => getSelection() || { accessories: [] };

// Tags accessory cards with [data-accessory-handle] + [data-accessory-variant-id]
// at init, then wires click → cart toggle.
//
// sf-product-added / sf-sub-product-added class syncing is handled by
// ui-bindings.js (selection-driven).
//
// LIMITATION: multi-variant accessories (e.g. Open Face Helmet with 8 sizes)
// always use variants[0]. Size selection inside the card needs a separate
// sub-orchestration — deferred.

const VARIANT_ATTR = 'data-accessory-variant-id';
const HANDLE_ATTR = 'data-accessory-handle';
const OPTION_ATTR = 'data-accessory-option-id'; // variant GID for size/color swatches

export function initAccessoryOrchestration(config, products) {
  if (!products.accessories?.length) return;

  let tagged = 0;
  for (const product of products.accessories) {
    const numericId = product.id.split('/').pop();
    const $card = $(`[sf-product="${numericId}"]`).first();
    if (!$card.length) continue;
    const variant = product.variants[0];
    if (!variant) continue;
    $card.attr(VARIANT_ATTR, variant.id);
    $card.attr(HANDLE_ATTR, product.handle);

    // Multi-variant (e.g., Helmet has sizes S/M/L/XL) — tag each swatch
    // with its Shopify variant ID so swatch clicks know which variant to
    // swap to. Matching is by the first selectedOption value (Size for
    // helmet). If multiple variants share the same first-option value
    // (e.g., S × Black vs S × White), takes the first match.
    if (product.variants.length > 1) {
      const variantByOption = new Map();
      for (const v of product.variants) {
        const value = v.selectedOptions?.[0]?.value;
        if (value && !variantByOption.has(value)) variantByOption.set(value, v.id);
      }
      $card.find('[sf-option-value]').each(function () {
        const value = $(this).attr('sf-option-value');
        const id = variantByOption.get(value);
        if (id) $(this).attr(OPTION_ATTR, id);
      });
    }

    // Fill + reveal the price element. Was hidden by default (Shopyflow used
    // to populate and show it). USD → $X.XX, other currencies → "EUR 28.00".
    const $price = $card.find('[sf-show-price="1"]').first();
    if ($price.length && variant.price) {
      const amount = parseFloat(variant.price.amount).toFixed(2);
      const symbol = variant.price.currencyCode === 'USD' ? '$' : `${variant.price.currencyCode} `;
      $price.text(`${symbol}${amount}`).css({ display: 'flex', opacity: 1 });
    }

    tagged++;
  }
  console.log(`[AccessoryOrch] Tagged ${tagged}/${products.accessories.length} accessory cards`);

  // Card click → toggle accessory in cart. setLineForProduct is session-scoped
  // so it only affects the CURRENT config. activeBundle no longer needs manual
  // clearing — it's now derived from accessories matching a bundle exactly.
  $(document).on('click.accessoryOrch', `[${HANDLE_ATTR}]`, function (e) {
    if ($(e.target).closest('[sf-option-value], [sf-change-option]').length) return;
    e.preventDefault();
    e.stopImmediatePropagation();
    const $card = $(this);
    const variantId = $card.attr(VARIANT_ATTR);
    const handle = $card.attr(HANDLE_ATTR);
    // Use selection.accessories (session-scoped) instead of raw cart lines
    const existing = sel().accessories.find((a) => a.handle === handle);
    setLineForProduct(handle, existing ? null : variantId);
  });

  // Size/option swatch click → swap variant on the existing line, or add
  // with the picked variant if not in cart yet. Critically: clicking a
  // DIFFERENT size never deselects the accessory (legacy Shopyflow bug
  // we used to work around with swatch-protection logic).
  $(document).on('click.accessorySwatch', `[${HANDLE_ATTR}] [${OPTION_ATTR}]`, function (e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    const $swatch = $(this);
    const $card = $swatch.closest(`[${HANDLE_ATTR}]`);
    const handle = $card.attr(HANDLE_ATTR);
    const variantId = $swatch.attr(OPTION_ATTR);
    if (!handle || !variantId) return;
    setLineForProduct(handle, variantId);
  });
}
