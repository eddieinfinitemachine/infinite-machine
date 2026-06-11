import $ from '../lib/jquery.js';
import { onChange, getCart, getCheckoutUrl } from '../lib/cart.js';
import { onSelectionChange } from '../lib/selection.js';

// Floating debug panel for development. Shows live cart state, selection
// state, and provides a "reset cart" button. Anchored bottom-left.
// Remove the initDebugPanel() call in configurator-init.js to disable.

const STYLE = `
  #cart-debug-panel { position: fixed; bottom: 16px; left: 16px;
    width: 340px; max-height: 70vh; overflow: auto;
    background: rgba(15,15,20,0.96); color: #b8ffb8;
    font: 11px/1.4 ui-monospace, 'SF Mono', Menlo, monospace;
    border: 1px solid #2a4a2a; border-radius: 6px;
    z-index: 2147483647; box-shadow: 0 4px 20px rgba(0,0,0,0.5); }
  #cart-debug-panel .hdr { display: flex; align-items: center; justify-content: space-between;
    padding: 8px 10px; background: #1a2a1a; border-bottom: 1px solid #2a4a2a;
    cursor: move; user-select: none; }
  #cart-debug-panel .hdr strong { color: #fff; font-size: 12px; }
  #cart-debug-panel .hdr .ctl { color: #888; cursor: pointer; padding: 0 6px; }
  #cart-debug-panel .hdr .ctl:hover { color: #fff; }
  #cart-debug-panel .body { padding: 10px; }
  #cart-debug-panel .row { margin: 4px 0; }
  #cart-debug-panel .line { margin: 6px 0; padding: 6px; background: rgba(184,255,184,0.06);
    border-left: 2px solid #4a8a4a; }
  #cart-debug-panel .line .ttl { color: #fff; font-weight: 600; }
  #cart-debug-panel .line .sub { color: #888; font-size: 10px; }
  #cart-debug-panel .line .attr { color: #7aa; font-size: 10px; }
  #cart-debug-panel .attrs { margin: 8px 0; padding: 6px;
    background: rgba(122,170,170,0.08); border-left: 2px solid #4a7a7a; }
  #cart-debug-panel .empty { color: #666; font-style: italic; }
  #cart-debug-panel .btns { margin-top: 10px; display: flex; gap: 6px; }
  #cart-debug-panel button { flex: 1; padding: 6px 8px; background: #2a2a2a; color: #fff;
    border: 1px solid #444; border-radius: 3px; cursor: pointer; font: inherit; }
  #cart-debug-panel button:hover { background: #3a3a3a; }
  #cart-debug-panel button.danger { background: #4a1a1a; border-color: #6a2a2a; }
  #cart-debug-panel button.danger:hover { background: #6a2a2a; }
  #cart-debug-panel a { color: #6cf; text-decoration: none; }
  #cart-debug-panel a:hover { text-decoration: underline; }
  #cart-debug-panel .sel { margin-top: 8px; padding: 6px;
    background: rgba(184,184,255,0.05); border-left: 2px solid #4a4a8a; color: #aab; }
  #cart-debug-panel.collapsed .body { display: none; }
`;

