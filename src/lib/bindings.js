// Declarative DOM bindings driven by the Selection model. Each binding
// subscribes to selection.onChange and re-applies its DOM update on every
// change. Adding a new sync rule = one binding call, no boilerplate.

import $ from './jquery.js';
import { onSelectionChange } from './selection.js';

/**
 * Toggle a class on cards based on a match predicate.
 *
 *   bindActiveClass({
 *     cards: '[data-variant-id]',
 *     match: (card, sel) => card.dataset.variantId === sel.variant?.id,
 *     className: 'sf-active',
 *     alsoOnChildren: true,
 *   });
 */
export function bindActiveClass({ cards, match, className = 'sf-active', alsoOnChildren = false }) {
  // Diffed updates: only touch DOM for elements whose active state CHANGED.
  // Without this, every selection change (optimistic + API confirm = 2 notifies
  // per click) would re-apply the same classes and re-fire CSS animations,
  // causing visible flicker / re-pulse on cards that should be stable.
  let prevActive = new Set();

  onSelectionChange((sel) => {
    const $cards = $(cards);
    const nextActive = new Set();
    $cards.each(function () {
      if (match(this, sel)) nextActive.add(this);
    });

    for (const el of prevActive) {
      if (nextActive.has(el)) continue;
      const $el = $(el);
      $el.removeClass(className);
      if (alsoOnChildren) $el.find('*').removeClass(className);
    }
    for (const el of nextActive) {
      if (prevActive.has(el)) continue;
      const $el = $(el);
      $el.addClass(className);
      if (alsoOnChildren) $el.find('*').addClass(className);
    }

    prevActive = nextActive;
  });
}

/**
 * Fill a sidebar summary row with values derived from the selection.
 * Each `fields` entry maps a data-inc-item key to a value function. String
 * values starting with '#' or 'rgb' are treated as colors (background),
 * everything else is set as text.
 *
 *   bindSummaryRow({
 *     row: '[data-inc-item="finish"]',
 *     fields: {
 *       label: (sel) => sel.variant?.color,
 *       color: (sel) => sel.variant?.colorHex,
 *     },
 *   });
 *
 *   // With optional `show` predicate (default: always visible)
 *   bindSummaryRow({
 *     row: '[data-inc-item="wrap"]',
 *     show: (sel) => !!sel.wrap,
 *     fields: { 'wrap-label': s => s.wrap?.color, 'wrap-color': s => s.wrap?.hex },
 *   });
 */
export function bindSummaryRow({ row, show, fields = {} }) {
  onSelectionChange((sel) => {
    const $row = $(row);
    if (!$row.length) return;

    if (show && !show(sel)) {
      $row.css({ display: 'none', opacity: 0 });
      return;
    }

    for (const [key, fn] of Object.entries(fields)) {
      const value = fn(sel);
      const $target = $row.find(`[data-inc-item="${key}"]`);
      if (!$target.length) continue;

      if (typeof value === 'string' && /^(#|rgb)/.test(value)) {
        $target.css('background-color', value);
      } else if (value == null || value === '') {
        $target.text('');
      } else {
        $target.text(value);
      }
    }

    if (show) $row.css({ display: 'flex', opacity: 1 });
  });
}

/**
 * Sync an image's background-image (or src) from the selection.
 *
 *   bindImage({ target: '[data-img-local="us"]', src: (sel) => sel.variant?.usImage });
 *   bindImage({ target: 'img[data-thing]', src: ..., type: 'src' });
 */
export function bindImage({ target, src, type = 'bg' }) {
  let prev = null;
  onSelectionChange((sel) => {
    const url = src(sel);
    if (!url || url === prev) return;
    prev = url;
    const $el = $(target);
    if (!$el.length) return;
    if (type === 'bg') {
      $el.css('background-image', `url(${url})`);
    } else {
      $el.attr('src', url);
    }
  });
}

/**
 * Sync element text content from the selection.
 *
 *   bindText({ target: '[data-delivery-date="us"]', text: (sel) => sel.variant?.delivery });
 */
export function bindText({ target, text }) {
  let prev = null;
  onSelectionChange((sel) => {
    const value = text(sel);
    if (value == null || value === prev) return;
    prev = value;
    $(target).text(value);
  });
}
