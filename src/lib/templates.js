import $ from './jquery.js';

// Renders Shopify-driven swatches/cards/pills from Webflow-built TEMPLATES.
// Runs once at boot, between the product fetch and module init. After this
// pass, the DOM looks like the legacy CMS-built configurator — so the rest
// of the SDK modules consume it unchanged.
//
// Webflow author builds ONE template per repeating element type. This file
// clones the template per Shopify variant/product/category and adds the
// legacy attributes (`sf-option-value`, `sf-product`, `fs-list-field`, etc.)
// that downstream modules expect.

const TEMPLATE_SELECTORS = {
  baseVariant: '[data-variant-swatch-template]',
  wrapSwatch: '[data-wrap-swatch-template]',
  bundle: '[data-bundle-template]',
  accessory: '[data-accessory-template]',
  accessoryVariantOption: '[data-variant-option-template]',
  filter: '[data-filter-template]',
  sidebarItem: '[data-accessories-item-template]',
};

export function renderTemplates(config, products, bundles) {
  console.log('[Templates] Rendering Shopify-driven markup from Webflow templates');
  renderBaseVariantSwatches(config, products);
  renderWrapSwatches(config, products);
  bridgeBundleTemplate();
  renderAccessoryCards(config, products);
  renderFilters(products);
  bridgeSidebarTemplate();
}

// Build child-handle → parent-title map from config.accessoryDependencies.
// Used to render the "Requires X" note on child cards.
function buildDependencyNotes(config, products) {
  const notes = new Map();
  const deps = config.accessoryDependencies || {};
  for (const [parentHandle, dep] of Object.entries(deps)) {
    const parentProduct = (products.accessories || []).find((p) => p.handle === parentHandle);
    if (!parentProduct) continue;
    const noteText = `Requires ${parentProduct.title}`;
    for (const childHandle of dep.requiredBy || []) {
      notes.set(childHandle, noteText);
    }
  }
  return notes;
}

// ---- Base variant swatches (Black / Silver) -------------------------------

function renderBaseVariantSwatches(config, products) {
  const main = products.main;
  if (!main) return;

  const $template = $(TEMPLATE_SELECTORS.baseVariant).first();
  if (!$template.length) {
    console.warn('[Templates] No [data-variant-swatch-template] found — base variant swatches skipped');
    return;
  }

  const $parent = $template.parent();

  // The existing variant-swatch module reads [sf-product="<numericId>"] as the
  // delegation root. Add it to the [sf-change-option="color"] wrapper.
  const mainNumericId = main.id.split('/').pop();
  const $colorGroup = $template.closest('[sf-change-option="color"]');
  if ($colorGroup.length) $colorGroup.attr('sf-product', mainNumericId);

  const templateHtml = $template[0].outerHTML;
  $template.remove();

  // Sort: default variant first (config.defaultVariantId), then preserve
  // Shopify admin order for the rest. Lets Olto put Black (the default)
  // at the start without depending on admin ordering.
  const defaultId = config.defaultVariantId;
  const orderedVariants = [...main.variants].sort((a, b) => {
    if (a.id.endsWith(defaultId)) return -1;
    if (b.id.endsWith(defaultId)) return 1;
    return 0;
  });

  for (const variant of orderedVariants) {
    const colorOpt = variant.selectedOptions.find((o) => /colou?rs?/i.test(o.name));
    if (!colorOpt) continue;
    const colorName = colorOpt.value;
    const numericId = variant.id.split('/').pop();
    const hex = config.variants?.[numericId]?.colorHex || colorHexFromName(colorName);

    const $clone = $(templateHtml);
    $clone.removeAttr('data-variant-swatch-template');
    $clone.attr('sf-option-value', colorName);
    $clone.find('.checkout_option-text').first().text(colorName);
    $clone.find('.checkout_option-swatch').first().css('background-color', hex);
    $parent.append($clone);
  }
}

