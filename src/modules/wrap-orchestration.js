import $ from '../lib/jquery.js';
import { setLineForProduct } from '../lib/cart.js';
import { onSelectionChange, getSelection } from '../lib/selection.js';

// Wrap product handling:
//   - Tag color cards with [data-wrap-variant-id]
//   - Click → cart add/swap/remove
//   - Inject the wrap summary row in the sidebar (cloned from finish row)
//   - Swap the wrap-color image overlay on the bike
//
// sf-active state + summary row content are handled by ui-bindings.js
// (selection-driven). This module owns only what needs imperative logic.

const VARIANT_ATTR = 'data-wrap-variant-id';

export function initWrapOrchestration(config, products) {
  if (!config.wrap || !products.wrap) return;

  const wrapProduct = products.wrap;
  const wrapHandle = wrapProduct.handle;
  const numericProductId = wrapProduct.id.split('/').pop();
  const wrapNode = document.querySelector(`[data-product-id="${numericProductId}"]`);
  if (!wrapNode) {
    console.warn(`[Wrap] Container [data-product-id="${numericProductId}"] not found`);
    return;
  }

  injectWrapSummaryRow();
  tagWrapCards(wrapNode, wrapProduct);
  bindClickHandlers(wrapNode, wrapHandle);
  bindWrapImageOverlay();
}

function tagWrapCards(wrapNode, wrapProduct) {
  const variantsByColor = new Map();
  for (const v of wrapProduct.variants) {
    const colorOpt = v.selectedOptions.find((o) => /colou?rs?/i.test(o.name));
    if (colorOpt) variantsByColor.set(colorOpt.value, v);
  }

  $(wrapNode)
    .find('[data-variant-gid][data-swatch]')
    .each(function () {
      const $card = $(this);
      const value = $card.attr('data-swatch');
      if (value === 'Custom') {
        $card.hide(); // deprecated Custom card
        return;
      }
      const variant = variantsByColor.get(value);
      if (variant) $card.attr(VARIANT_ATTR, variant.id);
    });
}

function bindClickHandlers(wrapNode, wrapHandle) {
  // Color card → set wrap to this variant (or toggle off if already selected).
  // Uses selection (session-scoped) instead of raw cart so editing one
  // config's wrap doesn't affect any other config's wrap.
  wrapNode.addEventListener(
    'click',
    (e) => {
      const card = e.target.closest(`[data-variant-gid][${VARIANT_ATTR}]`);
      if (!card) return;
      e.preventDefault();
      e.stopImmediatePropagation();
      const variantId = card.getAttribute(VARIANT_ATTR);
      const sessionWrap = getSelection()?.wrap;
      const target = sessionWrap && sessionWrap.variantId === variantId ? null : variantId;
      setLineForProduct(wrapHandle, target);
    },
    true
  );

  // "None" card — clear wrap
  $('[data-swatch="none"]').on('click.wrap', function (e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    setLineForProduct(wrapHandle, null);
  });
}

// The wrap summary row isn't in Webflow's static markup — legacy code created
// it at init by cloning the "Finish" row. Same trick.
function injectWrapSummaryRow() {
  if ($('[data-inc-item="wrap"]').length) return;
  const $finishRow = $('[data-inc-item="finish"]').first();
  if (!$finishRow.length) return;
  const $wrapRow = $finishRow.clone();
  $wrapRow.attr('data-inc-item', 'wrap').removeAttr('data-w-id');
  $wrapRow.find('.text-size-tiny.text-weight-medium').first().text('Wrap');
  $wrapRow.find('[data-inc-item="label"]').attr('data-inc-item', 'wrap-label').text('');
  $wrapRow.find('[data-inc-item="color"]').attr('data-inc-item', 'wrap-color').attr('style', '');
  $wrapRow.css({ display: 'none', opacity: 0 });
  $finishRow.after($wrapRow);
}

// Wrap color image overlay — has dynamic selector logic (matches color name
// to [data-wrap-img="<color>"] CMS items), so kept imperative rather than
// expressed as a binding. Subscribes to selection like a binding would.
function bindWrapImageOverlay() {
  onSelectionChange((sel) => {
    const color = sel.wrap?.color;
    const $container = $('.checkout_product-wraps');
    if (!$container.length) return;

    if (!color) {
      $container.css('visibility', 'hidden');
      $('[data-img-local]').css('display', '');
      return;
    }

    const $matched = $container.find(`[data-wrap-img="${color}"]`).first();
    if (!$matched.length) {
      $container.css('visibility', 'hidden');
      $('[data-img-local]').css('display', '');
      return;
    }

    $container.find('.w-dyn-item').css('display', 'none');
    $matched.css('display', '');
    $container.css('visibility', 'visible');
    $('[data-img-local]').css('display', 'none');
  });
}
