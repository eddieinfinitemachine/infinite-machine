import $ from '../lib/jquery.js';
import {
  removeLine,
  startNewConfigSession,
  switchToConfig,
  removeConfig,
  getCheckoutUrl,
} from '../lib/cart.js';
import { onSelectionChange, getSelection } from '../lib/selection.js';

// Floating cart drawer with multi-config support. All UI is injected via JS
// (no Webflow markup required) so styling is unstyled-but-usable. Tom can
// either keep this as-is or replace later with a Webflow-built drawer that
// uses the same data attributes.
//
// Capabilities:
//   - Multi-config: each cart config_id renders as its own group
//   - Per-line qty +/- (bike line is qty-locked at 1)
//   - Per-line remove
//   - Per-config Edit (switch to this config) / Remove (drop the whole config)
//   - "Configure another bike" (start new session)
//   - Checkout → Shopify hosted checkout

const STYLE = `
  #cart-drawer { position: fixed; top: 0; right: 0; bottom: 0; width: 380px;
    background: #fff; color: #111; border-left: 1px solid #ddd;
    z-index: 2147483646; display: flex; flex-direction: column;
    transform: translateX(100%); transition: transform 0.2s ease-out;
    font: 13px/1.4 ui-sans-serif, system-ui, sans-serif; }
  #cart-drawer.open { transform: translateX(0); }
  #cart-drawer-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.4);
    z-index: 2147483645; opacity: 0; pointer-events: none;
    transition: opacity 0.2s ease-out; }
  #cart-drawer-overlay.open { opacity: 1; pointer-events: auto; }
  #cart-drawer .hdr { display: flex; justify-content: space-between; align-items: center;
    padding: 14px 16px; border-bottom: 1px solid #eee; }
  #cart-drawer .hdr strong { font-size: 14px; }
  #cart-drawer .hdr button { background: none; border: none; font-size: 22px;
    cursor: pointer; padding: 0 6px; line-height: 1; }
  #cart-drawer .body { flex: 1; overflow-y: auto; padding: 12px 16px; }
  #cart-drawer .empty { color: #888; padding: 40px 0; text-align: center; }
  #cart-drawer .group { border: 1px solid #ddd; border-radius: 4px;
    padding: 10px 12px; margin-bottom: 12px; }
  #cart-drawer .group.current { border-color: #111; }
  #cart-drawer .group-hdr { display: flex; justify-content: space-between;
    align-items: baseline; margin-bottom: 8px; }
  #cart-drawer .group-hdr strong { font-size: 13px; }
  #cart-drawer .group-hdr .meta { color: #888; font-size: 11px; }
  #cart-drawer .group-actions { margin-top: 8px; display: flex; gap: 6px; }
  #cart-drawer .group-actions button { background: #f4f4f4; border: 1px solid #ddd;
    padding: 4px 8px; font-size: 11px; cursor: pointer; border-radius: 3px; }
  #cart-drawer .group-actions button.danger { color: #b00; }
  #cart-drawer .line { display: grid;
    grid-template-columns: 36px 1fr auto auto;
    gap: 8px; align-items: center;
    padding: 6px 0; border-top: 1px solid #f0f0f0; }
  #cart-drawer .line .qty-label { font-size: 11px; color: #888; min-width: 24px; text-align: right; }
  #cart-drawer .line:first-child { border-top: none; }
  #cart-drawer .line img { width: 36px; height: 36px; object-fit: cover;
    background: #f4f4f4; border-radius: 3px; }
  #cart-drawer .line .title { font-size: 12px; }
  #cart-drawer .line .title .opts { color: #888; display: block; font-size: 11px; }
  #cart-drawer .qty { display: flex; align-items: center; gap: 4px;
    border: 1px solid #ddd; border-radius: 3px; }
  #cart-drawer .qty button { background: none; border: none; width: 22px; height: 22px;
    cursor: pointer; font-size: 13px; padding: 0; }
  #cart-drawer .qty button:disabled { color: #ccc; cursor: not-allowed; }
  #cart-drawer .qty .v { min-width: 16px; text-align: center; font-size: 12px; }
  #cart-drawer .line .price { font-size: 12px; min-width: 50px; text-align: right; }
  #cart-drawer .line button.remove { background: none; border: none; color: #b00;
    cursor: pointer; font-size: 16px; padding: 0 4px; line-height: 1; }
  #cart-drawer .footer { border-top: 1px solid #eee; padding: 12px 16px; }
  #cart-drawer .total { display: flex; justify-content: space-between;
    font-weight: 600; margin-bottom: 10px; }
  #cart-drawer .footer button { width: 100%; padding: 10px; font-size: 13px;
    cursor: pointer; margin-bottom: 6px; border-radius: 3px; }
  #cart-drawer .footer .add-another { background: #fff; color: #111; border: 1px solid #111; }
  #cart-drawer .footer .checkout { background: #111; color: #fff; border: 1px solid #111; }
  #cart-drawer .footer .checkout:disabled { background: #888; border-color: #888; cursor: not-allowed; }
`;

const BIKE_HANDLE_KEY = 'mainProductHandle';

let cfg = null;

