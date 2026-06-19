import $ from './jquery.js';
import { initAccordion } from '../modules/accordion.js';

// Flow builder. Constructs the ENTIRE right-hand configurator column from
// config.steps + a single parts-kit, so the step structure lives in code (this
// file) rather than being hand-built in Webflow. Webflow provides only:
//
//   [data-step="template"]  — the parts kit: ONE styled leaf atom per element
//                             type (head, countries, option, bundle, acs,
//                             filters/filter-item, interest-form, total-block,
//                             checkout-action, loader). Hidden source, removed
//                             after build.
//   [data-flow="steps"]     — mount for the numbered step blocks (in order)
//   [data-flow="actions"]   — sticky bottom bar mount (total + action button)
//
// buildFlow runs FIRST at boot (before product fetch). It generates the step
// skeleton and drops ONE bridged template atom into each repeat mount. The
// existing lib/templates.js then clones those per Shopify product, and every
// downstream module consumes the result unchanged — because the bridge below
// re-stamps the attrs those modules query for (data-product-id, data-swatch,
// data-variant-gid, data-price, data-deliver-date, fs-list-*, data-accessory-*,
// data-*-template). No sf-* attributes are emitted, so ShopyFlow doesn't bind
// to anything the configurator builds.
//
// Add / edit a step = edit config.steps + (if a new element type) add an atom
// to the kit. No other file changes for ordering / numbering / titles.

export function buildFlow(config) {
  const kit = $('[data-step="template"]').first();
  const $steps = $('[data-flow="steps"]').first();
  const $actions = $('[data-flow="actions"]').first();

  if (!kit.length) {
    console.warn('[Flow] No [data-step="template"] kit found — flow not built');
    return;
  }
  if (!$steps.length) {
    console.warn('[Flow] No [data-flow="steps"] mount found — flow not built');
    return;
  }

  // Detach the kit BEFORE clearing the mounts — it may live inside
  // [data-flow="steps"], and we still need it as a clone source. Detach keeps
  // the element (and its children) usable while removing it from the DOM.
  kit.detach();

  // Clear both mounts so a re-run rebuilds cleanly instead of stacking.
  $steps.empty();
  if ($actions.length) $actions.empty();

  // Numbered steps, in config order
  for (const step of config.steps || []) {
    const $block = buildStep(step, kit, config);
    if ($block) $steps.append($block);
  }

  // Interest / "Save your configuration" form — lives INSIDE the bottom action
  // bar (next to total + checkout button), built by buildActions below.
  const $interest = buildInterestForm(kit);

  // Sticky bottom bar — total + action button + save form
  if ($actions.length) buildActions(kit, $actions, $interest);
  else {
    console.warn('[Flow] No [data-flow="actions"] mount — bottom bar not built');
    if ($interest) $steps.append($interest); // fallback: keep form in the flow
  }

  // Loader — SHOW it during boot (clear the kit atom's inline display:none);
  // configurator-init hides .checkout_product-load once boot completes.
  const $loader = clone(kit, 'loader');
  if ($loader.length) $steps.append($loader.css('display', ''));

  // Kit was already detached above — nothing left to clean up.
  console.log(`[Flow] Built ${(config.steps || []).length} steps from config`);
}

// ---- Step dispatch --------------------------------------------------------

function buildStep(step, kit) {
  const $block = $('<div step-block></div>');
  let $built;
  switch (step.type) {
    case 'location':
      $built = buildLocation(step, kit, $block);
      break;
    case 'variant':
      $built = buildVariant(step, kit, $block);
      break;
    case 'wrap':
      $built = buildWrap(step, kit, $block);
      break;
    case 'bundle':
      $built = buildBundle(step, kit, $block);
      break;
    case 'accessories':
      $built = buildAccessories(step, kit, $block);
      break;
    case 'quantity':
      $built = buildQuantity(step, kit, $block);
      break;
    default:
      console.warn(`[Flow] Unknown step type "${step.type}" — skipped`);
      return null;
  }
  if ($built && step.collapsible !== false) wireAccordion($built, step);
  return $built;
}

