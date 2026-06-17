import $ from '../lib/jquery.js';
import {
  removeLine,
  startNewConfigSession,
  switchToConfig,
  removeConfig,
  getCheckoutUrl,
} from '../lib/cart.js';
import { onSelectionChange, getSelection } from '../lib/selection.js';

// Cart drawer. The shell + group/line templates are BUILT AND STYLED IN WEBFLOW;
// this module only toggles open/closed state and clones the templates to render
// the current cart. No styles or markup are injected.
//
// Required markup (hooks):
//   [data-cart-drawer]              drawer wrapper — we set data-cart-state="open|closed"
//     [data-act="close"]            any close trigger (overlay, × button)
//     [data-cart-empty]             empty-state element (shown only when cart empty)
//     [data-cart-groups]            mount point for the cloned config groups
//     [data-cart-group-template]    ONE group template (cloned per config; style="display:none"):
//        [data-group-name]          config title text
//        [data-group-meta]          subtotal · item count text
//        [data-group-lines]         mount for the cloned lines
//        [data-group-edit]          (also data-act="edit-config") switch to this config
//        [data-group-editing]       "currently editing" label (shown on the active config)
//        [data-group-remove]        (also data-act="remove-config") drop the whole config
//        [data-cart-line-template]  ONE line template (cloned per line; style="display:none"):
//           [data-line-img]         <img> thumbnail
//           [data-line-title]       product title text
//           [data-line-opts]        variant/options text (hidden when none)
//           [data-line-qty]         "× N" label (blank when qty 1)
//           [data-line-price]       line price text
//           [data-act="remove-line"] remove this line
//     [data-cart-total]             total amount text
//     [data-act="add-another"]      start a new config session
//     [data-act="checkout"]         go to Shopify checkout (auto-disabled when empty)
//
// Style the open/close transition in Webflow off [data-cart-state="open"].
// The bike line is qty-locked (no stepper) — qty is driven from the configurator.

const BIKE_HANDLE_KEY = 'mainProductHandle';

let cfg = null;
let groupTemplateHtml = null;
let initialized = false;

export function initCartDrawer(config) {
  if (initialized) return;
  const drawer = document.querySelector('[data-cart-drawer]');
  if (!drawer) {
    console.warn('[CartDrawer] No [data-cart-drawer] markup on page — drawer disabled');
    return;
  }
  initialized = true;
  cfg = config;
  cfg[BIKE_HANDLE_KEY] = config.product?.handle;

  // Cache the group template (with its nested line template) and remove it from
  // the DOM so only cloned, filled copies ever render.
  const $tpl = $(drawer).find('[data-cart-group-template]').first();
  if ($tpl.length) {
    groupTemplateHtml = $tpl[0].outerHTML;
    $tpl.remove();
  } else {
    console.warn('[CartDrawer] No [data-cart-group-template] — groups will not render');
  }
  console.log('[CartDrawer] init OK — drawer found, group template:', $tpl.length ? 'cached' : 'MISSING');

  setState(drawer, 'closed');
  $(drawer).on('click', '[data-act]', handleClick);

  onSelectionChange(render);
  render(getSelection());
}

function setState(drawer, state) {
  drawer.setAttribute('data-cart-state', state);
  drawer.setAttribute('aria-hidden', state === 'open' ? 'false' : 'true');
}

export function openCartDrawer() {
  const drawer = document.querySelector('[data-cart-drawer]');
  if (!drawer) {
    console.warn('[CartDrawer] openCartDrawer: no [data-cart-drawer] found — nothing to open');
    return;
  }
  console.log('[CartDrawer] openCartDrawer → setting data-cart-state="open" on', drawer);
  setState(drawer, 'open');
}

function close() {
  const drawer = document.querySelector('[data-cart-drawer]');
  if (drawer) setState(drawer, 'closed');
}

