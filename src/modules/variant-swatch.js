import $ from '../lib/jquery.js';
import { setVariant } from './variant-observer.js';

// Click handler for the main product's variant swatches (e.g. Black / Silver
// on the bike). Tags each swatch at init with [data-variant-id] (numeric).
// sf-active state is handled by ui-bindings.js (selection-driven).

export function initVariantSwatch(config, products) {
  if (!products.main) return;

  const mainNumericId = products.main.id.split('/').pop();
  const $bikeContainer = $(`[sf-product="${mainNumericId}"]`).first();
  if (!$bikeContainer.length) {
    console.warn(`[VariantSwatch] Main product container [sf-product="${mainNumericId}"] not found`);
    return;
  }

  // Build color name → variant numeric ID map
  const colorToNumericId = new Map();
  for (const v of products.main.variants) {
    const colorOpt = v.selectedOptions.find((o) => /colou?rs?/i.test(o.name));
    if (colorOpt) colorToNumericId.set(colorOpt.value, v.id.split('/').pop());
  }

  // Tag each swatch
  let tagged = 0;
  $bikeContainer.find('[sf-option-value]').each(function () {
    const $sw = $(this);
    const value = $sw.attr('sf-option-value');
    const numericId = colorToNumericId.get(value);
    if (!numericId) return;
    $sw.attr('data-variant-id', numericId);
    tagged++;
  });
  console.log(`[VariantSwatch] Tagged ${tagged}/${products.main.variants.length} variant swatches`);

  $bikeContainer.on('click.variantSwatch', '[data-variant-id]', function (e) {
    e.preventDefault();
    e.stopPropagation();
    const numericId = $(this).attr('data-variant-id');
    if (numericId) setVariant(numericId);
  });
}