// Every step is collapsible, collapsed by default. The head ([option-head]) is
// the toggle, the body ([data-step-content]) collapses, and the chevron in the
// head's expander rotates. Wired on the detached block — the click fires later
// once it's in the DOM, and scrollHeight is measured lazily on first open.
function wireAccordion($block, step) {
  const head = $block.find('[option-head]').get(0);
  const content = $block.find('[data-step-content]').get(0);
  if (!head || !content) return;
  const chevron = head.querySelector('.icon-embed-16') || head.querySelector('svg');
  initAccordion(head, content, { startOpen: !!step.startOpen, chevron });
}

// ---- Head -----------------------------------------------------------------
// Clones the generic head atom and tailors it per step: number, title, the
// rotating chevron, and (for location/forms) the validation line.

function buildHead(step, kit) {
  const $head = clone(kit, 'head').attr('option-head', '');
  $head.find('[data-step="step"]').text(step.no || '');
  $head.find('[data-step="title"]').text(step.title || '');

  // Keep the chevron (rotated by the accordion); drop the "Expand" text. Steps
  // marked collapsible:false lose the chevron entirely (always open, no toggle).
  $head.find('[data-step="expander"]').find('p').remove();
  if (step.collapsible === false) $head.find('[data-step="expander"]').remove();

  // The quantity stepper never lives in the head — the quantity step puts it in
  // its own collapsible content. Always strip it from the head.
  $head.find('[data-config-qty]').remove();

  // "Response Required" validation line (location + forms)
  if (step.validation) {
    $('<p field-validation class="text-size-xtiny" style="display:none;opacity:0">Response Required</p>').appendTo($head);
  }

  return $head;
}

// ---- Bodies ---------------------------------------------------------------

function buildLocation(step, kit, $block) {
  $block.attr('location-block', '');
  $block.append(buildHead(step, kit));
  // Country <select> — location-flow.js populates options from countries.js
  $block.append(clone(kit, 'countries').attr('data-step-content', ''));
  return $block;
}

function buildVariant(step, kit, $block) {
  $block.append(buildHead(step, kit));
  // Base color swatch template. templates.js renderBaseVariantSwatches stamps
  // data-product-id on the [data-option-group="color"] wrapper and clones per variant.
  const $tpl = clone(kit, 'option').attr('data-variant-swatch-template', '');
  const $selectors = $(
    '<div class="checkout_option-selectors" data-step-content>' +
      '<div class="checkout_option-wrapper">' +
        '<div class="product-container_option-group">' +
          '<div data-option-group="color" class="checkout_option-wrapper"></div>' +
        '</div>' +
      '</div>' +
    '</div>'
  );
  $selectors.find('[data-option-group="color"]').append($tpl);
  $block.append($selectors);
  return $block;
}

function buildWrap(step, kit, $block) {
  $block.append(buildHead(step, kit));

  // Static "No Wrap" card (not a template — permanent first option). Derived
  // from the option atom: drop the swatch, label it, tag [data-swatch="none"].
  const $none = clone(kit, 'option').attr('data-swatch', 'none');
  $none.find('.checkout_option-swatch').remove();
  $none.find('.checkout_option-text').first().text('No Wrap');

  // Wrap color swatch template. templates.js renderWrapSwatches stamps
  // data-product-id on the swatch's nearest [data-step-content] and clones into
  // the template's parent.
  const $tpl = clone(kit, 'option').attr('data-wrap-swatch-template', '');

  const $content = $('<div class="checkout_option-selectors" data-step-content></div>');
  const $list = $('<div class="options-list-wrap"></div>').append($none).append($tpl);
  $content.append($('<div class="checkout_option-wrapper cc-wrap"></div>').append($list));
  $block.append($content);
  return $block;
}

function buildBundle(step, kit, $block) {
  $block.append(buildHead(step, kit));
  // Bundle preset template. bundles-ui.js clones [data-preset-value] inside
  // [data-option-group="bundle"]; templates.js bridges data-preset-value="".
  const $tpl = clone(kit, 'bundle').attr('data-bundle-template', '1');
  $tpl.find('[data-step="bundle-desc"]').attr('data-accessory-label', '');
  const $selectors = $('<div class="checkout_option-selectors" data-step-content></div>');
  $selectors.append($('<div data-option-group="bundle" class="checkout_option-wrapper"></div>').append($tpl));
  $block.append($selectors);
  return $block;
}

