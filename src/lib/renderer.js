import $ from './jquery.js';

// Template-based rendering. Webflow convention:
//   <X data-template-<name>>...</X>   — hidden template element
//   <Y data-render-<name>>...</Y>     — mount point for clones
//
// renderList clones the template for each item, calls fill($card, item)
// to populate fields, then appends to the mount.

export function renderList(name, items, fill) {
  const $template = $(`[data-template-${name}]`).first();
  const $mount = $(`[data-render-${name}]`);

  if (!$template.length) {
    console.warn(`[Renderer] No template element [data-template-${name}]`);
    return [];
  }
  if (!$mount.length) {
    console.warn(`[Renderer] No mount element [data-render-${name}]`);
    return [];
  }

  $mount.empty();

  const $rendered = [];
  for (const item of items) {
    const $clone = $template
      .clone()
      .removeAttr(`data-template-${name}`)
      .removeAttr('style')
      .show();

    if (fill) fill($clone, item);

    $mount.append($clone);
    $rendered.push($clone);
  }

  return $rendered;
}

// Convenience helper for the common case of filling fields by data-attr.
// fields is { 'data-field-name': value, ... } — each field is set as text
// on matching [data-field="name"] elements within the card.
export function fillFields($card, fields) {
  for (const [name, value] of Object.entries(fields)) {
    const $target = $card.find(`[data-field="${name}"]`);
    if (!$target.length) continue;

    if (name === 'image' && value) {
      $target.attr('src', value);
    } else if (name === 'color' && value) {
      $target.css('background-color', value);
    } else {
      $target.text(value ?? '');
    }
  }
}
