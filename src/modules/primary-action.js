import $ from '../lib/jquery.js';
import { onRegionChange, getCurrentRegion } from './location-flow.js';
import { openCartDrawer } from './cart-drawer.js';
import { checkAllRequired, scrollToFirstInvalid } from './form-validation.js';

// Unified bottom-bar button. One [primary-action] element whose text + click
// behavior change based on (region, payment-choice). Replaces the legacy
// trio of [buy-button] / [deposit-button] / [form-button].
//
// State matrix:
//   region=us, payment=full     → "Checkout" → cart drawer → Shopify checkout
//   region=us, payment=deposit  → "Submit"   → submit Interest Form ("Save your configuration")
//   region=non-us               → "Submit"   → submit Interest Form
//
// "Save your configuration" and the rest-of-world flow submit the SAME
// #wf-form-Olto-Interest-Form. The text element inside the button is
// .text-size-large (Webflow convention).

const TOTAL_BLOCK = '[data-total-block]';
const FORM_BLOCK = '[form-block]';
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

  // Click handler — bound to the [checkout-actions] bar, not [primary-action]
  // itself: the button can be pointer-events:none (disabled look), so the click
  // lands on the bar (pass-through when disabled, bubble-up when enabled).
  // Validate first; if anything required is missing, surface it and scroll there
  // instead of submitting. Otherwise branch by state.
  $('[checkout-actions]').on('click', (e) => {
    e.preventDefault();
    if (!checkAllRequired()) {
      scrollToFirstInvalid();
      return;
    }
    if (currentState() === 'checkout') openCartDrawer();
    else submitForm('#wf-form-Olto-Interest-Form');
  });

  syncButton();
}

function currentState() {
  const region = getCurrentRegion();
  if (region === 'us' && currentPayment === 'full') return 'checkout';
  return 'interest'; // non-US, or US + "Save your configuration" → interest form
}

function syncButton() {
  const $btn = $('[primary-action]');
  const $text = $btn.find('.text-size-large').first();
  const region = getCurrentRegion();
  const checkout = currentState() === 'checkout';
  // The form shows for US + "Save your configuration", or for any non-US region.
  const saveMode = region === 'us' && currentPayment === 'deposit';
  const showForm = saveMode || (!!region && region !== 'us');

  $text.text(checkout ? 'Checkout' : 'Submit');
  $(TOTAL_BLOCK).css(checkout ? { display: 'flex', opacity: 1 } : { display: 'none', opacity: 0 });
  $(FORM_BLOCK).css(showForm ? { display: 'flex', opacity: 1 } : { display: 'none', opacity: 0 });
  if (showForm) setFormContext(saveMode);

  // The email field is [data-required] but only counts while visible, so the
  // button's disabled state must be re-evaluated whenever the form is shown/hidden.
  checkAllRequired();
}

// Tailor the same form to its context: US "Save your configuration" vs the
// rest-of-world "Register your Interest". Swaps the heading and shows the right
// note paragraph ([save-content] vs [non-us-content]). The non-US heading is
// captured from Webflow on first run so it keeps whatever you authored there.
let interestHeading = null;
function setFormContext(saveMode) {
  const $form = $(FORM_BLOCK);
  let $title = $form.find('[data-form-title]').first();
  if (!$title.length) $title = $form.find('[option-head] .text-size-regular').first();
  if ($title.length) {
    if (interestHeading === null) interestHeading = $title.text() || 'Register your Interest';
    $title.text(saveMode ? 'Save your configuration' : interestHeading);
  }
  $form.find('[non-us-content]').css('display', saveMode ? 'none' : '');
  $form.find('[save-content]').css('display', saveMode ? '' : 'none');
}

function submitForm(selector) {
  const $form = $(selector);
  if (!$form.length) {
    console.warn(`[PrimaryAction] Form ${selector} not found`);
    return;
  }
  // Populate hidden inputs with current config snapshot before submit
  fillFormSnapshot($form);

  // Prefer clicking the form's internal [data-form-button] (more reliable —
  // Webflow binds the submit on the button click). Fallback to jQuery's
  // .submit() event for forms that don't have the button yet.
  const $submitBtn = $form.find('[data-form-button]').first();
  if ($submitBtn.length) {
    $submitBtn[0].click();
  } else {
    console.warn(`[PrimaryAction] No [data-form-button] inside ${selector} — using form.submit() event fallback`);
    $form.submit();
  }

  // Collapse the rest of the configurator ONLY once Webflow's success state
  // actually appears (.w-form-done becomes visible) — not on the submit attempt,
  // so a validation/network failure leaves everything in place to retry.
  collapseOnSuccess($form);
}

// Watch the form's Webflow success element (.w-form-done). When it becomes
// visible (display flips off "none"), hide the other steps + the bottom bar so
// only the success message remains.
function collapseOnSuccess($form) {
  const wrap = $form.closest('.w-form').get(0) || $form.closest('[form-block]').get(0);
  const done = wrap?.querySelector('.w-form-done');
  if (!done) {
    console.warn('[PrimaryAction] No .w-form-done success element found — leaving layout as-is');
    return;
  }

  const isShown = () => getComputedStyle(done).display !== 'none';
  const collapse = () => {
    $form.closest('[step-block]').siblings().hide();
    $('[checkout-actions]').hide();
  };

  if (isShown()) {
    collapse();
    return;
  }
  const obs = new MutationObserver(() => {
    if (isShown()) {
      obs.disconnect();
      collapse();
    }
  });
  obs.observe(done, { attributes: true, attributeFilter: ['style', 'class'] });
  setTimeout(() => obs.disconnect(), 30000); // stop watching after a while
}

// Pulls the current config state from DOM-derived selections and writes to
// the form's hidden inputs. The receiving system (Hubspot etc.) sees the
// configuration the user was looking at when they submitted.
function fillFormSnapshot($form) {
  const country = $('#country').val() || '';
  const variant = $('[data-option-group="color"] .sf-active[data-swatch]').attr('data-swatch') || '';
  const pack =
    $(`${PAYMENT_GROUP} .${ACTIVE_CLASS}`).attr('data-option-value') === 'full'
      ? ''
      : $('[data-preset-value].sf-active').attr('data-preset-value') || '';
  const wrap = $('[data-inc-item="wrap-label"]').text() || '';
  const quantity = $('[data-config-qty-input]').first().text().trim() || '1';
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
  $form.find('input[name="quantity"]').val(quantity);
  $form.find('input[name="accessories"]').val(accessories);
}