function buildAccessories(step, kit, $block) {
  $block.append(buildHead(step, kit));

  const $content = $('<div class="checkout_option-selectors cc-accessories" data-step-content></div>');

  // Filter pills — filters.js / templates.js renderFilters clones [data-filter-template]
  const $filters = clone(kit, 'filters');
  $filters.find('[data-step="filter-item"]').attr('data-filter-template', '1');
  $content.append($filters);

  // Accessory cards — templates.js renderAccessoryCards clones [data-accessory-template]
  const $wrap = $('<div class="checkout_accessories-wrap"></div>');
  $wrap.append(bridgeAccessoryAtom(clone(kit, 'acs')));
  $content.append($wrap);

  $block.append($content);
  return $block;
}

function buildQuantity(step, kit, $block) {
  // Quantity is NOT collapsible — the −/+ stepper stays inline with the title,
  // like a plain header. No chevron, no [data-step-content] (so wireAccordion
  // skips it). config-quantity.js finds [data-config-qty] anywhere in the DOM.
  const $head = clone(kit, 'head').attr('option-head', '');
  $head.find('[data-step="step"]').text(step.no || '');
  $head.find('[data-step="title"]').text(step.title || '');
  $head.find('[data-step="expander"]').remove(); // no collapse → drop the chevron
  // [data-config-qty] is left in place (inline with the title row)
  $block.append($head);
  return $block;
}

// ---- Terminal + actions ---------------------------------------------------

function buildInterestForm(kit) {
  const $form = clone(kit, 'interest-form');
  if (!$form.length) return null;
  // Always-visible LAST step. primary-action.js turns it into a collapsible step
  // (save head + chevron), swaps the head/expand per region, and submits the
  // inner #wf-form-Olto-Interest-Form via its [data-form-button]. primary-action
  // forces display:flex/opacity:1 on [form-block] after all setup.
  $form.attr({ 'step-block': '', 'form-block': '' });
  return $form;
}

function buildActions(kit, $actions, $interest) {
  const $bar = $('<div checkout-actions class="checkout_bottom-bar is-olto"></div>');

  // Total block — price-display targets [data-total-block] [data-price]
  const $total = clone(kit, 'total-block').attr('data-total-block', '');
  $total.find('[data-step="total-price"]').attr('data-price', '');
  $total.css({ display: 'none', opacity: 0 });

  // Action button — primary-action drives its text/click by region
  const $action = clone(kit, 'checkout-action').attr('primary-action', '');

  // Save / interest form sits FIRST in the bar, before the total + checkout button.
  if ($interest) $bar.append($interest);
  $bar.append($total).append($('<div></div>').append($action));
  $actions.append($bar);
}

// ---- Accessory atom bridge ------------------------------------------------
// The kit's accessory card uses the unified data-step="acs-*" markers; the
// existing renderer/modules query the legacy attrs/classes. Map one to the
// other so renderAccessoryCards / accessory-orchestration work untouched.

function bridgeAccessoryAtom($card) {
  $card.attr('data-accessory-template', '1');
  remap($card, 'acs-img', (el) => el.setAttribute('accessories-img', ''));
  remap($card, 'acs-label', (el) => el.setAttribute('accessories-label', ''));
  remap($card, 'acs-note', (el) => el.setAttribute('data-accessory-note', ''));
  remap($card, 'acs-price', (el) => el.setAttribute('data-price', ''));
  remap($card, 'acs-date', (el) => el.setAttribute('data-deliver-date', ''));

  // Size swatches: renderAccessoryVariantOptions expects a
  // .product-container_sizes-wrap container + a [data-variant-option-template].
  const $opts = $card.find('[data-step="acs-options"]').first();
  if ($opts.length) {
    if (!$opts.parent().hasClass('product-container_sizes-wrap')) {
      $opts.wrap('<div class="product-container_sizes-wrap"></div>');
    }
    $opts.find('[data-step="acs-option-item"]').first().attr('data-variant-option-template', '1');
  }
  return $card;
}

// ---- Helpers --------------------------------------------------------------

// Clone a kit atom by its data-step name, stripping the marker.
function clone(kit, name) {
  const $atom = kit.find(`[data-step="${name}"]`).first();
  if (!$atom.length) {
    console.warn(`[Flow] Kit missing [data-step="${name}"]`);
    return $();
  }
  return $atom.clone().removeAttr('data-step');
}

function remap($root, name, fn) {
  const el = $root.find(`[data-step="${name}"]`).get(0);
  if (el) fn(el);
}
