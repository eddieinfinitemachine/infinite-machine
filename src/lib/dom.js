import $ from './jquery.js';

// Show an element with flex display + full opacity (legacy convention from
// the original configurator — preserved for behavioral parity).
export function revealItem(el) {
  $(el).css({ display: 'flex', opacity: '1' });
}

export function hideItem(el) {
  $(el).hide().css('opacity', '0');
}