// ---- Wrap swatches (None + colors from olto-wrap variants) ----------------

function renderWrapSwatches(config, products) {
  const wrap = products.wrap;
  if (!wrap) return;

  const $template = $(TEMPLATE_SELECTORS.wrapSwatch).first();
  if (!$template.length) {
    console.warn('[Templates] No [data-wrap-swatch-template] found — wrap swatches skipped');
    return;
  }

  const $parent = $template.parent();

  // wrap-orchestration reads [sf-product="<numericId>"] as the delegation root.
  // The wrap content container is [data-step-wraps="content"].
  const wrapNumericId = wrap.id.split('/').pop();
  const $wrapContainer = $template.closest('[data-step-wraps="content"]');
  if ($wrapContainer.length) $wrapContainer.attr('sf-product', wrapNumericId);

  const templateHtml = $template[0].outerHTML;
  $template.remove();

  for (const variant of wrap.variants) {
    const colorOpt = variant.selectedOptions.find((o) => /colou?rs?/i.test(o.name));
    if (!colorOpt) continue;
    const colorName = colorOpt.value;
    const hex = config.wrapColorMap?.[colorName] || colorHexFromName(colorName);

    const $clone = $(templateHtml);
    $clone.removeAttr('data-wrap-swatch-template');
    $clone.attr('sf-add-to-cart', variant.id);
    $clone.attr('sf-option-value', colorName);
    $clone.find('[sf-show-option-title="1"], .checkout_option-text').first().text(colorName);
    $clone.find('.checkout_option-swatch').first().css('background-color', hex);
    $parent.append($clone);
  }
}

// ---- Bundle preset cards --------------------------------------------------
// bundles-ui.js already clones [data-preset-value] — just bridge the attr name

function bridgeBundleTemplate() {
  $(TEMPLATE_SELECTORS.bundle).each(function () {
    if (!this.hasAttribute('data-preset-value')) {
      // Empty data-preset-value tells bundles-ui this is the template
      this.setAttribute('data-preset-value', '');
    }
  });
}

// ---- Accessory cards ------------------------------------------------------

function renderAccessoryCards(config, products) {
  const list = products.accessories;
  if (!list?.length) return;

  const $template = $(TEMPLATE_SELECTORS.accessory).first();
  if (!$template.length) {
    console.warn('[Templates] No [data-accessory-template] found — accessory cards skipped');
    return;
  }

  const $parent = $template.parent();
  const templateHtml = $template[0].outerHTML;
  $template.remove();

  const dependencyNotes = buildDependencyNotes(config, products);

  for (const product of list) {
    const numericId = product.id.split('/').pop();
    const firstVariant = product.variants[0];
    if (!firstVariant) continue;

    const $clone = $(templateHtml);
    $clone.removeAttr('data-accessory-template');
    // accessory-orchestration tags via [sf-product="<numericId>"]
    $clone.attr('sf-product', numericId);
    $clone.attr('sf-add-to-cart', firstVariant.id);

    // Image
    const imgUrl = product.featuredImage?.url || firstVariant.image?.url || '';
    if (imgUrl) $clone.find('[accessories-img]').attr('src', imgUrl);

    // Title
    $clone.find('[accessories-label]').text(product.title);

    // Dependency note — "Requires Olto Rear Rack" etc.
    const $note = $clone.find('[data-accessory-note]');
    const noteText = dependencyNotes.get(product.handle);
    if (noteText) {
      $note.text(noteText).show();
    } else {
      $note.text('').hide();
    }

    // ETA / availability — from Shopify metafield custom.accessory_etas.
    // "In {value}" if set, otherwise hide the element entirely.
    const $eta = $clone.find('[sf-show-deliver-date]');
    if (product.accessoryEta) {
      $eta.text(`In ${product.accessoryEta}`).css({ display: '', opacity: 1 });
    } else {
      $eta.hide();
    }

    // Variant size sub-template (helmet S/M/L/XL etc.)
    renderAccessoryVariantOptions($clone, product);

    // Price element — set initial value; accessory-orchestration also runs and
    // re-formats. Keep [sf-show-price="1"] so module finds it.
    const $price = $clone.find('[sf-show-price="1"]').first();
    if ($price.length && firstVariant.price) {
      const amount = parseFloat(firstVariant.price.amount).toFixed(2);
      const symbol = firstVariant.price.currencyCode === 'USD' ? '$' : `${firstVariant.price.currencyCode} `;
      $price.text(`${symbol}${amount}`);
    }

    $parent.append($clone);
  }
}

