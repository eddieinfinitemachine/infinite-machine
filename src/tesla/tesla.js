// Tesla-configurator-inspired mobile page for Olto.
// Standalone shell (dist/tesla/) — reuses the SDK's data + cart layer, builds
// its own DOM. GSAP comes from the page (CDN) like Webflow provides it in prod.

// Imported as text (esbuild `loader: {'.css':'text'}`) and injected by mount().
// One artifact, one version pin — the Webflow page can't drift a separate
// stylesheet tag out of sync with the bundle.
import baseConfig from '../configs/olto.js';
import {
  addLines,
  getCheckoutUrl,
  getCurrentConfigSessionId,
  initCart,
  removeConfig,
  removeLines,
  setLineForProduct,
  setProducts,
  startNewConfigSession,
  updateLine,
} from '../lib/cart.js';
import { client } from '../lib/client.js';
import { countries } from '../lib/countries.js';
import { fetchProducts } from '../lib/products.js';
import {
  getState,
  gidForVariant,
  initState,
  numericId,
  setPayMode,
  setRegion,
  subscribe,
} from './state.js';
import teslaCss from './tesla.css';
import {
  ACCESSORY_LAYERS,
  buildPage,
  buildSummaryRows,
  firstVariant,
  formatMoney,
  imgUrl,
  KITS,
  paymentFigures,
} from './ui.js';

const gsap = window.gsap || null;
if (gsap && window.ScrollTrigger) gsap.registerPlugin(window.ScrollTrigger);

// Shallow clone: boot() writes defaultVariantId, and configs/olto.js is shared
// with the parts-kit engine (src/configurator.js) and /configure-p1.
const config = { ...baseConfig };

// Assigned by mount(). Every query and listener in this file is scoped to it,
// which is what lets the same UI run standalone or inside the Webflow page.
let app = null;

let products = null;
let wrapVariantsByColor = new Map();
let heroActive = 'a';
let heroShownKey = null;

// Pixel-measured (canvas bbox scan): the EU avif, US Shopify shots, and all
// "3.4" wrap photos frame the bike identically (within ~1%), and the layer
// art registers natively on all of them — NO transform needed. Sand is the
// one exception: a side-view shot that can never register with the layers.
const NON_COMPOSITE_WRAPS = new Set(['Sand']);
// The country NAME, not the code. crm-backend matches it literally
// (resolve-build.ts: `isUS = country === "united states"`), and
// webflow_submissions.country is the only record of the US/international
// split that the call sheet has. Names come from lib/countries.js so they
// match exactly what the parts-kit configurator has always submitted.
// Shipping now (GTM-433). Was per-variant dates overridden on the live page
// by a patch script; the new UI states it directly.
const DELIVERY_COPY = 'Ships now';
const DELIVERY_COPY_SHORT = 'Now'; // the rail already carries its own label
let countryName = '';
let variantParamShown = null;
let totalShown = 0;
let totalTween = null;

/**
 * Render the configurator into `root`.
 *
 * Hosts call this — src/tesla/standalone.js for the Vercel demo, and
 * src/olto-tesla.js for the Webflow page. Nothing runs at import time.
 */
export async function mount(root) {
  app = root;
  if (!app) {
    console.error('[Olto] mount(): no root element — nothing rendered.');
    return;
  }
  // Every rule in tesla.css is scoped to this class so the stylesheet cannot
  // reshape the Webflow page it is injected into (or be reshaped by it).
  app.classList.add('olto-cfg');
  injectStyles();
  // One base color (Aug 26 meeting): Silver anodized is the only finish —
  // Black sells as a vinyl wrap now — so Silver becomes the default variant
  // (the upstream config still defaults to Black for the live site).
  const silverId = Object.entries(config.variants).find(([, m]) => /silver/i.test(m.color))?.[0];
  if (silverId) config.defaultVariantId = silverId;

  try {
    products = await fetchProducts(config);
  } catch (err) {
    console.error('[Tesla] Failed to load products:', err);
    renderBootError();
    return;
  }
  await addKitOnlyProducts();

  // Same matching rule as modules/wrap-orchestration.js — the wrap product
  // has one variant per color, keyed by a "Color(s)" option.
  wrapVariantsByColor = buildWrapVariantMap(products.wrap);

  setProducts(products);
  await initCart(config);
  // KITS (page-defined bundles) feed the store's exact-set active detection
  initState({
    config,
    products,
    bundles: KITS.filter((k) => k.items.length).map((k) => ({
      handle: k.key,
      products: k.items.map((h) => ({ handle: h })),
    })),
  });

  app.innerHTML = buildPage({ config, products, wrapVariantsByColor });
  bindEvents();
  subscribe(update);
  update(getState());
  initNudge();

  // A shared ?d= link fully describes a configuration — rebuild it into a
  // fresh session (works cross-device; the cart is created on this browser).
  const design = readDesignParam();
  if (design) {
    applyDesign(design);
  } else if (!getState().bikeLine) {
    // The configurator always carries a bike line so the total is honest from
    // first paint (upstream adds it on variant selection).
    setLineForProduct(products.main.handle, gidForVariant(config.defaultVariantId));
  }

  detectRegion();
  initReveals();
  pushDataLayer('view_configurator');

  // Preload wrap vehicle shots so the wrap-color crossfade never flashes
  for (const v of wrapVariantsByColor.values()) {
    if (v.image?.url) new Image().src = v.image.url;
  }
  // Preload the US base shots (Shopify variant images) — the default hero
  for (const v of products.main.variants) {
    if (v.image?.url) new Image().src = imgUrl(v.image.url, 1600);
  }
}