export function initDebugPanel({ configId }) {
  if (document.getElementById('cart-debug-panel')) return; // idempotent

  $('<style>').text(STYLE).appendTo('head');

  const $panel = $(`
    <div id="cart-debug-panel" class="collapsed">
      <div class="hdr">
        <strong>Cart Debug</strong>
        <span>
          <span class="ctl" data-act="toggle">[+]</span>
          <span class="ctl" data-act="close" title="Hide for this session">[×]</span>
        </span>
      </div>
      <div class="body"></div>
    </div>
  `);
  $('body').append($panel);

  const $body = $panel.find('.body');

  function fmtMoney(m) {
    if (!m) return '?';
    return `$${parseFloat(m.amount).toFixed(2)}`;
  }

  function render() {
    const cart = getCart();
    const checkoutUrl = getCheckoutUrl();

    if (!cart) {
      $body.html('<div class="empty">No cart yet</div>');
      return;
    }

    const attrEntries = Object.entries(cart.attributesByKey || {}).filter(([, v]) => v);
    const attrsHtml = attrEntries.length
      ? `<div class="attrs"><div><strong>Cart Attributes</strong></div>${attrEntries
          .map(([k, v]) => `<div>${k}: <span style="color:#fff">${v}</span></div>`)
          .join('')}</div>`
      : '';

    const linesHtml = cart.lines.length
      ? cart.lines
          .map((l) => {
            const variantTitle = l.merchandise.selectedOptions?.length
              ? l.merchandise.selectedOptions.map((o) => `${o.name}=${o.value}`).join(', ')
              : l.merchandise.title;
            const lineAttrs = Object.entries(l.attributesByKey || {})
              .filter(([k, v]) => v && k !== '_config_id')
              .map(([k, v]) => `<div class="attr">${k}: ${v}</div>`)
              .join('');
            const isTmp = l.id.startsWith('tmp_');
            return `
              <div class="line">
                <div class="ttl">${l.merchandise.product.title} × ${l.quantity}</div>
                <div class="sub">${variantTitle} — ${fmtMoney(l.merchandise.price)}</div>
                <div class="sub" style="opacity:0.5">id: ${l.id.slice(-14)}${isTmp ? ' (optimistic)' : ''}</div>
                ${lineAttrs}
              </div>`;
          })
          .join('')
      : '<div class="empty">(no lines)</div>';

    $body.html(`
      <div class="row"><strong style="color:#fff">Cart:</strong> ${cart.id.slice(-18)}</div>
      <div class="row"><strong style="color:#fff">Total:</strong> ${fmtMoney(cart.cost.totalAmount)} (${cart.totalQuantity} items)</div>
      ${attrsHtml}
      <div class="row" style="margin-top:8px;color:#fff"><strong>Lines (${cart.lines.length})</strong></div>
      ${linesHtml}
      <div class="sel" id="cart-debug-sel"><em>Loading selection...</em></div>
      ${checkoutUrl ? `<div class="row" style="margin-top:8px"><a href="${checkoutUrl}" target="_blank">Open checkout →</a></div>` : ''}
      <div class="btns">
        <button data-act="copy">Copy JSON</button>
        <button data-act="reset" class="danger">Reset cart</button>
      </div>
    `);

    renderSelection();
  }

  function renderSelection() {
    const $sel = $('#cart-debug-sel');
    if (!$sel.length) return;
    onSelectionChange((sel) => {
      const parts = [];
      if (sel.variant) parts.push(`variant: ${sel.variant.color} (${sel.variant.id.slice(-6)})`);
      if (sel.wrap) parts.push(`wrap: ${sel.wrap.color}`);
      if (sel.activeBundle) parts.push(`bundle: ${sel.activeBundle}`);
      parts.push(`accessories: ${sel.accessories.length}`);
      parts.push(`region: ${sel.region || '(none)'}`);
      $sel.html(parts.map((p) => `<div>${p}</div>`).join(''));
    });
  }

  // Header controls
  $panel.on('click', '.ctl', function () {
    const act = $(this).attr('data-act');
    if (act === 'toggle') {
      $panel.toggleClass('collapsed');
      $(this).text($panel.hasClass('collapsed') ? '[+]' : '[−]');
    } else if (act === 'close') {
      $panel.remove();
    }
  });

  // Body buttons
  $panel.on('click', 'button', function () {
    const act = $(this).attr('data-act');
    if (act === 'reset') {
      if (!confirm('Reset cart? This clears localStorage and reloads.')) return;
      if (configId) localStorage.removeItem(`olto_cart_${configId}`);
      if (configId) localStorage.removeItem(`${configId}_active_bundle`);
      // also clear any other namespaced keys
      Object.keys(localStorage)
        .filter((k) => k.startsWith('olto_cart_') || k.endsWith('_active_bundle'))
        .forEach((k) => localStorage.removeItem(k));
      window.location.reload();
    } else if (act === 'copy') {
      navigator.clipboard.writeText(JSON.stringify(getCart(), null, 2));
      $(this).text('Copied!');
      setTimeout(() => $(this).text('Copy JSON'), 1200);
    }
  });

  onChange(render);
  render(); // initial render in case cart already exists
}
