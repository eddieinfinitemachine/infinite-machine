import { bindActiveClass, bindSummaryRow, bindImage, bindText } from '../lib/bindings.js';

// All visual state-sync declarations live here. Each `bindX()` call subscribes
// to the central selection model — when selection changes, the DOM updates.
// Adding a new sync rule = one declaration. Adding P1 later = same shape with
// different selectors driven by config.

// Standard "this option is selected" CSS treatment, applied uniformly across
// bike swatches, wrap cards, bundle presets, and accessory cards:
//   - sf-active on card + ALL descendants → radio dot fill, inner styling
//   - sf-product-added on the card ONLY → bg color (white)
// Applying sf-product-added with alsoOnChildren would paint child elements
// white too, so it's deliberately card-only.
function bindSelectedCard({ cards, match }) {
  bindActiveClass({ cards, match, className: 'sf-active', alsoOnChildren: true });
  bindActiveClass({ cards, match, className: 'sf-product-added' });
}

export function bindUi(config) {
  // ---------- Main product (bike) variant ----------
  if (config.product) {
    bindSelectedCard({
      cards: '[data-variant-id]',
      match: (card, sel) => card.getAttribute('data-variant-id') === sel.variant?.id,
    });

    bindSummaryRow({
      row: '[data-inc-item="finish"]',
      fields: {
        label: (sel) => sel.variant?.color,
        color: (sel) => sel.variant?.colorHex,
      },
    });

    bindImage({ target: '[data-img-local="us"]', src: (sel) => sel.variant?.usImage });
    bindImage({ target: '[data-img-local="eu"]', src: (sel) => sel.variant?.euImage });
    bindText({ target: '[data-delivery-date="us"]', text: (sel) => sel.variant?.delivery });
  }

  // ---------- Wrap ----------
  if (config.wrap) {
    bindSelectedCard({
      cards: '[data-wrap-variant-id]',
      match: (card, sel) => card.getAttribute('data-wrap-variant-id') === sel.wrap?.variantId,
    });

    // "None" card — active when no wrap in cart
    bindSelectedCard({
      cards: '[data-swatch="none"]',
      match: (_, sel) => !sel.wrap,
    });

    // Summary row in sidebar
    bindSummaryRow({
      row: '[data-inc-item="wrap"]',
      show: (sel) => !!sel.wrap,
      fields: {
        'wrap-label': (sel) => sel.wrap?.color,
        'wrap-color': (sel) => sel.wrap?.hex,
      },
    });
  }

  // ---------- Bundles ----------
  if (config.bundles) {
    bindSelectedCard({
      cards: '[data-preset-value]',
      match: (card, sel) => sel.activeBundle && card.getAttribute('data-preset-value') === sel.activeBundle,
    });
  }

  // ---------- Accessories ----------
  if (config.accessoriesCollection) {
    const isAdded = (handle, sel) => sel.accessories.some((a) => a.handle === handle);

    bindSelectedCard({
      cards: '[data-accessory-handle]',
      match: (card, sel) => isAdded(card.getAttribute('data-accessory-handle'), sel),
    });

    // Inner .sub-product_info-wrapper also needs the legacy class (some CSS
    // rules key on it specifically)
    bindActiveClass({
      cards: '[data-accessory-handle] .sub-product_info-wrapper',
      match: (el, sel) => {
        const card = el.closest('[data-accessory-handle]');
        return isAdded(card?.getAttribute('data-accessory-handle'), sel);
      },
      className: 'sf-sub-product-added',
    });

    // Active size/option swatch on multi-variant accessories. Selector
    // targets ALL [data-swatch] swatches inside accessory cards (not
    // just tagged ones) — necessary because the accessory card binding
    // above has alsoOnChildren:true and broadcasts sf-active to every
    // descendant when the card is selected. Without targeting untagged
    // swatches here too, they'd keep sf-active that was applied by the
    // card binding. Match adds sf-active only to the swatch whose
    // data-accessory-option-id matches the cart's helmet variant.
    bindActiveClass({
      cards: '[data-accessory-handle] [data-swatch]',
      match: (sw, sel) => {
        const id = sw.getAttribute('data-accessory-option-id');
        return id && sel.accessories.some((a) => a.variantId === id);
      },
      className: 'sf-active',
      alsoOnChildren: true,
    });
  }
}
