import $ from '../lib/jquery.js';
import { removeLine } from '../lib/cart.js';
import { onSelectionChange } from '../lib/selection.js';
import { revealItem, hideItem } from '../lib/dom.js';

// Renders the "what you've added" sidebar list. Subscribes to cart changes
// and rebuilds the list whenever lines change. Click any item to remove it.
//
// Expects in markup (existing convention, no Webflow changes needed):
//   [data-accessories="wrap"]     — outer wrapper, hidden when empty
//   [data-accessories="list"]     — mount point
//   [data-accessories-item]       — template element (cloned per accessory)
//     [data-item="label"]         — text fill
//     [data-item="img"]           — src fill
//
// Lines from the main product (bike) and wrap product are excluded — those
// are surfaced in different parts of the UI.

export function initAccessorySidebar(config, products) {
  const $wrap = $('[data-accessories="wrap"]');
  const $list = $('[data-accessories="list"]');
  const $template = $('[data-accessories-item]').first();

  if (!$list.length) {
    console.warn('[AccessorySidebar] Missing [data-accessories="list"] mount — sidebar disabled');
    return;
  }

  // If no Webflow template exists, construct a minimal fallback so the
  // sidebar still populates. The CMS-rendered version has richer markup,
  // but the demo (and any production page where the template was cloned
  // away) needs *something* to clone.
  const templateHtml = $template.length
    ? $template[0].outerHTML
    : '<div data-accessories-item="" class="checkout_includes-inner-item">' +
      '<p data-item="label" class="text-size-tiny text-weight-medium"></p>' +
      '<div class="cc-flex">' +
      '<img data-item="img" loading="lazy" class="checkout_item-pic-small" alt="" />' +
      '<div class="icon-embed-12" style="cursor:pointer">' +
      '<svg width="100%" height="100%" viewBox="0 0 24 24" fill="none">' +
      '<path d="M19 5L5 19" stroke="black" />' +
      '<path d="M5 5L19 19" stroke="black" />' +
      '</svg></div></div></div>';

  if (!$template.length) {
    console.log('[AccessorySidebar] No Webflow template found — using fallback HTML');
  }

  $list.empty();

  // Delegated click handler — survives re-renders
  $(document).on('click.accessorySidebar', '[data-accessories-item][data-line-id]', function () {
    const lineId = $(this).attr('data-line-id');
    if (!lineId) return;
    removeLine(lineId).catch((err) => console.error('[AccessorySidebar] removeLine failed:', err));
  });

  // Stable sort key: position of each accessory in the Shopify collection
  // (drag-drop order set in admin). Without this, the sidebar reshuffles
  // every time the cart re-renders because Shopify's response order differs
  // from our optimistic add order.
  const handleOrder = new Map();
  (products?.accessories || []).forEach((p, i) => handleOrder.set(p.handle, i));

  onSelectionChange((sel) => {
    // sel.accessories is already filtered to exclude main + wrap. Just sort.
    const lines = [...sel.accessories].sort(
      (a, b) => (handleOrder.get(a.handle) ?? Infinity) - (handleOrder.get(b.handle) ?? Infinity)
    );

    $list.empty();

    if (lines.length === 0) {
      hideItem($wrap);
      return;
    }

    for (const line of lines) {
      // Look up the cart line for full merchandise data (selectedOptions, image)
      const fullLine = sel.cart?.lines.find((l) => l.id === line.lineId);
      if (!fullLine) continue;
      const merch = fullLine.merchandise;

      // Multi-variant accessories (e.g., Helmet size M) → suffix with variant
      // info. Skip if single-variant ("Default Title").
      const opts = merch.selectedOptions || [];
      const meaningful = opts.filter((o) => o.value && o.value.toLowerCase() !== 'default title');
      const suffix = meaningful.length ? ` — ${meaningful.map((o) => o.value).join(' / ')}` : '';

      const $clone = $(templateHtml);
      $clone.attr('data-line-id', line.lineId);
      $clone.attr('data-source-id', line.handle);
      $clone.find('[data-item="label"]').text(merch.product.title + suffix);
      if (merch.image?.url) $clone.find('[data-item="img"]').attr('src', merch.image.url);
      $list.append($clone);
    }

    revealItem($wrap);
  });
}