// The Bottom Cover sells but lives outside the accessories collection, so
// fetchProducts never sees it — pull it directly for the Commuter kit
// (Eddie, Aug 26). It joins products.accessories for pricing/cart lookups
// but stays out of the Accessories row (ROW_HIDDEN in ui.js — no photos).
async function addKitOnlyProducts() {
  try {
    const { data } = await client.request(
      `query { product(handle: "bottom-cover") { id handle title availableForSale featuredImage { url altText } variants(first: 5) { edges { node { id title availableForSale price { amount currencyCode } selectedOptions { name value } image { url altText } } } } } }`
    );
    const p = data?.product;
    if (p) products.accessories.push({ ...p, variants: p.variants.edges.map((e) => e.node) });
  } catch (err) {
    console.warn('[Tesla] Kit-only product fetch failed:', err); // Commuter just omits it
  }
}

function buildWrapVariantMap(wrap) {
  const map = new Map();
  if (!wrap) return map;
  for (const v of wrap.variants) {
    const colorOpt = v.selectedOptions?.find((o) => /colou?rs?/i.test(o.name));
    const color = colorOpt?.value || v.title;
    if (color) map.set(color, v);
  }
  return map;
}

function injectStyles() {
  if (document.getElementById('olto-tesla-css')) return;
  const style = document.createElement('style');
  style.id = 'olto-tesla-css';
  style.textContent = teslaCss;
  document.head.appendChild(style);
}

function renderBootError() {
  app.innerHTML = `
    <div class="boot">
      <div class="boot_mark">INFINITE MACHINE</div>
      <div class="boot_label">Couldn&rsquo;t reach the store. Check your connection.</div>
      <button type="button" class="boot_retry" onclick="location.reload()">Retry</button>
    </div>
  `;
}

// ---------- Events ----------

function bindEvents() {
  app.addEventListener('click', (e) => {
    // Consolidated Color row: '' = Silver (bare base), anything else = a wrap
    const colorSwatch = e.target.closest('[data-color-swatch]');
    if (colorSwatch) return selectWrap(colorSwatch.dataset.colorSwatch);

    const accScroll = e.target.closest('[data-acc-scroll]');
    if (accScroll) return scrollAccessories(Number(accScroll.dataset.accScroll));

    const accBtn = e.target.closest('[data-acc-toggle]');
    if (accBtn) return toggleAccessory(accBtn.dataset.accToggle);

    const bundleBtn = e.target.closest('[data-bundle]');
    if (bundleBtn) return selectBundle(bundleBtn.dataset.bundle);

    const payBtn = e.target.closest('[data-pay-mode]');
    if (payBtn) return setPayMode(payBtn.dataset.payMode);

    if (e.target.closest('[data-qty-dec]')) return changeQty(-1);
    if (e.target.closest('[data-qty-inc]')) return changeQty(1);

    if (e.target.closest('[data-save]')) {
      // Every save goes through the form (Eddie, Aug 26) — a returning
      // visitor gets it prefilled from their stored lead
      if (e.target.closest('[data-nudge]')) hideNudge();
      return openLeadModal('save');
    }
    if (e.target.closest('[data-save-close]')) return toggleSaveModal(false);
    if (e.target.closest('[data-nudge-close]')) return hideNudge();
    if (e.target.closest('[data-config-reset]')) return clearConfiguration();
    if (e.target.closest('[data-cta]')) {
      // The CTA is an <a sf-checkout href={checkoutUrl}> so im-attribution's
      // capture-phase backstop sees it — that listener has already run by the
      // time we get here. Navigation itself stays on the tested JS path.
      e.preventDefault();
      return primaryAction();
    }
  });

  // The visitor overriding geo-IP. This is the only way `location` gets set
  // when the lookup is blocked, and the only way a mis-geolocated buyer can
  // reach the interest form instead of a checkout we cannot fulfil.
  app.addEventListener('change', (e) => {
    const select = e.target.closest('[data-country]');
    if (select) applyCountry(select.value);
  });

  app.addEventListener('submit', (e) => {
    if (e.target.closest('[data-save-form]')) {
      e.preventDefault();
      submitSaveForm(e.target);
      return;
    }
    // The adopted Webflow form. NEVER preventDefault here — Webflow's own AJAX
    // handler owns this submit, and that is what puts the lead in Webflow Forms
    // and fires the form_submission webhook into crm-backend.
    if (e.target.closest('[data-wf-form-slot]')) {
      fillLeadFormSnapshot(); // re-stamp in case the cart settled while open
      pushDataLayer('form_submit', { form_name: 'Olto Interest Form' });
    }
  });
}

