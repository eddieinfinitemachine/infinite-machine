import $ from '../lib/jquery.js';
import { revealItem, hideItem } from '../lib/dom.js';

// CSS classes / attribute names this module manages
const ERROR_CLASS = 'is-error';
const DISABLE_CLASS = 'is-disabled';
const VALIDATION_ATTR = 'field-validation';
const REQUIRED_SELECTOR =
  'input:visible[data-required], select:visible[data-required], textarea:visible[data-required]';

// Buttons that get enabled/disabled based on validation state.
// [primary-action] is the unified bottom-bar button (current design).
// Older selectors kept for backwards compat with pages that still use them.
const BUTTON_SELECTORS = '[primary-action], [buy-button], [deposit-button], [form-button]';

export function initFormValidation() {
  // `input` re-checks live as the user types (so Submit enables the moment the
  // email is valid); `change` covers selects / blur.
  $(document).on('input change', REQUIRED_SELECTOR, checkAllRequired);
  // Run once so disabled state is correct on initial render
  checkAllRequired();
}

// Exported so other modules (e.g. flow handlers) can re-check after
// programmatically changing input values
export function checkAllRequired() {
  let allValid = true;

  $(REQUIRED_SELECTOR).each(function () {
    const $input = $(this);
    const $stepBlockHead = $input.closest('[step-block]').find('[option-head]');

    if (!$input.val() || $input.val().trim() === '') {
      showValidation($stepBlockHead);
      allValid = false;
      return;
    }
    hideValidation($stepBlockHead);
  });

  allowButtons(allValid);
  return allValid;
}

// Scroll to (and focus) the first visible required field that's empty, so the
// user sees exactly what's missing when they try to submit/checkout.
export function scrollToFirstInvalid() {
  let $first = null;
  $(REQUIRED_SELECTOR).each(function () {
    const $input = $(this);
    if (!$input.val() || $input.val().trim() === '') {
      $first = $input;
      return false; // break out of .each
    }
  });
  if (!$first || !$first.length) return false;
  const target = $first.closest('[step-block]').get(0) || $first.get(0);
  target.scrollIntoView({ behavior: 'smooth', block: 'center' });
  try {
    $first.trigger('focus');
  } catch (err) {
    /* noop */
  }
  return true;
}

function showValidation($el) {
  $el.addClass(ERROR_CLASS);
  revealItem($el.find(`[${VALIDATION_ATTR}]`));
}

function hideValidation($el) {
  $el.removeClass(ERROR_CLASS);
  hideItem($el.find(`[${VALIDATION_ATTR}]`));
}

function allowButtons(state) {
  const $buttons = $(BUTTON_SELECTORS);
  if (state) $buttons.removeClass(DISABLE_CLASS);
  else $buttons.addClass(DISABLE_CLASS);
}
