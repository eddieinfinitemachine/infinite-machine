import $ from '../lib/jquery.js';
import { onSelectionChange, getSelection } from '../lib/selection.js';
import { updateLine } from '../lib/cart.js';

// Config-level quantity stepper. One value applies to ALL lines in the
// current session (bike + accessories) so the config behaves as "N sets of
// this configuration". User can still fine-tune individual line qty in the
// cart drawer; this is the high-level control.
//
// Markup convention (auto-injected near [primary-action] if missing):
//   [data-config-qty]           outer wrapper
//   [data-config-qty-input]     display element (text content = qty)
//   [data-config-qty-up]        + button
//   [data-config-qty-down]      − button

const STYLE = `
  [data-config-qty] { display: flex; align-items: center; gap: 10px;
    font-size: 13px; }
  [data-config-qty] .stepper { display: inline-flex; align-items: center;
    border: 1px solid #ddd; border-radius: 3px; }
  [data-config-qty] .stepper button { background: none; border: none;
    width: 28px; height: 28px; cursor: pointer; font-size: 14px;
    padding: 0; line-height: 1; }
  [data-config-qty] .stepper button:disabled { color: #ccc; cursor: not-allowed; }
  [data-config-qty] .stepper [data-config-qty-input] { min-width: 26px;
    text-align: center; }
`;

const MIN_QTY = 1;
const MAX_QTY = 99;

let processing = false;
let $stepper = null;

export function initConfigQuantity() {
  if (!document.getElementById('config-qty-style')) {
    $('<style id="config-qty-style">').text(STYLE).appendTo('head');
  }

  // Reuse Webflow markup if present, otherwise inject a default stepper
  // adjacent to the Buy button.
  let $existing = $('[data-config-qty]');
  if (!$existing.length) {
    const $buy = $('[primary-action], [buy-button]').first();
    if (!$buy.length) {
      console.warn('[ConfigQuantity] No [primary-action] anchor — stepper not injected');
      return;
    }
    $existing = $(`
      <div data-config-qty>
        <span>Quantity:</span>
        <div class="stepper">
          <button data-config-qty-down aria-label="Decrease">−</button>
          <span data-config-qty-input>1</span>
          <button data-config-qty-up aria-label="Increase">+</button>
        </div>
      </div>
    `);
    $buy.before($existing);
  }
  $stepper = $existing;

  $stepper.on('click', '[data-config-qty-up], [data-config-qty-down]', async function () {
    if (processing) return;
    await changeQty($(this).is('[data-config-qty-up]') ? 1 : -1);
  });

  onSelectionChange(updateDisplay);
  updateDisplay(getSelection());
}

async function changeQty(direction) {
  processing = true;
  try {
    const sel = getSelection();
    if (!sel?.cart) return;
    const sessionLines = sel.cart.lines.filter(
      (l) => l.attributesByKey?._config_id === sel.sessionId
    );
    if (sessionLines.length === 0) return;

    const current = sessionLines[0].quantity || MIN_QTY;
    const next = Math.min(MAX_QTY, Math.max(MIN_QTY, current + direction));
    if (next === current) return;

    // Update all session lines to the new quantity. Each updateLine goes
    // through coalesce + global write lock so they serialize cleanly.
    await Promise.all(
      sessionLines.map((l) => updateLine({ lineId: l.id, quantity: next }))
    );
  } catch (err) {
    console.error('[ConfigQuantity] Error:', err);
  } finally {
    processing = false;
  }
}

function updateDisplay(sel) {
  if (!$stepper || !sel?.cart) return;
  const sessionLines = sel.cart.lines.filter(
    (l) => l.attributesByKey?._config_id === sel.sessionId
  );
  const qty = sessionLines[0]?.quantity || MIN_QTY;
  $stepper.find('[data-config-qty-input]').text(qty);
  $stepper.find('[data-config-qty-down]').prop('disabled', qty <= MIN_QTY);
  $stepper.find('[data-config-qty-up]').prop('disabled', qty >= MAX_QTY);
}