let accScrollTween = null;
function scrollAccessories(dir) {
  const list = app.querySelector('[data-acc-list]');
  if (!list) return;
  // Two cards per tap (150px card + 10px gap). Native smooth scrollBy
  // no-ops on this container in Chrome, and GSAP can't tween scrollLeft on a
  // DOM target without ScrollToPlugin (CSSPlugin swallows it) — so tween a
  // proxy object, same pattern as updateTotal. 0.45s IM ease as everywhere.
  const from = list.scrollLeft;
  const target = Math.max(0, Math.min(list.scrollWidth - list.clientWidth, from + dir * 320));
  // Same document.hidden guard as updateTotal: rAF pauses in background
  // tabs, which would freeze the tween at frame 0
  if (gsap && !document.hidden) {
    if (accScrollTween) accScrollTween.kill();
    const obj = { v: from };
    accScrollTween = gsap.to(obj, {
      v: target,
      duration: 0.45,
      ease: 'power2.out',
      onUpdate: () => {
        list.scrollLeft = obj.v;
      },
    });
  } else {
    list.scrollLeft = target;
  }
}

// The cart write queue drains serially, but a pack batch sent while an
// earlier setLineForProduct is still in flight can be wiped by that write's
// late server snapshot (same race class as the per-product-burst dead end).
// Track single-line writes so selectBundle can wait them out.
let lastLineWrite = Promise.resolve();
function setLine(handle, variantId) {
  const p = setLineForProduct(handle, variantId);
  lastLineWrite = p.catch(() => null); // settled-state only — errors surface on p
  return p;
}

function selectWrap(color) {
  pushDataLayer('select_color', { olto_selected_color: color || 'Silver' });
  const wrapHandle = config.wrap.productHandle;
  if (!color) return setLine(wrapHandle, null);
  const variant = wrapVariantsByColor.get(color);
  if (variant) setLine(wrapHandle, variant.id);
}

function toggleAccessory(handle) {
  const state = getState();
  const has = state.accessoryLines.some((l) => l.merchandise.product.handle === handle);
  pushDataLayer(has ? 'remove_accessory' : 'add_accessory', { olto_accessory: handle });
  const deps = config.accessoryDependencies || {};

  if (has) {
    setLine(handle, null);
    // Removing a parent removes the children that require it
    const children = deps[handle]?.requiredBy || [];
    for (const child of children) {
      if (state.accessoryLines.some((l) => l.merchandise.product.handle === child)) {
        setLine(child, null);
      }
    }
    return;
  }

  addAccessory(handle);
  // Adding a child pulls its required parent in
  for (const [parent, rule] of Object.entries(deps)) {
    if (rule.requiredBy?.includes(handle)) {
      const parentAdded = state.accessoryLines.some((l) => l.merchandise.product.handle === parent);
      if (!parentAdded) addAccessory(parent);
    }
  }
}

function addAccessory(handle) {
  const product = products.accessories.find((p) => p.handle === handle);
  const variant = firstVariant(product);
  if (variant) setLine(handle, variant.id);
}

// Pack selection mirrors modules/bundles-ui.js: two BATCH mutations
// (removeLines then addLines) instead of a per-product burst — a burst takes
// seconds to drain through the write queue and the card state flickers the
// whole way. The awaited round trips take ~1-2s, so the tapped card is
// highlighted optimistically (pendingBundleView, read by update()) and a tap
// landing mid-flight queues up instead of being swallowed — latest tap wins.
let bundleBusy = false;
let bundleQueued = null;
let pendingBundleView = null; // { value: handle|null } while a selection is in flight
async function selectBundle(handle) {
  pushDataLayer('select_bundle', { olto_selected_bundle: handle || 'none' });
  if (bundleBusy) {
    if (handle !== pendingBundleView?.value) {
      bundleQueued = handle;
      pendingBundleView = { value: handle };
      update(getState());
    }
    return;
  }
  bundleBusy = true;
  // Tapping the active pack again just clears it
  const intent = getState().activeBundle === handle ? null : handle;
  pendingBundleView = { value: intent };
  update(getState());
  try {
    // Let any in-flight single-line write settle first — its late server
    // snapshot would otherwise wipe this batch's lines
    await lastLineWrite;

    // Selecting a pack replaces the currently-staged accessories
    const lineIds = getState()
      .accessoryLines.map((l) => l.id)
      .filter((id) => !String(id).startsWith('tmp_'));
    if (lineIds.length) await removeLines(lineIds);

    const kit = KITS.find((k) => k.key === handle);
    if (!intent || !kit?.items.length) return;

    const items = kit.items
      .map((h) => {
        const variant = firstVariant(products.accessories.find((a) => a.handle === h));
        // _bundle rides along for checkout-side analytics (same as upstream);
        // the UI's active state is derived from the line set, not this attribute.
        return variant ? { variantId: variant.id, attributes: { _bundle: handle } } : null;
      })
      .filter(Boolean);
    if (items.length) await addLines(items);
  } catch (err) {
    console.error('[Tesla] Bundle select failed:', err);
  } finally {
    bundleBusy = false;
    if (bundleQueued) {
      const next = bundleQueued;
      bundleQueued = null;
      selectBundle(next);
    } else {
      pendingBundleView = null;
      update(getState());
    }
  }
}

