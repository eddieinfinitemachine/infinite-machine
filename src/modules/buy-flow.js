import $ from '../lib/jquery.js';
import { getCart, getCheckoutUrl } from '../lib/cart.js';

// Buy button → straight to Shopify checkout. The cart drawer (the old in-page
// review step) is disabled per client request, so no path opens it anymore.

export function initBuyFlow() {
  $('[buy-button]').on('click.buyFlow', function (e) {
    e.preventDefault();
    const cart = getCart();
    if (!cart?.lines?.length) {
      console.warn('[BuyFlow] Cart is empty');
      return;
    }
    const url = getCheckoutUrl();
    if (url) window.location.href = url;
  });
}