function handleClick(e) {
  const el = e.target.closest('[data-act]');
  if (!el) return;
  const act = el.getAttribute('data-act');
  const lineId = el.getAttribute('data-line-id');
  const sessionId = el.getAttribute('data-session-id');

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
  const drawer = document.querySelector('[data-cart-drawer]');
  if (!drawer) return;

  const $groups = $(drawer).find('[data-cart-groups]');
  const $empty = $(drawer).find('[data-cart-empty]');
  const $total = $(drawer).find('[data-cart-total]');
  const $checkout = $(drawer).find('[data-act="checkout"]');
  const configs = sel.allConfigs || [];

  $groups.empty();

  if (configs.length === 0 || !sel.cart?.lines?.length) {
    $empty.show();
    $total.text(fmt(0));
    $checkout.prop('disabled', true);
    return;
  }

  $empty.hide();
  $checkout.prop('disabled', false);

  let totalAmount = 0;
  configs.forEach((group, i) => {
    const lines = [group.bikeLine, group.wrapLine, ...group.accessoryLines].filter(Boolean);
    const subtotal = lines.reduce(
      (s, l) => s + parseFloat(l.merchandise.price?.amount || 0) * (l.quantity || 1),
      0
    );
    totalAmount += subtotal;
    if (groupTemplateHtml) $groups.append(buildGroup(group, i, lines, subtotal));
  });

  $total.text(fmt(totalAmount));
}

function buildGroup(group, i, lines, subtotal) {
  const $g = $(groupTemplateHtml).removeAttr('data-cart-group-template').css('display', '');
  $g.attr('data-current', group.isCurrent ? 'true' : 'false');

  const colorOpt = group.bikeLine?.merchandise.selectedOptions?.find((o) => /colou?r/i.test(o.name));
  const name = group.bikeLine
    ? `Bike ${i + 1}${colorOpt ? ` — ${colorOpt.value}` : ''}`
    : `Configuration ${i + 1}`;
  $g.find('[data-group-name]').text(name);
  $g.find('[data-group-meta]').text(
    `${fmt(subtotal)} · ${lines.length} item${lines.length === 1 ? '' : 's'}`
  );

  // Edit button vs "currently editing" label
  const $edit = $g.find('[data-group-edit]');
  const $editing = $g.find('[data-group-editing]');
  if (group.isCurrent) {
    $edit.hide();
    $editing.show();
  } else {
    $edit.show().attr('data-session-id', group.sessionId);
    $editing.hide();
  }
  $g.find('[data-group-remove]').attr('data-session-id', group.sessionId);

  // Lines — clone the nested line template per line
  const $lineMount = $g.find('[data-group-lines]');
  const $lineTpl = $lineMount.find('[data-cart-line-template]').first();
  const lineHtml = $lineTpl.length ? $lineTpl[0].outerHTML : null;
  $lineTpl.remove();
  if (lineHtml) {
    lines.forEach((line) => $lineMount.append(buildLine(line, lineHtml, line === group.bikeLine)));
  }

  return $g;
}

function buildLine(line, lineHtml, isBike) {
  const $l = $(lineHtml).removeAttr('data-cart-line-template').css('display', '');

  const opts = (line.merchandise.selectedOptions || []).filter(
    (o) => o.value && o.value.toLowerCase() !== 'default title'
  );
  const optsText = opts.length ? opts.map((o) => o.value).join(' / ') : '';
  const img = line.merchandise.image?.url || '';
  const price = parseFloat(line.merchandise.price?.amount || 0) * (line.quantity || 1);
  const qtyLabel = (line.quantity || 1) > 1 ? `× ${line.quantity}` : '';

  const $img = $l.find('[data-line-img]');
  if (img) $img.attr('src', img);
  else $img.hide();

  $l.find('[data-line-title]').text(line.merchandise.product.title);

  const $opts = $l.find('[data-line-opts]');
  if (optsText) $opts.text(optsText);
  else $opts.hide();

  $l.find('[data-line-qty]').text(qtyLabel);
  $l.find('[data-line-price]').text(fmt(price));

  // The bike is the core of the config — it can't be removed from the drawer.
  // Drop its remove button and mark the line (style [data-line-locked] if wanted).
  const $remove = $l.find('[data-act="remove-line"]');
  if (isBike) {
    $l.attr('data-line-locked', 'true');
    $remove.remove();
  } else {
    $remove.attr('data-line-id', line.id);
  }

  return $l;
}

function fmt(amount) {
  return `$${amount.toFixed(2)}`;
}