function changeQty(delta) {
  pushDataLayer('change_quantity', { olto_quantity_delta: delta });
  const state = getState();
  const lines = [state.bikeLine, state.wrapLine, ...state.accessoryLines].filter(Boolean);
  const next = Math.min(99, Math.max(1, state.quantity + delta));
  if (next === state.quantity) return;
  // Quantity applies to every line in the session — N sets of this config
  // (same semantic as modules/config-quantity.js). Skip optimistic tmp lines;
  // the server sync inherits session quantity for them.
  const real = lines.filter((l) => !String(l.id).startsWith('tmp_'));
  Promise.all(real.map((l) => updateLine({ lineId: l.id, quantity: next })));
}

// ---------- Save / share ----------
// Encodes the whole configuration into a ?d= param:
//   <baseVariantId>.<wrapColor|''>.<qty>.<payMode>.<accHandle~accHandle...>
// Anyone opening the link gets the design rebuilt into a fresh cart session.

function readDesignParam() {
  const raw = new URLSearchParams(window.location.search).get('d');
  if (!raw) return null;
  const [base, wrap, qty, pay, accs] = raw.split('.');
  if (!base || !config.variants[base]) return null;
  return {
    base,
    wrap: wrap || null,
    qty: Math.min(99, Math.max(1, parseInt(qty, 10) || 1)),
    pay: ['cash', 'lease', 'finance'].includes(pay) ? pay : 'finance',
    accs: (accs || '').split('~').filter(Boolean),
  };
}

async function applyDesign(design) {
  startNewConfigSession();
  const items = [{ variantId: gidForVariant(design.base), quantity: design.qty }];
  const wrapVariant = design.wrap ? wrapVariantsByColor.get(design.wrap) : null;
  if (wrapVariant) items.push({ variantId: wrapVariant.id, quantity: design.qty });
  for (const handle of design.accs) {
    const variant = firstVariant(products.accessories.find((a) => a.handle === handle));
    if (variant) items.push({ variantId: variant.id, quantity: design.qty });
  }
  setPayMode(design.pay);
  try {
    await addLines(items);
  } catch (err) {
    console.error('[Tesla] Failed to apply shared design:', err);
  }
  // Drop ?d= so a reload doesn't re-seed another copy (?config= stays — the
  // cart layer keeps it in sync)
  const params = new URLSearchParams(window.location.search);
  params.delete('d');
  window.history.replaceState({}, '', `${window.location.pathname}?${params.toString()}`);
}

function designUrl() {
  const state = getState();
  const wrapColor = state.wrapLine
    ? wrapColorOf(state.wrapLine.merchandise) || state.wrapLine.merchandise.title
    : '';
  const accs = state.accessoryLines.map((l) => l.merchandise.product.handle).join('~');
  const code = [state.baseNumericId, wrapColor, state.quantity, state.payMode, accs].join('.');
  const url = new URL(window.location.href);
  url.searchParams.set('d', code);
  return url.toString();
}

// Same action as the live configurator's [data-config-reset] (config-reset.js):
// remove every line in the current session, roll to a fresh session, re-seed
// the default bike. Two-tap confirm instead of window.confirm — no blocking
// native dialog.
let clearArmed = null;
function setClearButtons(text, armed) {
  for (const btn of app.querySelectorAll('[data-config-reset]')) {
    btn.textContent = text;
    btn.classList.toggle('is-armed', armed);
  }
}
async function clearConfiguration() {
  if (!clearArmed) {
    setClearButtons('Tap again to clear', true);
    clearArmed = setTimeout(() => {
      clearArmed = null;
      setClearButtons('Clear configuration', false);
    }, 3000);
    return;
  }
  clearTimeout(clearArmed);
  clearArmed = null;
  setClearButtons('Clear configuration', false);
  try {
    await removeConfig(getCurrentConfigSessionId());
  } catch (err) {
    console.error('[Tesla] Clear failed:', err);
  }
  setPayMode('finance'); // back to the default view
  // Fresh session starts empty — re-seed the default bike (upstream's
  // main-product-cart does the same on the live site)
  setLineForProduct(products.main.handle, gidForVariant(config.defaultVariantId));
}

function primaryAction() {
  const state = getState();
  if (!state.ready) return;
  if (state.region === 'row') return openLeadModal('row');
  const url = getCheckoutUrl();
  if (!url) return;
  pushDataLayer('begin_checkout', { checkout_url: url });
  window.location.href = url;
}

// Scroll nudge: first time the Payment section comes into view (deep-scroll,
// high intent), slide up a card offering Save / talk to a rep. Once per page
// LOAD — the old sessionStorage once-per-session gate meant a demo tab never
// showed it again (Eddie: "where did the pop up go", Aug 26).
function initNudge() {
  const nudge = app.querySelector('[data-nudge]');
  const target = app.querySelector('[data-section="payment"]');
  if (!nudge || !target) return;
  const io = new IntersectionObserver(
    (entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      io.disconnect();
      nudge.hidden = false;
      requestAnimationFrame(() => nudge.classList.add('is-in'));
    },
    { threshold: 0.3 }
  );
  io.observe(target);
}

