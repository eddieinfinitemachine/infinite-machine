import { initAccordion } from '../modules/accordion.js';
import { initFormValidation } from '../modules/form-validation.js';
import { initLocationFlow } from '../modules/location-flow.js';
import { initVariantObserver } from '../modules/variant-observer.js';
import { initAccessorySidebar } from '../modules/accessory-sidebar.js';
import { initAccessoryDependencies } from '../modules/accessory-dependencies.js';
import { initCustomImages } from '../modules/custom-images.js';
import { initBundlesUi } from '../modules/bundles-ui.js';
import { initWrapOrchestration } from '../modules/wrap-orchestration.js';
import { initAccessoryOrchestration } from '../modules/accessory-orchestration.js';
import { initBuyFlow } from '../modules/buy-flow.js';
import { initVariantSwatch } from '../modules/variant-swatch.js';
import { initMainProductCart } from '../modules/main-product-cart.js';
import { bindUi } from '../modules/ui-bindings.js';
import { initFilters } from '../modules/filters.js';
import { initCartDrawer } from '../modules/cart-drawer.js';
import { initConfigQuantity } from '../modules/config-quantity.js';
import { initDebugPanel } from '../modules/debug-panel.js';

import { fetchProducts } from './products.js';
import { fetchBundles } from './bundles.js';
import { initCart, setProducts as setCartProducts } from './cart.js';
import { initSelection } from './selection.js';
import $ from './jquery.js';

// Force-reveal the "Included As Standard" base section. Webflow IX2 leaves
// these collapsed waiting for scroll/load triggers that aren't reliable here.
function forceRevealBaseSection() {
  $('.checkout_order-includes-items').css({ height: 'auto' });
  $('.checkout_includes-item, .modal_ecl-image').css({ opacity: 1 });
}

export async function initConfigurator(config) {
  console.log(`[Configurator] Booting "${config.id}"`);

  forceRevealBaseSection();

  // --- Pure DOM (no Shopify dep) ---
  initFormValidation();
  initLocationFlow();
  if (config.accessoriesCollection) initAccordion('accessories');
  if (config.wrap) initAccordion('wraps', { startOpen: false });

  // --- Shopify-backed: fetch products, init cart ---
  let products;
  let bundles = [];
  try {
    [products, bundles] = await Promise.all([
      fetchProducts(config),
      config.bundles ? fetchBundles(config) : Promise.resolve([]),
    ]);
  } catch (err) {
    console.error('[Configurator] Failed to fetch products/bundles:', err);
    return;
  }

  // Give cart access to products so its mutations can construct optimistic
  // line shapes (instant UI updates before API round-trip completes).
  setCartProducts(products);

  try {
    await initCart(config);
  } catch (err) {
    console.error('[Configurator] Failed to init cart:', err);
    return;
  }

  // --- Central state + declarative UI bindings ---
  // Selection must init AFTER cart so the first compute has data.
  // bindUi must init AFTER selection so handlers register before first fire.
  initSelection(config, products, bundles);
  bindUi(config);

  // --- Click handlers + write-side modules ---
  if (config.accessoriesCollection) initAccessoryOrchestration(config, products);
  if (config.accessoriesCollection) initAccessorySidebar(config, products);
  // Filter init runs AFTER accessory-orchestration so cards already have
  // [data-accessory-handle] for collection tagging.
  if (config.accessoriesCollection) initFilters(products);
  if (config.accessoryDependencies) initAccessoryDependencies(config, products);
  if (Array.isArray(config.customImageRules)) initCustomImages(config, products);
  if (config.bundles) initBundlesUi(config, products, bundles);
  if (config.wrap) initWrapOrchestration(config, products);
  initCartDrawer(config);
  initConfigQuantity();
  initBuyFlow();

  // --- Variant chain. Init observer LAST so all subscribers (selection,
  // main-product-cart, ui-bindings) are registered before the first fire. ---
  if (config.product) {
    initMainProductCart(config, products);
    initVariantSwatch(config, products);
    initVariantObserver(config);
  }

  console.log(`[Configurator] "${config.id}" boot complete`);

  // Floating debug panel (cart state, selection, reset button).
  // Remove this line to disable.
  initDebugPanel({ configId: config.id });
}
