import $ from '../lib/jquery.js';
import { onRegionChange, getCurrentRegion } from './location-flow.js';
import { getCheckoutUrl } from '../lib/cart.js';
import { checkAllRequired, scrollToFirstInvalid } from './form-validation.js';

// Bottom-bar button + the always-present interest/save form (the LAST step).
//   non-US             → form expanded, "Register Your Interest" head; button "Submit" → submit form
//   US, form collapsed → "Not ready to buy? / Save" head; button "Checkout" → cart drawer
//   US, form expanded  → button "Submit" → submit the form (save configuration)
// Every "interest" case submits the same #wf-form-Olto-Interest-Form. The click
// is bound to [checkout-actions] (the button itself can be pointer-events:none).

const TOTAL_BLOCK = '[data-total-block]';

let formContent = null; // collapsible body of the form (everything after the heads)
let formEmail = null; // the email input (data-required toggled by open state)
let formIconSvg = null; // <svg> inside the save head's chevron icon
let chevronMarkup = ''; // original chevron paths (restored on collapse)
let formExpanded = false; // is the form open? (drives US checkout-vs-submit)

// "X" close icon in the chevron's 16×16 viewBox.
const CLOSE_MARKUP = '<path d="M4 4L12 12" stroke="black"></path><path d="M12 4L4 12" stroke="black"></path>';

export function initPrimaryAction() {
  const $btn = $('[primary-action]');
  if (!$btn.length) {
    console.warn('[PrimaryAction] No [primary-action] button found');
    return;
  }

  setupInterestForm();
  onRegionChange(({ region }) => applyRegion(region));

  // Click on the BAR (the button can be pointer-events:none). Validate first;
  // if anything required is missing, surface it and scroll there. The form lives
  // inside the bar (US), so clicks within it — the save head toggle, inputs, its
  // own submit button — must NOT trigger checkout.
  $('[checkout-actions]').on('click', (e) => {
    if (e.target.closest('[form-block]')) return;
    e.preventDefault();
    if (!checkAllRequired(true)) {
      // arm error marks on the first submit attempt
      scrollToFirstInvalid();
      return;
    }
    if (currentState() === 'checkout') {
      // Cart drawer disabled (client request) — go straight to Shopify checkout.
      const url = getCheckoutUrl();
      if (url) window.location.href = url;
    } else submitForm('#wf-form-Olto-Interest-Form');
  });

  // US "Save your configuration" has its own submit button (the bottom bar stays
  // "Checkout"). Validate, then submit the same interest form.
  $(document).on('click', '[data-submit-btn="save"]', (e) => {
    e.preventDefault();
    if (!checkAllRequired(true)) {
      scrollToFirstInvalid();
      return;
    }
    submitForm('#wf-form-Olto-Interest-Form');
  });

  applyRegion(getCurrentRegion());

  // Force the form wrapper visible AFTER all setup, so nothing (Webflow form init,
  // region/accordion logic) can leave it hidden.
  $('[form-block]').css({ display: 'flex', opacity: 1 });
}

// The interest/save form lives in the bottom action bar (next to total +
// checkout). Two heads ([option-head="non-us"] / [option-head="save"]) + a
// collapsible body. Wrap everything after the heads into one
// [data-step-content]; the save head's chevron toggles it.
function setupInterestForm() {
  const form = document.getElementById('wf-form-Olto-Interest-Form');
  if (!form) {
    console.warn('[PrimaryAction] No #wf-form-Olto-Interest-Form on page — interest form not wired');
    return;
  }

  let content = form.querySelector('[data-step-content]');
  if (!content) {
    content = document.createElement('div');
    content.setAttribute('data-step-content', '');
    Array.from(form.children)
      .filter((c) => !c.hasAttribute('option-head'))
      .forEach((c) => content.appendChild(c));
    form.appendChild(content);
  }
  content.style.overflow = 'hidden';
  content.style.transition = 'height 0.3s ease';
  formContent = content;
  formEmail = content.querySelector('input[type="email"], input.is-email');

  const saveHead = form.querySelector('[option-head="save"]');
  const icon = saveHead ? saveHead.querySelector('.icon-embed-16') : null;
  formIconSvg = icon ? icon.querySelector('svg') : null;
  chevronMarkup = formIconSvg ? formIconSvg.innerHTML : '';
  if (saveHead) saveHead.addEventListener('click', () => setFormOpen(!formExpanded, true));
}

