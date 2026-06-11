import $ from '../lib/jquery.js';
import { onRegionChange, getCurrentRegion } from './location-flow.js';
import { openCartDrawer } from './cart-drawer.js';

// Unified bottom-bar button. One [primary-action] element whose text + click
// behavior change based on (region, payment-choice). Replaces the legacy
// trio of [buy-button] / [deposit-button] / [form-button].
//
// State matrix:
//   region=us, payment=full        → "Checkout →"  → Shopify checkout
//   region=us, payment=deposit     → "Submit"      → submit Save Form
//   region=non-us                  → "Submit"      → submit Interest Form
//
// The text element inside the button is .text-size-large (Webflow convention).

const TOTAL_BLOCK = '[data-total-block]';
const PAYMENT_GROUP = '[data-option-group="payment"]';
const PAYMENT_OPTION = '.custom-option-value';
const ACTIVE_CLASS = 'sf-active';

let currentPayment = 'full'; // default — only meaningful when region=us

export function initPrimaryAction() {
  const $btn = $('[primary-action]');
  if (!$btn.length) {
    console.warn('[PrimaryAction] No [primary-action] button found');
    return;
  }

  // React to payment option clicks (only relevant when region=us)
  $(document).on('click', `${PAYMENT_GROUP} ${PAYMENT_OPTION}`, function () {
    const value = $(this).attr('data-option-value');
    if (!value) return;
    $(this).siblings(`.${ACTIVE_CLASS}`).removeClass(ACTIVE_CLASS);
    $(`${PAYMENT_GROUP} ${PAYMENT_OPTION}`).removeClass(ACTIVE_CLASS);
    $(this).addClass(ACTIVE_CLASS);
    currentPayment = value;
    syncButton();
  });

  // React to region changes
  onRegionChange(() => syncButton());

  // Click handler — branch by state
  $btn.on('click', (e) => {
    e.preventDefault();
    const state = currentState();
    if (state === 'checkout') openCartDrawer();
    else if (state === 'save') submitForm('#wf-form-Olto-Save-Form');
    else submitForm('#wf-form-Olto-Interest-Form');
  });

  syncButton();
}

function currentState() {
  const region = getCurrentRegion();
  if (region !== 'us') return 'interest';
  return currentPayment === 'deposit' ? 'save' : 'checkout';
}

function syncButton() {
  const $btn = $('[primary-action]');
  const $text = $btn.find('.text-size-large').first();
  const state = currentState();

  if (state === 'checkout') {
    $text.text('Checkout →');
    $(TOTAL_BLOCK).css({ display: 'flex', opacity: 1 });
    $(PAYMENT_GROUP).closest('[payment-block]').css({ display: '', opacity: '' });
  } else {
    $text.text('Submit');
    $(TOTAL_BLOCK).css({ display: 'none', opacity: 0 });
    if (state === 'interest') {
      $(PAYMENT_GROUP).closest('[payment-block]').css({ display: 'none', opacity: 0 });
    }
  }
}

function submitForm(selector) {
  const $form = $(selector);
  if (!$form.length) {
    console.warn(`[PrimaryAction] Form ${selector} not found`);
    return;
  }
  // Populate hidden inputs with current config snapshot before submit
  fillFormSnapshot($form);

  // Find the form's internal submit button (Tom added [data-form-button]).
  // Clicking it fires Webflow's submit handler reliably — far more robust
  // than jQuery .submit() because Webflow binds on the button click event
  // and the click goes through the full bubbling chain.
  const $submitBtn = $form.find('[data-form-button]').first();
  if (!$submitBtn.length) {
    console.warn(`[PrimaryAction] No [data-form-button] inside ${selector} — falling back to form.submit() event`);
    $form.submit();
    return;
  }

  // Hide all other configurator step-blocks so only the form's step
  // remains visible. Webflow will then auto-toggle the form ↔ success div
  // inside that step on its own.
  const $thisStep = $form.closest('[step-block]');
  $('[step-block]').not($thisStep).hide();
  $('[checkout-actions]').hide();

  $submitBtn[0].click();
}

// Pulls the current config state from DOM-derived selections and writes to
// the form's hidden inputs. The receiving system (Hubspot etc.) sees the
// configuration the user was looking at when they submitted.
function fillFormSnapshot($form) {
  const country = $('#country').val() || '';
  const variant = $('[sf-change-option="color"] .sf-active[sf-option-value]').attr('sf-option-value') || '';
  const pack =
    $(`${PAYMENT_GROUP} .${ACTIVE_CLASS}`).attr('data-option-value') === 'full'
      ? ''
      : $('[data-preset-value].sf-active').attr('data-preset-value') || '';
  const wrap = $('[data-inc-item="wrap-label"]').text() || '';
  const accessories = $('[data-accessories="list"] [data-item="label"]')
    .map(function () {
      return $(this).text();
    })
    .get()
    .join(', ');

  $form.find('input[name="location"]').val(country);
  $form.find('input[name="variant"]').val(variant);
  $form.find('input[name="pack"]').val(pack);
  $form.find('input[name="wrap"]').val(wrap);
  $form.find('input[name="accessories"]').val(accessories);
}
