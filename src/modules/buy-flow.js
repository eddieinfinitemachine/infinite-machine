import $ from '../lib/jquery.js';
import { getCart } from '../lib/cart.js';
import { openCartDrawer } from './cart-drawer.js';

// Buy button → opens the cart drawer (which has the actual Checkout button).
// Drawer is the single review step before going to Shopify checkout —
// required for multi-bike configurations so user can see all groups.

export function initBuyFlow() {
  $('[buy-button]').on('click.buyFlow', function (e) {
    e.preventDefault();
    const cart = getCart();
    if (!cart?.lines?.length) {
      console.warn('[BuyFlow] Cart is empty');
      return;
    }
    openCartDrawer();
  });
}
