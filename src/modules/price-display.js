import $ from '../lib/jquery.js';
import { onSelectionChange } from '../lib/selection.js';

// Fills the visible price elements with the current SESSION's total.
// Watches selection (not raw cart) so multi-config carts show only the
// currently-active config's price.
//
// Targets:
//   [data-total-block] [sf-show-price="with-sub-product"]
//   [data-deposit-price="full"]
//
// Both expect the same value — the live total of the current config's
// bike + wrap + accessories.

export function initPriceDisplay() {
  onSelectionChange((sel) => {
    if (!sel?.cart) return;

    // Sum lines that belong to this config session
    const sessionLines = sel.cart.lines.filter(
      (l) => l.attributesByKey?._config_id === sel.sessionId
    );

    let total = 0;
    let currencyCode = 'USD';
    for (const line of sessionLines) {
      const price = parseFloat(line.merchandise?.price?.amount || 0);
      total += price * (line.quantity || 1);
      if (line.merchandise?.price?.currencyCode) {
        currencyCode = line.merchandise.price.currencyCode;
      }
    }

    const formatted = formatMoney(total, currencyCode);

    $('[data-total-block] [sf-show-price="with-sub-product"]').text(formatted);
    $('[data-deposit-price="full"]').text(formatted);
  });
}

function formatMoney(amount, currencyCode) {
  if (currencyCode === 'USD') {
    return `$${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }
  return `${currencyCode} ${amount.toFixed(2)}`;
}