function hideNudge() {
  const nudge = app.querySelector('[data-nudge]');
  if (!nudge || nudge.hidden) return;
  nudge.classList.remove('is-in');
  setTimeout(() => {
    nudge.hidden = true;
  }, 450);
}

/**
 * Open the single lead modal.
 *
 * Mirrors modules/primary-action.js:121-134 — rest-of-world sees "Register
 * your interest", the US sees "Save your design", and BOTH submit the one
 * Webflow form. Only the copy differs.
 */
function openLeadModal(mode) {
  const modal = app.querySelector('[data-save-modal]');
  if (!modal) return;
  const row = mode === 'row';
  const title = modal.querySelector('[data-save-title]');
  const copy = modal.querySelector('[data-save-copy]');
  if (title) title.textContent = row ? 'Register your interest' : 'Save your design';
  if (copy) {
    copy.textContent = row
      ? 'Olto ships in the United States today. Leave your details and we\u2019ll tell you the moment it reaches you.'
      : 'We\u2019ll save this exact Olto so you can pick up where you left off on any device.';
  }
  fillLeadFormSnapshot();
  pushDataLayer(row ? 'interest_form_open' : 'save_configuration_open');
  toggleSaveModal(true);
}

// ---------- Webflow lead-form contract ----------
//
// These six hidden inputs are what the parts-kit configurator has always
// submitted (modules/primary-action.js:155-175, which scraped .sf-active out
// of the DOM). crm-backend and the CRM read them as literal strings, so the
// VALUE FORMATS below are a contract, not a preference:
//   location    country NAME  ("United States") — resolve-build.ts compares it
//                             exactly, lowercased; the call sheet's only
//                             US/international signal
//   accessories comma-joined Shopify product TITLES — re-resolved against
//                             product titles by resolve-build.ts:88-98
// `product` is a static hidden input authored in Webflow; we never touch it.
//
// design_url is new: it lets sales rebuild any submitted configuration exactly.
function leadFormSnapshot() {
  const state = getState();
  const wrapColor = state.wrapLine
    ? wrapColorOf(state.wrapLine.merchandise) || state.wrapLine.merchandise.title
    : '';
  return {
    location: countryName,
    variant: config.variants?.[state.baseNumericId]?.color || '',
    wrap: wrapColor,
    pack: state.activeBundle || '',
    quantity: String(state.quantity || 1),
    accessories: state.accessoryLines
      .map((l) => l.merchandise.product.title)
      .filter(Boolean)
      .join(', '),
    design_url: designUrl(),
  };
}

/**
 * Write the snapshot into the adopted Webflow form's hidden inputs.
 *
 * Only ever SETS `.value` on inputs that already exist — it must never add,
 * remove or re-render children of that form, because im-attribution stamps its
 * 16 im_* hidden inputs as the form's last children and latches
 * `data-im-stamped` so it will not re-stamp.
 */
function fillLeadFormSnapshot() {
  const form = app.querySelector('[data-wf-form-slot] form');
  if (!form) return; // standalone demo — no Webflow form adopted
  const snap = leadFormSnapshot();
  for (const [name, value] of Object.entries(snap)) {
    const input = form.querySelector(`input[name="${name}"]`);
    if (input) input.value = value;
  }
}

// ---------- dataLayer ----------
//
// GA4 on this site has no tags of its own: all 28 events fire from GTM
// triggers historically bound to DOM selectors and Webflow CSS classes, which
// a rebuilt DOM silently breaks. These explicit pushes are the replacement
// contract — GTM triggers should key on `event` here, never on markup again.
function pushDataLayer(event, extra) {
  try {
    const state = getState();
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event,
      configurator: 'olto',
      olto_variant: config.variants?.[state.baseNumericId]?.color || '',
      olto_wrap: state.wrapLine
        ? wrapColorOf(state.wrapLine.merchandise) || state.wrapLine.merchandise.title
        : '',
      olto_pack: state.activeBundle || '',
      olto_quantity: state.quantity || 1,
      olto_accessory_count: state.accessoryLines.length,
      olto_value: Number(state.total || 0),
      olto_currency: state.currency || 'USD',
      olto_region: state.region || 'unresolved',
      olto_config_id: getCurrentConfigSessionId() || '',
      ...(extra || {}),
    });
  } catch (err) {
    console.warn('[Olto] dataLayer push failed:', err); // never block the UI
  }
}

// ---------- Save-design lead capture ----------

// The form fronts every save (repeat visitors get it prefilled) but is
// deliberately NOT wired to a backend yet (Eddie's call, 2026-08-25) — the
// lead only lands in the visitor's own localStorage. When it's time to wire
// it (CRM endpoint), submitSaveForm is the single hook point.
const LEAD_KEY = 'olto_tesla_lead';

function getStoredLead() {
  try {
    const lead = JSON.parse(localStorage.getItem(LEAD_KEY));
    return lead?.email ? lead : null;
  } catch {
    return null;
  }
}

