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
  $(document).on('change', REQUIRED_SELECTOR, checkAllRequired);
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
