import $ from '../lib/jquery.js';

// Accessory category filters. Webflow markup uses Finsweet-style
// [fs-list-field="type"] radio inputs with [fs-list-value="<Title>"] —
// each filter value is a Shopify collection title (All / Add-Ons / Kids
// / Power / Protection / Selects / Storage).
//
// We tag each accessory card with [data-collections] from the Shopify
// product data, then show/hide cards based on whether their collections
// include the selected filter value. "All" / empty / missing → show all.
//
// Active radio also gets `is-list-active` on its parent (legacy CSS hook).

const FILTER_SELECTOR = '[fs-list-field="type"]';
const ACTIVE_CLASS = 'is-list-active';
const ALL_VALUE = 'All';

export function initFilters(products) {
  if (!products?.accessories?.length) return;

  // Tag each accessory card with collection titles, pipe-delimited
  let tagged = 0;
  for (const product of products.accessories) {
    const titles = (product.collections || []).map((c) => c.title);
    const $card = $(`[data-accessory-handle="${product.handle}"]`);
    if (!$card.length) continue;
    $card.attr('data-collections', titles.join('|'));
    tagged++;
  }
  console.log(`[Filters] Tagged ${tagged}/${products.accessories.length} cards with collections`);

  // Wire up filter change handler
  $(document).on('change.filters', FILTER_SELECTOR, function () {
    if (!this.checked) return;
    $(FILTER_SELECTOR).parent().removeClass(ACTIVE_CLASS);
    $(this).parent().addClass(ACTIVE_CLASS);
    applyFilter($(this).attr('fs-list-value'));
  });

  // Initial state: pick the first radio (or whichever is checked in the DOM)
  const $checked = $(FILTER_SELECTOR).filter(':checked').first();
  const $first = $checked.length ? $checked : $(FILTER_SELECTOR).first();
  if ($first.length) {
    $first.prop('checked', true);
    $first.parent().addClass(ACTIVE_CLASS);
    applyFilter($first.attr('fs-list-value'));
  }
}

function applyFilter(value) {
  const showAll = !value || value === ALL_VALUE;
  $('[data-accessory-handle]').each(function () {
    const $card = $(this);
    if (showAll) {
      $card.show();
      return;
    }
    const titles = ($card.attr('data-collections') || '').split('|');
    if (titles.includes(value)) $card.show();
    else $card.hide();
  });
}