function toggleSaveModal(open) {
  const modal = app.querySelector('[data-save-modal]');
  if (!modal) return;
  modal.hidden = !open;
  if (open) {
    const form = modal.querySelector('[data-save-form]');
    const done = modal.querySelector('[data-save-done]');
    if (form) {
      form.hidden = false;
      const lead = getStoredLead();
      for (const key of ['name', 'email', 'phone']) {
        const input = form.querySelector(`input[name="${key}"]`);
        if (input && !input.value) input.value = lead?.[key] || '';
      }
    }
    if (done) done.hidden = true;
    modal.querySelector('input[name="name"]')?.focus();
  }
}

async function submitSaveForm(form) {
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const phone = form.phone.value.trim();
  const error = form.querySelector('[data-save-error]');
  let problem = null;
  if (!name) problem = 'Please add your name.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    problem = 'That email doesn’t look right.';
  } else if (phone.replace(/\D/g, '').length < 7) {
    problem = 'That phone number looks too short.';
  }
  if (problem) {
    if (error) {
      error.textContent = problem;
      error.hidden = false;
    }
    return;
  }
  if (error) error.hidden = true;

  try {
    localStorage.setItem(LEAD_KEY, JSON.stringify({ name, email, phone }));
  } catch {
    // Storage blocked (private mode) — the form just shows again next save
  }

  const url = designUrl();
  let copied = true;
  try {
    await navigator.clipboard.writeText(url);
  } catch {
    copied = false;
  }

  form.hidden = true;
  const done = app.querySelector('[data-save-done]');
  if (done) {
    done.hidden = false;
    const msg = done.querySelector('[data-save-done-msg]');
    if (msg) {
      msg.textContent = copied
        ? 'Link copied to your clipboard — it rebuilds this exact Olto.'
        : 'Copy your link below — it rebuilds this exact Olto.';
    }
    const link = done.querySelector('[data-save-link]');
    if (link) link.textContent = url;
  }
}

// Region gate. Olto is sellable in the US only (Eddie, 2026-08-26), so unlike
// modules/location-flow.js — which still lists Canada in US_COUNTRIES and sends
// it to checkout — only 'US' reaches Shopify here. Everyone else registers
// interest.
//
// An UNRESOLVED region (geo-IP blocked, VPN, the 8s timeout) still falls
// through to checkout, deliberately: assuming international there would hand a
// lead form to every US visitor running a privacy blocker. The trade-off is
// that a mis-geolocated international visitor can reach checkout — the country
// selector is how they correct it, and it is what sets `location` for the CRM.
/**
 * Apply a country code: remember the NAME for the CRM, set the sell/lead
 * region, and reflect it in both the selector and the desktop rail.
 */
function applyCountry(code, { silent } = {}) {
  const match = countries.find((c) => c.Code === code);
  countryName = match?.Name || '';
  setRegion(code === 'US' ? 'us' : 'row');
  const select = app.querySelector('[data-country]');
  if (select && match) select.value = code;
  setText('[data-rail-country]', countryName || '—');
  if (!silent) pushDataLayer('select_country', { olto_country: countryName || code });
}

async function detectRegion() {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 8000);
  try {
    const res = await fetch('https://get.geojs.io/v1/ip/country', { signal: controller.signal });
    const code = (await res.text()).trim().toUpperCase();
    // applyCountry keeps the country NAME, which is the `location` field the
    // CRM splits US from international on — sourced from the same
    // lib/countries.js list the parts-kit configurator's <select> used, so the
    // submitted strings are identical.
    applyCountry(code, { silent: true });
  } catch {
    countryName = '';
    setRegion(''); // unresolved → checkout (see the note above)
  } finally {
    clearTimeout(timer);
  }
}

// ---------- Render updates ----------

/**
 * Keep ?variant= current in the address bar.
 *
 * Not cosmetic: crm-backend parses ?variant= and ?config= off `pageUrl` on the
 * form submission (webhooks/webflow.ts:49-63) into
 * webflow_submissions.shopify_variant_id — the ONLY machine-readable link from
 * a saved build to a real Shopify SKU, and what the follow-up email's one-click
 * cart link is rebuilt from. Params are preserved (?lp_location=wf, ?config=),
 * and so is the hash, which the parts-kit version dropped.
 */
function syncVariantParam(id) {
  if (!id || id === variantParamShown) return;
  variantParamShown = id;
  try {
    const params = new URLSearchParams(window.location.search);
    if (params.get('variant') === String(id)) return;
    params.set('variant', String(id));
    window.history.replaceState(
      {},
      '',
      `${window.location.pathname}?${params}${window.location.hash}`
    );
  } catch (err) {
    console.warn('[Olto] variant param sync failed:', err);
  }
}