// Open/close the form body. Plain height auto/0 — no scrollHeight measurement,
// so it works even before layout settles. The chevron icon swaps to an "X" when
// open and back to the chevron when collapsed.
function setFormOpen(open, sync) {
  if (formContent) formContent.style.height = open ? 'auto' : '0px';
  if (formIconSvg) formIconSvg.innerHTML = open ? CLOSE_MARKUP : chevronMarkup;
  // The email lives in the collapsible body. jQuery ':visible' still counts it
  // when the body is height:0/overflow:hidden (it checks the element's own size,
  // not ancestor clipping), so a COLLAPSED save form would otherwise gate the
  // Checkout button. Only require the email while the form is actually open.
  if (formEmail) {
    if (open) formEmail.setAttribute('data-required', '');
    else formEmail.removeAttribute('data-required');
  }
  formExpanded = open;
  if (sync) syncButton();
}

// Swap heads/content/expand per region, then resync the button.
function applyRegion(region) {
  const nonUs = !!region && region !== 'us';
  const $form = $('#wf-form-Olto-Interest-Form');

  // Relocate the form: US → first item in the action bar (next to total +
  // checkout); non-US → appended as the last step in the flow.
  const formBlock = document.querySelector('[form-block]');
  const steps = document.querySelector('[data-flow="steps"]');
  const bar = document.querySelector('[checkout-actions]');
  if (formBlock) {
    if (nonUs && steps) {
      if (formBlock.parentNode !== steps) steps.appendChild(formBlock);
    } else if (!nonUs && bar) {
      if (bar.firstElementChild !== formBlock) bar.insertBefore(formBlock, bar.firstElementChild);
    }
  }

  $form.find('[option-head="non-us"]').css('display', nonUs ? '' : 'none');
  $form.find('[option-head="save"]').css('display', nonUs ? 'none' : '');
  $form.find('[non-us-content]').css('display', nonUs ? '' : 'none');
  $form.find('[save-content]').css('display', nonUs ? 'none' : '');
  // The save form's own submit button is US-only; non-US submits via the bottom bar.
  $form.find('[data-submit-btn="save"]').css('display', nonUs ? 'none' : '');

  setFormOpen(nonUs, false); // non-US expanded by default; US collapsed
  syncButton();
}

function currentState() {
  const region = getCurrentRegion();
  // US always checkouts via the bottom bar; the US "Save your configuration" form
  // submits through its own [data-submit-btn="save"]. Non-US submits the form.
  return region && region !== 'us' ? 'interest' : 'checkout';
}

function syncButton() {
  const $text = $('[primary-action]').find('.text-size-large').first();
  const checkout = currentState() === 'checkout';
  $text.text(checkout ? 'Checkout' : 'Submit');
  $(TOTAL_BLOCK).css(checkout ? { display: 'flex', opacity: 1 } : { display: 'none', opacity: 0 });
  // Email is [data-required] but only counts while the form is open → re-check.
  checkAllRequired();
}

function submitForm(selector) {
  const $form = $(selector);
  if (!$form.length) {
    console.warn(`[PrimaryAction] Form ${selector} not found`);
    return;
  }
  fillFormSnapshot($form);

  const $submitBtn = $form.find('[data-form-button]').first();
  if ($submitBtn.length) {
    $submitBtn[0].click();
  } else {
    console.warn(`[PrimaryAction] No [data-form-button] inside ${selector} — using form.submit() fallback`);
    $form.submit();
  }

  collapseOnSuccess($form);
}

// Collapse the rest of the configurator ONLY once Webflow's success state
// actually appears (.w-form-done becomes visible) — not on the submit attempt.
function collapseOnSuccess($form) {
  const wrap = $form.closest('.w-form').get(0) || $form.closest('.checkout_interest-form').get(0);
  const done = wrap?.querySelector('.w-form-done');
  if (!done) {
    console.warn('[PrimaryAction] No .w-form-done success element found — leaving layout as-is');
    return;
  }
  const isShown = () => getComputedStyle(done).display !== 'none';
  const collapse = () => {
    // Keep the form (with its success message) wherever it lives — US: in the
    // action bar, non-US: as a step — and hide everything else: the config steps
    // and the bar's total + checkout button.
    const formBlock = document.querySelector('[form-block]');
    $('[data-flow="steps"]').children().not(formBlock).hide();
    $('[checkout-actions]').children().not(formBlock).hide();
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
  setTimeout(() => obs.disconnect(), 30000);
}

// Pulls the current config from the DOM into the form's hidden inputs so the
// receiving system sees the configuration the user was looking at.
function fillFormSnapshot($form) {
  const country = $('#country').val() || '';
  const variant = $('[data-option-group="color"] .sf-active[data-swatch]').attr('data-swatch') || '';
  const pack = $('[data-preset-value].sf-active').attr('data-preset-value') || '';
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
