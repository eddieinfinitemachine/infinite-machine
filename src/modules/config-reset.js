import $ from '../lib/jquery.js';
import { removeConfig, getCurrentConfigSessionId } from '../lib/cart.js';

// "Reset" control in the summary panel. Clicking any [data-config-reset] element
// clears the CURRENT configuration — removes its bike / wrap / accessory lines
// and rolls over to a fresh session, which main-product-cart re-seeds with the
// DEFAULT bike. Net effect: back to a clean base configuration (default variant,
// no wrap, no accessories, qty 1). Same underlying action as the cart drawer's
// per-config Remove.
//
// Markup: add a clickable element with [data-config-reset] next to the
// "Configuration" label in the summary panel (style it in Webflow).
export function initConfigReset() {
  $(document).on('click.configReset', '[data-config-reset]', (e) => {
    e.preventDefault();
    if (!window.confirm('Reset your configuration?')) return;
    const sessionId = getCurrentConfigSessionId();
    if (sessionId) removeConfig(sessionId);
  });
}