function update(state) {
  if (!state.ready) return;

  syncVariantParam(state.baseNumericId);

  // Per-variant metadata (hero background art). Delivery no longer comes from
  // here — see DELIVERY_COPY below — but the hero still does.
  const meta = config.variants[state.baseNumericId] || {};

  // Delivery copy is "Now" (GTM-433). The live site achieved this with a
  // MutationObserver patch script (oltodeliverycopy@1.0.0) that overwrote the
  // bundle's stale per-variant dates; here it is just the copy, and that patch
  // script is retired at cutover.
  setText('[data-delivery]', DELIVERY_COPY);
  setText('[data-rail-delivery]', DELIVERY_COPY_SHORT);

  // Color — one row: Silver (bare base) or the active wrap
  const wrapColor = state.wrapLine
    ? wrapColorOf(state.wrapLine.merchandise) || state.wrapLine.merchandise.title
    : '';
  for (const el of app.querySelectorAll('[data-color-swatch]')) {
    el.classList.toggle(
      'is-selected',
      state.wrapLine ? el.dataset.colorSwatch === wrapColor : el.dataset.colorSwatch === ''
    );
  }

  // On-vehicle accessory layers (same mechanism as the live configurator).
  // Combo rules from config.customImageRules swap/hide layers for specific
  // pairs (e.g. soft bag shown inside the rear basket).
  const addedHandles = new Set(state.accessoryLines.map((l) => l.merchandise.product.handle));
  const layerSrc = {};
  const layerHidden = new Set();
  for (const rule of config.customImageRules || []) {
    if (!rule.when.every((h) => addedHandles.has(h))) continue;
    Object.assign(layerSrc, rule.replace || {});
    for (const h of rule.hide || []) layerHidden.add(h);
  }
  let anyLayerOn = false;
  for (const el of app.querySelectorAll('[data-layer]')) {
    const handle = el.dataset.layer;
    const on = addedHandles.has(handle) && !layerHidden.has(handle);
    const src = layerSrc[handle] || ACCESSORY_LAYERS[handle];
    if (src && el.getAttribute('src') !== src) el.setAttribute('src', src);
    el.classList.toggle('is-on', on);
    if (on) anyLayerOn = true;
  }

  // Hero base: accessory layers are aligned to the base bike canvas, so once
  // any layer is showing the base shot wins. The wrapped-vehicle photo (a
  // different shoot) only shows while no accessories are on the bike.
  //
  // Region split (same as the live site's [data-img-local="us"/"eu"] binding):
  // US market shows the Shopify variant image (US-spec bike); the config's
  // backgroundImage is the EU-spec shot and only shows for rest-of-world.
  const usImage = products.main.variants.find((v) => numericId(v.id) === state.baseNumericId)?.image
    ?.url;
  const regionKey = state.region === 'row' ? 'eu' : 'us';
  const baseImage =
    (regionKey === 'eu' ? meta.backgroundImage : imgUrl(usImage, 1600)) ||
    imgUrl(usImage, 1600) ||
    meta.backgroundImage;
  // Wrap photos register onto the layer canvas, so accessories composite on
  // the wrapped bike too. Side-view shots (Sand) can't register — the wrap
  // photo still wins (the color must never vanish when a pack is added;
  // Eddie's call, Aug 26) and the layers hide instead. Black has no wrap
  // photography yet: the black-anodized base shots stand in (vinyl over the
  // same geometry) and take accessory layers natively.
  let wrapImage = state.wrapLine ? wrapVariantsByColor.get(wrapColor)?.image?.url : null;
  let wrapComposites = wrapImage && !NON_COMPOSITE_WRAPS.has(wrapColor);
  if (state.wrapLine && wrapColor === 'Black') {
    const blackVariant = products.main.variants.find(
      (v) => config.variants[numericId(v.id)]?.color === 'Black'
    );
    if (blackVariant?.image?.url) {
      wrapImage = imgUrl(blackVariant.image.url, 1600);
      wrapComposites = true;
    }
  }
  // Custom has no photography at all (its variant image is a placeholder) —
  // the silver base bike stands in
  if (wrapColor === 'Custom') wrapImage = null;
  // Non-composite wrap showing → its layers would misregister; hide them
  app
    .querySelector('[data-layers]')
    ?.classList.toggle('is-suppressed', Boolean(wrapImage) && !wrapComposites && anyLayerOn);
  if (wrapImage) {
    crossfadeHero(wrapImage, `wrap:${wrapColor}`);
  } else {
    crossfadeHero(baseImage, `base:${state.baseNumericId}:${regionKey}`);
  }

  // Bundles — while a selection's round trips are in flight, the tapped
  // card highlights immediately instead of waiting on the cart
  const activeBundle = pendingBundleView ? pendingBundleView.value : state.activeBundle;
  for (const el of app.querySelectorAll('[data-bundle]')) {
    el.classList.toggle('is-selected', el.dataset.bundle === activeBundle);
  }

  // Accessories
  const added = new Set(state.accessoryLines.map((l) => l.merchandise.product.handle));
  for (const el of app.querySelectorAll('[data-acc-toggle]')) {
    const has = added.has(el.dataset.accToggle);
    el.textContent = has ? 'Added' : 'Add';
    el.classList.toggle('is-added', has);
    el.closest('[data-acc]')?.classList.toggle('is-added', has);
  }
  // Un-added items lead the row; added ones move to the end (stable sort
  // keeps catalog order within each group) — Eddie's call, Aug 26
  const accList = app.querySelector('[data-acc-list]');
  if (accList) {
    const cards = [...accList.querySelectorAll('.acc')];
    const sorted = [...cards].sort(
      (a, b) => (added.has(a.dataset.acc) ? 1 : 0) - (added.has(b.dataset.acc) ? 1 : 0)
    );
    if (cards.some((el, i) => el !== sorted[i])) {
      for (const el of sorted) accList.appendChild(el);
    }
  }

  // Quantity
  setText('[data-qty-value]', String(state.quantity));

  // Summary (sheet + desktop rail)
  const rowsHtml = buildSummaryRows(state, config);
  for (const summary of app.querySelectorAll('[data-summary]')) {
    if (summary.innerHTML !== rowsHtml) summary.innerHTML = rowsHtml;
  }
  setText('[data-summary-total]', formatMoney(state.total, state.currency));

  // Payment mode (Cash / Lease / Finance)
  const fig = paymentFigures(state.total, state.currency, state.payMode);
  for (const el of app.querySelectorAll('[data-pay-mode]')) {
    el.classList.toggle('is-active', el.dataset.payMode === state.payMode);
  }
  setText('[data-pay-figure]', formatMoney(fig.amount, state.currency) + fig.suffix);
  setText('[data-pay-sub]', fig.sub);

  // Footer reflects the selected payment mode
  updateTotal(fig.amount, fig.suffix, state.currency);
  setText('[data-total-label]', fig.label);
  const cta = app.querySelector('[data-cta]');
  if (cta) {
    // Keep the real checkout URL on the anchor so im-attribution can see it.
    const url = state.region === 'row' ? '' : getCheckoutUrl();
    cta.setAttribute('href', url || '#');
  }
  if (cta) cta.textContent = state.region === 'row' ? 'Register interest' : 'Order';
}

