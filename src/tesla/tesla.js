// Tesla-configurator-inspired mobile page for Olto.
// Standalone shell (dist/tesla/) — reuses the SDK's data + cart layer, builds
// its own DOM. GSAP comes from the page (CDN) like Webflow provides it in prod.

import './tesla.css';

import config from '../configs/olto.js';
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

const app = document.querySelector('#app');

let products = null;
let wrapVariantsByColor = new Map();
let heroActive = 'a';
let heroShownKey = null;

// Pixel-measured (canvas bbox scan): the EU avif, US Shopify shots, and all
// "3.4" wrap photos frame the bike identically (within ~1%), and the layer
// art registers natively on all of them — NO transform needed. Sand is the
// one exception: a side-view shot that can never register with the layers.
const NON_COMPOSITE_WRAPS = new Set(['Sand']);
let totalShown = 0;
let totalTween = null;

boot();

async function boot() {
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
      if (getStoredLead()) {
        // Already identified — quick save, no form. Saving from the nudge
        // confirms ("Link copied") then dismisses it.
        if (e.target.closest('[data-nudge]')) setTimeout(hideNudge, 2200);
        return saveConfiguration();
      }
      // First save: the lead form takes over (the nudge would stack under it)
      if (e.target.closest('[data-nudge]')) hideNudge();
      return toggleSaveModal(true);
    }
    if (e.target.closest('[data-save-close]')) return toggleSaveModal(false);
    if (e.target.closest('[data-nudge-close]')) return hideNudge();
    if (e.target.closest('[data-config-reset]')) return clearConfiguration();
    if (e.target.closest('[data-cta]')) return primaryAction();
    if (e.target.closest('[data-interest-close]')) return toggleInterest(false);
  });

  app.addEventListener('submit', (e) => {
    if (e.target.closest('[data-save-form]')) {
      e.preventDefault();
      submitSaveForm(e.target);
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
  const wrapHandle = config.wrap.productHandle;
  if (!color) return setLine(wrapHandle, null);
  const variant = wrapVariantsByColor.get(color);
  if (variant) setLine(wrapHandle, variant.id);
}

function toggleAccessory(handle) {
  const state = getState();
  const has = state.accessoryLines.some((l) => l.merchandise.product.handle === handle);
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
// whole way. A busy guard swallows double-taps during the ~1s round trip.
let bundleBusy = false;
async function selectBundle(handle) {
  if (bundleBusy) return;
  bundleBusy = true;
  try {
    // Let any in-flight single-line write settle first — its late server
    // snapshot would otherwise wipe this batch's lines
    await lastLineWrite;
    const state = getState();
    const wasActive = state.activeBundle === handle;

    // Selecting a pack replaces the currently-staged accessories
    const lineIds = state.accessoryLines
      .map((l) => l.id)
      .filter((id) => !String(id).startsWith('tmp_'));
    if (lineIds.length) await removeLines(lineIds);

    // Tapping the active pack again just clears it; the base "Olto" kit has
    // no items, so clearing the staged accessories was the whole action
    const kit = KITS.find((k) => k.key === handle);
    if (wasActive || !kit?.items.length) return;

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
  }
}

function changeQty(delta) {
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

let saveResetTimer = null;
async function saveConfiguration() {
  const url = designUrl();
  const btns = [...app.querySelectorAll('[data-save]')];
  try {
    await navigator.clipboard.writeText(url);
    for (const b of btns) b.textContent = 'Link copied';
  } catch {
    // Clipboard blocked (permissions/insecure context) — keep the link in the
    // address bar instead so it can be copied manually
    window.history.replaceState({}, '', url);
    for (const b of btns) b.textContent = 'Link in URL';
  }
  clearTimeout(saveResetTimer);
  saveResetTimer = setTimeout(() => {
    for (const b of btns) b.textContent = b.dataset.saveLabel || 'Save';
  }, 2200);
}

// Same action as the live configurator's [data-config-reset] (config-reset.js):
// remove every line in the current session, roll to a fresh session, re-seed
// the default bike. Two-tap confirm instead of window.confirm — no blocking
// native dialog.
let clearArmed = null;
async function clearConfiguration() {
  const btn = app.querySelector('[data-config-reset]');
  if (!clearArmed) {
    if (btn) {
      btn.textContent = 'Tap again to clear';
      btn.classList.add('is-armed');
    }
    clearArmed = setTimeout(() => {
      clearArmed = null;
      if (btn) {
        btn.textContent = 'Clear configuration';
        btn.classList.remove('is-armed');
      }
    }, 3000);
    return;
  }
  clearTimeout(clearArmed);
  clearArmed = null;
  if (btn) {
    btn.textContent = 'Clear configuration';
    btn.classList.remove('is-armed');
  }
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
  if (state.region === 'row') return toggleInterest(true);
  const url = getCheckoutUrl();
  if (url) window.location.href = url;
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

function toggleInterest(open) {
  const modal = app.querySelector('[data-interest]');
  if (modal) modal.hidden = !open;
}

// ---------- Save-design lead capture ----------

// The form collects name/email/phone but is deliberately NOT wired to a
// backend yet (Eddie's call, 2026-08-25) — the lead only lands in the
// visitor's own localStorage so repeat saves skip the form. When it's time to
// wire it (CRM endpoint), submitSaveForm is the single hook point.
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
    if (form) form.hidden = false;
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

// Region gate: US + Canada order, everyone else registers interest — same
// rule as modules/location-flow.js (geojs.io, 8s safety timeout, unresolved
// region falls through to checkout).
async function detectRegion() {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 8000);
  try {
    const res = await fetch('https://get.geojs.io/v1/ip/country', { signal: controller.signal });
    const code = (await res.text()).trim().toUpperCase();
    setRegion(['US', 'CA'].includes(code) ? 'us' : 'row');
  } catch {
    setRegion(''); // unresolved → checkout, matching primary-action.js
  } finally {
    clearTimeout(timer);
  }
}

// ---------- Render updates ----------

function update(state) {
  if (!state.ready) return;

  const meta = config.variants[state.baseNumericId] || {};
  setText('[data-delivery]', meta.delivery ? `Est. delivery ${meta.delivery}` : '');

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

  // Bundles
  for (const el of app.querySelectorAll('[data-bundle]')) {
    el.classList.toggle('is-selected', el.dataset.bundle === state.activeBundle);
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

  // Summary
  const summary = app.querySelector('[data-summary]');
  if (summary) summary.innerHTML = buildSummaryRows(state, config);
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
  if (cta) cta.textContent = state.region === 'row' ? 'Register interest' : 'Order';
}

function wrapColorOf(merchandise) {
  const opt = merchandise.selectedOptions?.find((o) => /colou?rs?/i.test(o.name));
  return opt?.value || null;
}

function setText(selector, text) {
  const el = app.querySelector(selector);
  if (el && el.textContent !== text) el.textContent = text;
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
