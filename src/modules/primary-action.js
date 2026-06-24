import $ from '../lib/jquery.js';
import { onRegionChange, getCurrentRegion } from './location-flow.js';
import { getCheckoutUrl } from '../lib/cart.js';
import { checkAllRequired, scrollToFirstInvalid } from './form-validation.js';

// Bottom-bar button + the interest/save MODAL trigger.
// The interest/save form now lives in its own Webflow modal
// ([data-modal-name="interest"], containing #wf-form-Olto-Interest-Form). This
// module only OPENS that modal — open/close transitions + close buttons are
// handled by the page's modal system (initModalBasic: [data-modal-close], Esc).
//
//   US  → bottom button "Checkout" → straight to Shopify checkout.
//         A "Save your Olto for later" head ([option-head="save"]) is inserted
//         into the action bar; clicking it opens the interest modal (save mode).
//   non-US → bottom button "Submit" → opens the interest modal (interest mode).
//
// The bar click is bound to [checkout-actions] (the button can be
// pointer-events:none); the save head has its own handler and is excluded there.

const TOTAL_BLOCK = '[data-total-block]';
const MODAL = '[data-modal-name="interest"]';

// US "Save your Olto for later" head, inserted into the action bar (uses the
// page's existing checkout_info-head styles).
const SAVE_HEAD_HTML = `
<div option-head="save" class="checkout_info-head is-bottom-border is-small is-save">
  <div class="checkout_info-head-inner">
    <div class="text-size-regular text-weight-medium">Save your Olto for later</div>
  </div>
  <div class="checkout_info-head-arrow">
    <div class="cc-meta-8">
      <div class="icon-embed-16 w-embed">
        <svg width="100%" height="100%" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14 5L8 11L2 5" stroke="black"></path>
        </svg>
      </div>
    </div>
  </div>
</div>`;

export function initPrimaryAction() {
  const $btn = $('[primary-action]');
  if (!$btn.length) {
    console.warn('[PrimaryAction] No [primary-action] button found');
    return;
  }

  setupModalForm();
  buildSaveHead();
  onRegionChange(({ region }) => applyRegion(region));

  // Click on the BAR (the button can be pointer-events:none). The save head has
  // its own handler, so ignore clicks that originate inside it.
  $('[checkout-actions]').on('click', (e) => {
    if (e.target.closest('[option-head="save"]')) return;
    e.preventDefault();
    if (currentState() === 'checkout') {
      // US — validate (country) then go straight to Shopify checkout.
      if (!checkAllRequired(true)) {
        scrollToFirstInvalid();
        return;
      }
      const url = getCheckoutUrl();
      if (url) window.location.href = url;
    } else {
      // non-US — open the interest modal.
      openInterestModal();
    }
  });

  // US save head → open the same modal (delegated; the head is inserted at runtime).
  $(document).on('click', '[option-head="save"]', (e) => {
    e.preventDefault();
    openInterestModal();
  });

  applyRegion(getCurrentRegion());
}

// Insert the US "Save your Olto for later" head as the first item in the bar.
function buildSaveHead() {
  if (document.querySelector('[option-head="save"]')) return;
  const bar = document.querySelector('[checkout-actions]');
  if (!bar) return;
  const tmp = document.createElement('div');
  tmp.innerHTML = SAVE_HEAD_HTML.trim();
  const head = tmp.firstElementChild;
  if (head) bar.insertBefore(head, bar.firstElementChild);
}

// The interest modal form is Webflow-native (its own `required` validation +
// AJAX submit). Drop our data-required from its fields so an open modal doesn't
// gate the configurator's bottom-bar buttons via form-validation.
function setupModalForm() {
  const form = document.getElementById('wf-form-Olto-Interest-Form');
  if (!form) {
    console.warn('[PrimaryAction] No #wf-form-Olto-Interest-Form (interest modal) on page');
    return;
  }
  form.querySelectorAll('[data-required]').forEach((el) => el.removeAttribute('data-required'));
}

// Open the interest modal: snapshot the current config into its hidden inputs,
// set the right copy for the region, then flip the modal/group active. Closing
// is owned by the page's modal system.
function openInterestModal() {
  const $modal = $(MODAL);
  if (!$modal.length) {
    console.warn('[PrimaryAction] No [data-modal-name="interest"] modal on page');
    return;
  }
  applyModalContent(getCurrentRegion());
  fillFormSnapshot($('#wf-form-Olto-Interest-Form'));

  $modal.attr('data-modal-status', 'active');
  const group = document.querySelector('[data-modal-group-status]');
  if (group) group.setAttribute('data-modal-group-status', 'active');
}

// Swap the modal's region-dependent copy (interest vs save).
function applyModalContent(region) {
  const nonUs = !!region && region !== 'us';
  const $modal = $(MODAL);
  if (!$modal.length) return;
  $modal.find('[non-us-content]').css('display', nonUs ? '' : 'none');
  $modal.find('[save-content]').css('display', nonUs ? 'none' : '');
  $modal.find('[data-title]').text(nonUs ? 'Register Your Interest' : 'Save your configuration');
}

// US → checkout; everything else → interest (opens the modal).
function currentState() {
  const region = getCurrentRegion();
  return region && region !== 'us' ? 'interest' : 'checkout';
}

// Per-region bar state: show the save head + total for US, hide them for non-US
// (which uses the Submit button), and set the modal copy + button text.
function applyRegion(region) {
  const nonUs = !!region && region !== 'us';
  $('[option-head="save"]').css('display', nonUs ? 'none' : '');
  applyModalContent(region);
  syncButton();
}

function syncButton() {
  const $text = $('[primary-action]').find('.text-size-large').first();
  const checkout = currentState() === 'checkout';
  $text.text(checkout ? 'Checkout' : 'Submit');
  $(TOTAL_BLOCK).css(checkout ? { display: 'flex', opacity: 1 } : { display: 'none', opacity: 0 });
  checkAllRequired();
}

// Pulls the current config from the DOM into the modal form's hidden inputs so
// the receiving system sees the configuration the user was looking at.
function fillFormSnapshot($form) {
  if (!$form.length) return;
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