function wrapColorOf(merchandise) {
  const opt = merchandise.selectedOptions?.find((o) => /colou?rs?/i.test(o.name));
  return opt?.value || null;
}

// Applies to every match — [data-summary-total], [data-config-reset] etc.
// exist twice (sheet + desktop rail)
function setText(selector, text) {
  for (const el of app.querySelectorAll(selector)) {
    if (el.textContent !== text) el.textContent = text;
  }
}

// IM ease: cubic-bezier(0.215, 0.61, 0.355, 1) at 450ms == easeOutCubic ==
// GSAP power2.out at 0.45 — used for every animated transition on the page.
function updateTotal(value, suffix, currency) {
  const el = app.querySelector('[data-total]');
  if (!el) return;
  // Skip the tween when the tab isn't visible — rAF is throttled there, so a
  // tween would freeze mid-flight and leave a stale figure on screen.
  if (gsap && !document.hidden && totalShown !== value) {
    if (totalTween) totalTween.kill();
    const obj = { v: totalShown };
    totalTween = gsap.to(obj, {
      v: value,
      duration: 0.45,
      ease: 'power2.out',
      onUpdate: () => {
        el.textContent = formatMoney(obj.v, currency) + suffix;
      },
      onComplete: () => {
        el.textContent = formatMoney(value, currency) + suffix;
      },
    });
  } else {
    el.textContent = formatMoney(value, currency) + suffix;
  }
  totalShown = value;
}

function crossfadeHero(src, key) {
  if (!src || key === heroShownKey) return;
  const imgs = {
    a: app.querySelector('[data-hero-img="a"]'),
    b: app.querySelector('[data-hero-img="b"]'),
  };
  if (!imgs.a || !imgs.b) return;

  if (heroShownKey === null) {
    // First paint — buildPage seeded the default variant's image; a restored
    // session may have a different color/wrap, so sync without animating.
    imgs[heroActive].src = src;
    heroShownKey = key;
    return;
  }

  const showing = imgs[heroActive];
  const incoming = imgs[heroActive === 'a' ? 'b' : 'a'];
  incoming.src = src;
  heroActive = heroActive === 'a' ? 'b' : 'a';
  heroShownKey = key;

  if (gsap) {
    gsap.set(incoming, { opacity: 0, scale: 1.04, xPercent: 0, yPercent: 0 });
    incoming.classList.add('is-active');
    gsap.to(incoming, { opacity: 1, scale: 1, duration: 0.45, ease: 'power2.out' });
    gsap.to(showing, {
      opacity: 0,
      duration: 0.45,
      ease: 'power2.out',
      onComplete: () => showing.classList.remove('is-active'),
    });
  } else {
    incoming.classList.add('is-active');
    incoming.style.opacity = 1;
    showing.classList.remove('is-active');
    showing.style.opacity = 0;
  }
}

function initReveals() {
  if (!gsap || !window.ScrollTrigger) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const scroller = app.querySelector('.sheet');
  for (const section of app.querySelectorAll('.opt')) {
    gsap.from(section, {
      y: 24,
      opacity: 0,
      duration: 0.45,
      ease: 'power2.out',
      scrollTrigger: { trigger: section, scroller, start: 'top 88%', once: true },
    });
  }
}