function renderAccessoryVariantOptions($card, product) {
  const $optionTemplate = $card.find(TEMPLATE_SELECTORS.accessoryVariantOption).first();
  if (!$optionTemplate.length) return;

  // Single-variant products: hide the entire sizes wrapper
  if (product.variants.length <= 1) {
    $card.find('.product-container_sizes-wrap').hide();
    return;
  }

  const $optionParent = $optionTemplate.parent();
  const optionHtml = $optionTemplate[0].outerHTML;
  $optionTemplate.remove();

  // First selectedOption (Size for helmet) drives the swatch label. If
  // Shopify has the product as Size × Color, the same size appears in
  // multiple variants — dedupe so we render one swatch per unique value.
  const seen = new Set();
  for (const variant of product.variants) {
    const value = variant.selectedOptions?.[0]?.value;
    if (!value || seen.has(value)) continue;
    seen.add(value);
    const $optClone = $(optionHtml);
    $optClone.removeAttr('data-variant-option-template');
    $optClone.attr('sf-option-value', value);
    // The inner text element holds the label
    $optClone.find('div').first().text(value);
    $optionParent.append($optClone);
  }
}

// ---- Filter pills ---------------------------------------------------------

function renderFilters(products) {
  const $template = $(TEMPLATE_SELECTORS.filter).first();
  if (!$template.length) {
    console.warn('[Templates] No [data-filter-template] found — filters skipped');
    return;
  }

  const $parent = $template.parent();
  const templateHtml = $template[0].outerHTML;
  $template.remove();

  // Collect unique category titles from accessory collections, excluding
  // the parent "olto-accessories" collection itself (it's the umbrella).
  const SKIP = new Set(['olto-accessories']);
  const uniqueTitles = new Set();
  for (const product of products.accessories || []) {
    for (const c of product.collections || []) {
      if (SKIP.has(c.handle)) continue;
      uniqueTitles.add(c.title);
    }
  }

  // Always "All" first, then alphabetical
  const titles = ['All', ...Array.from(uniqueTitles).sort()];

  for (const title of titles) {
    const $clone = $(templateHtml);
    $clone.removeAttr('data-filter-template');
    const $input = $clone.find('input').first();
    if ($input.length) {
      $input.attr('fs-list-field', 'type');
      $input.attr('fs-list-value', title);
      $input.attr('fs-list-id', slugify(title));
    }
    $clone.find('.w-form-label').text(title);
    $parent.append($clone);
  }
}

// ---- Sidebar accessory entry ----------------------------------------------
// accessory-sidebar.js looks for [data-accessories-item]. Bridge attribute.

function bridgeSidebarTemplate() {
  $(TEMPLATE_SELECTORS.sidebarItem).each(function () {
    if (!this.hasAttribute('data-accessories-item')) {
      this.setAttribute('data-accessories-item', '');
    }
  });
}

// ---- Helpers --------------------------------------------------------------

const COMMON_COLOR_HEX = {
  Black: '#000000',
  Silver: '#D9D9D9',
  White: '#FFFFFF',
  Sand: '#DECEAF',
  Blush: '#F6C6DC',
  Forest: '#627063',
  Crimson: '#B44C47',
  Sky: '#707A8D',
};

function colorHexFromName(name) {
  return COMMON_COLOR_HEX[name] || '#CCCCCC';
}

function slugify(s) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}