export function initCartDrawer(config) {
  if (document.getElementById('cart-drawer')) return; // idempotent
  cfg = config;
  cfg[BIKE_HANDLE_KEY] = config.product?.handle;

  $('<style>').text(STYLE).appendTo('head');

  const $overlay = $('<div id="cart-drawer-overlay"></div>');
  const $drawer = $(`
    <div id="cart-drawer" aria-hidden="true">
      <div class="hdr">
        <strong>Your cart</strong>
        <button data-act="close" aria-label="Close">×</button>
      </div>
      <div class="body"></div>
      <div class="footer">
        <div class="total"><span>Total</span><span class="total-amt">$0.00</span></div>
        <button class="add-another" data-act="add-another">+ Configure another bike</button>
        <button class="checkout" data-act="checkout">Checkout →</button>
      </div>
    </div>
  `);
  $('body').append($overlay).append($drawer);

  $overlay.on('click', close);
  $drawer.on('click', '[data-act]', handleClick);

  onSelectionChange(render);
  render(getSelection());
}

export function openCartDrawer() {
  $('#cart-drawer-overlay').addClass('open');
  $('#cart-drawer').addClass('open').attr('aria-hidden', 'false');
}

function close() {
  $('#cart-drawer-overlay').removeClass('open');
  $('#cart-drawer').removeClass('open').attr('aria-hidden', 'true');
}

function handleClick(e) {
  const $el = $(this);
  const act = $el.attr('data-act');
  const lineId = $el.attr('data-line-id');
  const sessionId = $el.attr('data-session-id');

  if (act === 'close') return close();
  if (act === 'remove-line' && lineId) return removeLine(lineId);
  if (act === 'edit-config' && sessionId) {
    switchToConfig(sessionId);
    close();
    return;
  }
  if (act === 'remove-config' && sessionId) {
    if (!confirm('Remove this entire configuration?')) return;
    return removeConfig(sessionId);
  }
  if (act === 'add-another') {
    startNewConfigSession();
    close();
    return;
  }
  if (act === 'checkout') {
    const url = getCheckoutUrl();
    if (url) window.location.href = url;
    return;
  }
}

function render(sel) {
  if (!sel) return;
  const $body = $('#cart-drawer .body');
  const configs = sel.allConfigs || [];

  if (configs.length === 0 || !sel.cart?.lines?.length) {
    $body.html('<div class="empty">Your cart is empty.</div>');
    $('#cart-drawer .total-amt').text('$0.00');
    $('#cart-drawer .checkout').prop('disabled', true);
    return;
  }

  let totalAmount = 0;
  const groupsHtml = configs
    .map((group, i) => {
      const allLinesForGroup = [group.bikeLine, group.wrapLine, ...group.accessoryLines].filter(Boolean);
      const groupSubtotal = allLinesForGroup.reduce(
        (sum, l) => sum + parseFloat(l.merchandise.price?.amount || 0) * (l.quantity || 1),
        0
      );
      totalAmount += groupSubtotal;

      const linesHtml = allLinesForGroup.map((line) => renderLine(line)).join('');
      const isBike = group.bikeLine?.merchandise.selectedOptions?.find((o) => /colou?r/i.test(o.name));
      const headerName = group.bikeLine
        ? `Bike ${i + 1}${isBike ? ` — ${isBike.value}` : ''}`
        : `Configuration ${i + 1}`;

      return `
        <div class="group ${group.isCurrent ? 'current' : ''}">
          <div class="group-hdr">
            <strong>${escape(headerName)}</strong>
            <span class="meta">${fmt(groupSubtotal)} · ${allLinesForGroup.length} item${allLinesForGroup.length === 1 ? '' : 's'}</span>
          </div>
          ${linesHtml}
          <div class="group-actions">
            ${group.isCurrent
              ? '<span class="meta" style="font-size:11px;color:#888;align-self:center;">(currently editing)</span>'
              : `<button data-act="edit-config" data-session-id="${escape(group.sessionId)}">Edit</button>`
            }
            <button class="danger" data-act="remove-config" data-session-id="${escape(group.sessionId)}">Remove</button>
          </div>
        </div>
      `;
    })
    .join('');

  $body.html(groupsHtml);
  $('#cart-drawer .total-amt').text(fmt(totalAmount));
  $('#cart-drawer .checkout').prop('disabled', false);
}

function renderLine(line) {
  const opts = (line.merchandise.selectedOptions || []).filter(
    (o) => o.value && o.value.toLowerCase() !== 'default title'
  );
  const optsText = opts.length ? opts.map((o) => o.value).join(' / ') : '';
  const img = line.merchandise.image?.url || '';
  const price = parseFloat(line.merchandise.price?.amount || 0) * (line.quantity || 1);

  const qtyLabel = (line.quantity || 1) > 1 ? `× ${line.quantity}` : '';
  return `
    <div class="line">
      <img src="${escape(img)}" alt="" loading="lazy" />
      <div class="title">
        ${escape(line.merchandise.product.title)}
        ${optsText ? `<span class="opts">${escape(optsText)}</span>` : ''}
      </div>
      <span class="qty-label">${qtyLabel}</span>
      <span class="price">${fmt(price)}</span>
      <button class="remove" data-act="remove-line" data-line-id="${escape(line.id)}" aria-label="Remove">×</button>
    </div>
  `;
}

function fmt(amount) {
  return `$${amount.toFixed(2)}`;
}

function escape(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}
