// Pure HTML builders for the Infinite configurator page. No state, no
// listeners — infinite.js renders this once, then mutates the dynamic bits
// in update().

// The same 249-entry list the parts-kit configurator's country <select> used,
// so the `location` string submitted to the CRM is identical to what
// /olto/configure has always sent.
import { countries } from '../lib/countries.js';

// Official IM wordmark (from ~/Code/active/im-creative-library/public/im-wordmark.svg),
// inlined with currentColor so it inherits text color.
// Official red Olto wordmark (Brand Files/Logos/2026_Current/Vehicle/OLTO Wordmark-Red.svg)
export const OLTO_WORDMARK_SVG = `<svg viewBox="0 0 922 201" fill="none" xmlns="http://www.w3.org/2000/svg" class="olto-wordmark" role="img" aria-label="Olto"> <path d="M246.995 19.4652C255.252 28.6186 259.698 41.3214 261.454 61.0855C262.35 70.239 262.649 80.8495 262.649 102.706C262.649 151.985 257.942 170.89 242.885 184.153C231.976 193.605 217.218 198.313 192.41 199.807C182.958 200.405 147.241 201.003 119.817 201.003C59.5913 201.003 43.3765 199.247 26.564 190.093C13.5623 182.995 5.00663 169.433 2.35399 149.968C0.598013 136.966 0.000235075 126.355 0.000235075 94.1874C-0.0371261 48.1211 4.37149 29.8142 18.5687 17.4103C29.1793 7.95792 43.0403 3.54931 68.4458 1.45708C78.496 0.560417 108.011 0 143.99 0C213.631 0 232.237 3.54931 246.995 19.4652ZM46.2907 100.651C46.2907 139.021 49.2422 151.425 60.1517 157.029C71.0611 162.932 80.5135 163.829 136.891 163.829C187.665 163.829 200.331 161.774 208.326 152.919C215.126 145.559 217.181 132.856 217.181 99.4927C217.181 37.8095 216.583 37.2117 131.586 37.2117C46.5896 37.2117 46.2907 38.1084 46.2907 100.651Z" fill="#E90022"/> <path d="M286.86 2.05334H332.328V162.034H476.057V198.909H286.86V2.05334Z" fill="#E90022"/> <path d="M507.328 38.9662H414.673V2.05334H645.154V38.9288H552.759V198.909H507.291V38.9662H507.328Z" fill="#E90022"/> <path d="M906.345 19.4644C914.602 28.6179 919.048 41.3207 920.804 61.0847C921.701 70.2382 922 80.8488 922 102.705C922 151.984 917.292 170.889 902.236 184.152C891.326 193.605 876.569 198.312 851.761 199.807C842.308 200.404 806.591 201.002 779.168 201.002C718.979 201.002 702.727 199.246 685.915 190.093C672.913 182.994 664.357 169.432 661.705 149.967C659.949 136.965 659.351 126.355 659.351 94.1867C659.351 48.1578 663.797 29.8508 677.957 17.4469C688.567 7.99454 702.466 3.58593 727.834 1.49371C737.884 0.597038 767.399 0.0366211 803.378 0.0366211C873.019 0.0366211 891.625 3.58593 906.383 19.5018L906.345 19.4644ZM705.679 100.65C705.679 139.02 708.63 151.424 719.54 157.028C730.449 162.931 739.901 163.828 796.279 163.828C847.053 163.828 859.719 161.773 867.714 152.918C874.514 145.558 876.569 132.855 876.569 99.492C876.569 37.8087 875.971 37.211 790.974 37.211C705.978 37.211 705.679 38.1076 705.679 100.65Z" fill="#E90022"/> </svg>`;

export const WORDMARK_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 831.97 45.21" class="im-wordmark" fill="currentColor" role="img" aria-label="Infinite Machine"><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path d="M13.56.33V44.88H0V.33Z"/><path d="M44.93.33l27,33.86L71.58.33H84.4V44.88H62.63L36,11.35l.34,33.53h-13V.33Z"/><path d="M141.66.33V10.42H107.87V19.3h32.06V29.39H107.87V44.88H94.38V.33Z"/><path d="M163.09.33V44.88H149.54V.33Z"/><path d="M194.46.33l27,33.86L221.11.33h12.82V44.88H212.16L185.58,11.35l.33,33.53h-13V.33Z"/><path d="M257.44.33V44.88H243.89V.33Z"/><path d="M264.52,11.35V.33h53.23v11H297.91V44.88H284.35V11.35Z"/><path d="M374.26,10.42h-36V18.1h33.93v8.81H338.26V34.8h36.47V44.88H324.91V.33h49.35Z"/><path d="M423,.33l16.23,29.59L455.34.33h21.37V44.88H463.49l.67-34.39L444.39,44.88H433.57L414.13,10.49l.4,34.39H401.44V.33Z"/><path d="M526.62.33,551,44.88H536.17l-4.4-8H503.05l-4.28,8H483.41l25-44.55Zm-9.21,9.55-9.49,17.77H527Z"/><path d="M611.09,32.22c0,1.14-.11,2.11-.2,2.91a13.74,13.74,0,0,1-.36,2.07,11.1,11.1,0,0,1-.57,1.6,8.86,8.86,0,0,1-4.21,4.31,21.46,21.46,0,0,1-8.08,1.77q-2.07.19-6.18.27t-10.78.06c-3.21,0-5.91,0-8.12-.13a53.92,53.92,0,0,1-5.61-.47,20.34,20.34,0,0,1-3.9-.9,14.32,14.32,0,0,1-2.94-1.43,10.08,10.08,0,0,1-2.77-2.58,11.37,11.37,0,0,1-1.74-3.87,32.31,32.31,0,0,1-.9-5.84c-.18-2.32-.27-5.12-.27-8.42q0-4.41.27-7.48a23.36,23.36,0,0,1,1-5.24,10,10,0,0,1,1.87-3.54,10.88,10.88,0,0,1,2.9-2.37,16.6,16.6,0,0,1,3.17-1.44,23.22,23.22,0,0,1,4-.9Q570,.27,573.29.13c2.19-.09,4.83-.13,8-.13q6.21,0,10.22.07c2.67,0,4.88.15,6.61.33a27.49,27.49,0,0,1,4.21.7,18,18,0,0,1,3,1.1,8.12,8.12,0,0,1,4,4.35,20.63,20.63,0,0,1,1.27,7.94V16h-13a11.59,11.59,0,0,0-.5-2.87,2.69,2.69,0,0,0-1.7-1.6,12.6,12.6,0,0,0-3.87-.67c-1.7-.09-4-.13-6.95-.13q-4.14,0-6.74.06c-1.74.05-3.13.14-4.18.27a10.12,10.12,0,0,0-2.4.53,5.12,5.12,0,0,0-1.44.87,4.48,4.48,0,0,0-1,1.24,7.48,7.48,0,0,0-.6,1.87,20.61,20.61,0,0,0-.3,2.94c0,1.18-.07,2.66-.07,4.44a42.86,42.86,0,0,0,.37,6.31A5.34,5.34,0,0,0,570,32.66a8,8,0,0,0,4.21,1.43,75.75,75.75,0,0,0,7.68.31c2.54,0,4.57,0,6.11,0s2.77,0,3.71-.1a12.82,12.82,0,0,0,2.13-.23,7.73,7.73,0,0,0,1.47-.5,3.77,3.77,0,0,0,2.07-1.81,8.36,8.36,0,0,0,.6-3.6h13.16C611.16,29.72,611.14,31.09,611.09,32.22Z"/><path d="M633.44.33v16.5H664.3V.33h13.56V44.88H664.3v-17H633.44v17H619.88V.33Z"/><path d="M701.33.33V44.88H687.77V.33Z"/><path d="M732.7.33l27,33.86L759.35.33h12.82V44.88H750.4L723.82,11.35l.33,33.53h-13V.33Z"/><path d="M831.51,10.42h-36V18.1h33.93v8.81H795.51V34.8H832V44.88H782.15V.33h49.36Z"/></g></g></svg>`;

// On-vehicle accessory layers — same mechanism as the live configurator
// (modules/accessory-layers.js): each accessory has an image shot in-position
// on the base bike canvas; adding the accessory reveals its layer. URLs are
// the live site's own Webflow assets (extracted from /olto/configure).
// Accessories missing here (phone mount, trailer adapter) have no layer on
// the live site either.
// NOTE: layer assets live in the site's CMS bucket (66ea2a84...), not the
// main asset folder — URLs extracted verbatim from the live /olto/configure.
const LAYER_CDN = 'https://cdn.prod.website-files.com/66ea2a84659b76f5d91d481b';
// Entry order = paint order (later entries stack on top). The water bottle
// mounts behind the translucent sidewall panel, so it must come BEFORE
// olto-sidewalls (Eddie's Aug 26 screenshot showed it wrongly on top).
export const ACCESSORY_LAYERS = {
  'accessory-plate': `${LAYER_CDN}/68d53a735e9c987a9499211a_accessory-plate.avif`,
  'charger-bag': `${LAYER_CDN}/68d53a2cb165eb23a2527775_charger-bag.avif`,
  'olto-center-stand': `${LAYER_CDN}/68d53974c880c4b20d23dec9_olto-center-stand.avif`,
  'olto-charging-dock': `${LAYER_CDN}/68d5396153ba7acdd9978c0d_olto-charging-dock.avif`,
  'olto-kid-carrier': `${LAYER_CDN}/6921a92ec4d3dc4a766d69bb_Kid%20Carrier.avif`,
  'olto-rear-basket': `${LAYER_CDN}/68d53b6769ccc4ad6ad7d0b3_olto-rear-basket.avif`,
  'olto-rear-rack': `${LAYER_CDN}/68d53b2e1153a3e349d34c1a_olto-rear-rack.avif`,
  'olto-side-mounting-plate': `${LAYER_CDN}/68d53bea87ff421cf85c858e_olto-side-mounting-plate.avif`,
  'olto-water-bottle-holder': `${LAYER_CDN}/68d53d46367f73dfd1b58a42_olto-water-bottle-holder.avif`,
  'olto-sidewalls': `${LAYER_CDN}/68d53c3ccb4cfb15c59ac6cd_olto-sidewalls.avif`,
  'olto-super-charger': `${LAYER_CDN}/6921a99cb5dd5b924cf4965d_Super%20Charger%20on%20the%20Ground.avif`,
  'olto-u-lock-mount': `${LAYER_CDN}/68d53cf8bb965a6129e84ff4_olto-u-lock-mount.avif`,
  'open-face-helmet': `${LAYER_CDN}/6921a8f20583ec71e2663dce_Black%20Open%20Face%20Helmet.avif`,
  'kryptonite-lock': `${LAYER_CDN}/68d53fc0d2d8d2d151493b5f_kryptonite-lock.avif`,
  'olto-soft-bag': `${LAYER_CDN}/692197c1914921de9b30217a_Soft%20Bag%20on%20the%20Ground.avif`,
};

// Layers shot ON THE GROUND next to the bike rather than mounted on it. They
// sit low on the shared canvas, and the hero's portrait composition crops the
// bottom (object-fit: cover on a 44vh box) — which sliced the helmet in half
// (obodom, Aug 27, "it gets a bit cut off"). The hero letterboxes instead while
// one of these is on; see .hero.is-ground-layer in infinite.css.
export const GROUND_LAYERS = new Set(['open-face-helmet', 'olto-super-charger', 'olto-soft-bag']);

/**
 * Does Shopify actually honour the bundle price?
 *
 * TRUE since 2026-08-27: three discount codes exist and were verified against
 * live carts at $3,695 / $4,095 / $4,275. infinite.js applies the matching code
 * when a bundle's set matches exactly (BUNDLE_CODES / syncBundleDiscount);
 * bin/create-bundle-discounts.mjs creates and re-checks them.
 *
 * If it were false, the kit cards would show the honest a-la-carte sum with no
 * tier price and no strikethrough — because adding the Commuter set really
 * would cost $326, not $200. The flag only controls what is ADVERTISED; the
 * running total always comes from what Shopify applied, so it is truthful
 * either way.
 */
export const BUNDLE_DISCOUNT_LIVE = true;

// Payment: Cash or Shop Pay Installments (Eddie, Aug 26 pm — "add financing
// with shop pay options. so cash and finance"). Lease is parked entirely.
//
// 12 months at 0% APR (Obie, 2026-08-27). The anchor has to be a payment Shop
// Pay will actually honour, and at 0% APR total/12 is exact.
//
// The earlier 24-month anchor was wrong twice over. Its comment claimed US
// monthly plans were 3/6/12 — Shopify in fact offers 3/6/12/18/24 — but the
// real problem was the maths: 24-month plans carry APR, so total/24 quoted a
// payment nobody could get. 24 months exists and is cheaper per month; it is
// just not quotable, because APR runs 0-36% per buyer. So the headline is the
// exact 0% figure and the longer terms are mentioned without a number.
//
// Joseph, Aug 27: "when you click the finance option, it doesn't actually pass
// along to shop." Correct, and not fixable — Shop Pay terms are chosen by the
// buyer during checkout and the cart API cannot preselect them. This toggle is
// an estimator, which is why the copy points at checkout for real terms.
export const PAYMENT_PLANS = {
  finance: { months: 12, apr: 0 },
};

// Shop Pay quotes installments on the ORDER total, so a monthly derived from
// the configurator's subtotal is always low. Measured 2026-08-27 on a real
// checkout: $4,195 subtotal → $125 shipping + $339.05 tax = $4,659.05, and Shop
// Pay offered $388.25/mo over 12. The same cart quoted off the subtotal would
// have read $307.92/mo — about $80/mo under what the buyer is actually offered.
//
// Tax is destination-dependent and we only know the country at this point, so
// TAX_RATE_EST is the effective rate from that one observed checkout. It makes
// the figure close rather than exact, which is why it is labelled "Est." and
// the sub-line sends the buyer to checkout for the real number.
// TODO(obie/joseph): replace with a defensible national figure before cutover.
const SHIPPING_EST = 125;
const TAX_RATE_EST = 0.0808;

export function estimatedOrderTotal(subtotal, region) {
  if (!subtotal) return subtotal;
  const taxed = region === 'us' ? subtotal * (1 + TAX_RATE_EST) : subtotal;
  return taxed + SHIPPING_EST;
}

// What the order bar + Payment section show for a given mode.
export function paymentFigures(total, currency, mode, region) {
  if (mode === 'finance') {
    const { months } = PAYMENT_PLANS.finance;
    const monthly = estimatedOrderTotal(total, region) / months;
    return {
      amount: monthly,
      suffix: '/mo',
      label: 'Est. 12 mo at 0% APR, with Shop Pay',
      sub: `About ${formatMoney(
        monthly,
        currency
      )}/mo with Shop Pay Installments — ${months} monthly payments at 0% APR for eligible buyers. Includes estimated tax and shipping; your exact payment is shown at checkout. Longer terms are available there and carry interest.`,
    };
  }
  return {
    amount: total,
    suffix: '',
    label: 'Est. purchase price',
    sub: 'Taxes and shipping calculated at checkout.',
  };
}

// Bundles — page-defined per the Aug 26 meeting (Eddie + Obie): contents,
// taglines, and tier prices live here, NOT in the Shopify metaobjects (those
// still feed the live configurator and stay untouched). "Save" = summed item
// value minus the tier price. NOTE: the demo cart still charges full
// per-item prices — real bundle pricing needs Shopify discounts/bundle
// products before go-live.
// Tier prices repriced per the team review (Aug 26): savings must GROW with
// tier — the old 700/950 made Commuter save more than Max. With these,
// Commuter saves ~$275, Cargo ~$320, Max ~$416 (value is summed at runtime).
// TODO(eddie): confirm Cargo/Max prices — obodom asked for bigger savings on
// bigger bundles; exact figures are a pricing call.
// Helmet pulled from Commuter (obodom, Aug 26): upsell it in person instead —
// the remaining ~$475 of inventory at +$200 matches his "+400 at +200" target.
export const KITS = [
  {
    key: 'commuter',
    label: 'Olto Commuter',
    tagline: 'Everything you need to commute every day.',
    popular: true,
    price: 200,
    items: [
      'olto-sidewalls',
      'olto-charging-dock',
      'olto-phone-mount',
      'olto-water-bottle-holder',
      'bottom-cover',
    ],
  },
  {
    key: 'cargo',
    label: 'Olto Cargo',
    tagline: 'Carry everything.',
    price: 600,
    items: [
      'olto-sidewalls',
      'olto-charging-dock',
      'olto-phone-mount',
      'charger-bag',
      'olto-rear-rack',
      'olto-rear-basket',
      'olto-soft-bag',
      'olto-side-mounting-plate',
      'accessory-plate',
      'olto-center-stand',
    ],
  },
  {
    key: 'max',
    label: 'Olto Max',
    tagline: 'Fully loaded. Full power.',
    price: 780,
    items: [
      'olto-sidewalls',
      'olto-charging-dock',
      'olto-phone-mount',
      'olto-water-bottle-holder',
      'charger-bag',
      'olto-rear-rack',
      'olto-rear-basket',
      'olto-soft-bag',
      'olto-side-mounting-plate',
      'accessory-plate',
      'olto-center-stand',
      'olto-super-charger',
    ],
  },
];

// Bundle-only products (no photography) stay out of the Accessories row
const ROW_HIDDEN = new Set(['bottom-cover']);

// Which accessories get a unit stepper.
//
// A helmet is the only thing on this list that a single order plausibly needs
// two of — one rider, one passenger. Everything else is fitted to the vehicle,
// so a count would be an invitation to a mistake rather than a choice ("do we
// want units on everything? or just helmet" / "Just helmet" — Obie and Joseph,
// Aug 27). Adding a handle here is all it takes to give it a stepper; the cart,
// share-link and CRM plumbing already carries counts for anything.
export const MULTI_UNIT_ACCESSORIES = new Set(['open-face-helmet', 'full-face-helmet']);

// Play badge for accessories that carry an instruction clip — same feature as
// the live configurator's Bunny lightbox (modules/accessory-video.js), which
// this page had been missing ("put back the videos that are in the current
// configurator" — Eddie, Aug 26 pm).
const PLAY_ICON = `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M9 7.5v9l7.5-4.5z" fill="currentColor"/></svg>`;

// Display-only renames where the Shopify title is stale — the handle is still
// what the cart and the bundle definitions use. ("bottom cover is Outdoor
// Cover" — Eddie, Aug 26 pm.)
const TITLE_OVERRIDES = new Map([['bottom-cover', 'Outdoor Cover']]);

export function productTitle(handle, fallback) {
  return TITLE_OVERRIDES.get(handle) || fallback || handle;
}

// Adapted from modules/price-display.js formatMoney — cents shown only when
// they exist ("$3,495", not "$3,495.00").
export function formatMoney(amount, currencyCode = 'USD') {
  const n = Number(amount) || 0;
  const digits = n % 1 === 0 ? 0 : 2;
  if (currencyCode === 'USD') {
    return `$${n.toLocaleString('en-US', {
      minimumFractionDigits: digits,
      maximumFractionDigits: digits,
    })}`;
  }
  return `${currencyCode} ${n.toFixed(2)}`;
}

export function esc(s) {
  return String(s ?? '').replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);
}

// Shopify CDN images accept a width param for on-the-fly resizing
export function imgUrl(url, width) {
  if (!url) return '';
  return `${url}${url.includes('?') ? '&' : '?'}width=${width}`;
}

export function buildPage({ config, products, wrapVariantsByColor }) {
  const variants = Object.entries(config.variants); // [numericId, meta]
  const [defaultId] = variants.find(([id]) => id === config.defaultVariantId) || variants[0];

  // Static "from" anchor for the intro — base bike only, rounded to whole
  // dollars. Deliberately NOT live: the sticky order bar is the single live
  // figure for the configured build.
  const basePrice = Math.min(...products.main.variants.map((v) => parseFloat(v.price.amount)));

  return `
    <header class="topbar">
      <div class="topbar_mark">${WORDMARK_SVG}</div>
    </header>

    <!-- Wide-desktop left rail (live-site configurator layout); hidden on
         mobile/tablet. [data-summary]/[data-summary-total]/[data-config-reset]
         are duplicated from the sheet — the render helpers update every match. -->
    <aside class="rail" aria-label="Olto specifications">
      <div class="rail_mark">
        ${WORDMARK_SVG}
        <div class="rail_olto">${OLTO_WORDMARK_SVG}</div>
      </div>
      <div class="rail_facts">
        <div class="rail_row">
          <span class="rail_key">Shipping</span>
          <span class="rail_val rail_val--ship"><span data-rail-delivery>Now</span><span class="rail_dot"></span></span>
        </div>
        <div class="rail_row">
          <span class="rail_key">Ship to</span>
          <span class="rail_val" data-rail-country>&mdash;</span>
        </div>
        <div class="rail_row">
          <span class="rail_key">Starting at</span>
          <span class="rail_val">${formatMoney(basePrice)}</span>
        </div>
      </div>
      <div class="rail_block">
        <h3 class="rail_heading">Included as standard</h3>
        <ul class="rail_list">
          <li>Olto</li>
          <li>Battery</li>
          <li>Charger</li>
          <li>Internet Module</li>
        </ul>
      </div>
      <div class="rail_block rail_block--config">
        <h3 class="rail_heading">Configuration</h3>
        <div class="summary" data-summary></div>
        <div class="summary_total">
          <span>Total</span>
          <span data-summary-total></span>
        </div>
        <div class="config-actions">
          <button type="button" class="config-clear" data-config-reset>Clear configuration</button>
          <!-- Opens IM's Intercom messenger in-page (infinite.js); the href is
               the fallback for a blocked/failed widget. -->
          <a
            class="config-rep"
            data-rep-chat
            href="https://www.infinitemachine.com/contact"
            target="_blank"
            rel="noopener"
          >Talk to a rep</a>
        </div>
      </div>
    </aside>

    <section class="hero" aria-label="Olto">
      <img class="hero_img is-active" data-hero-img="a" src="${esc(
        config.variants[defaultId].backgroundImage
      )}" alt="Olto" />
      <img class="hero_img" data-hero-img="b" alt="" aria-hidden="true" />
      <div class="hero_layers" data-layers>
        ${Object.entries(ACCESSORY_LAYERS)
          .map(
            ([handle, url]) =>
              `<img class="hero_layer" data-layer="${esc(handle)}" src="${esc(
                url
              )}" alt="" aria-hidden="true" />`
          )
          .join('')}
      </div>
    </section>

    <main class="sheet">
      <section class="intro">
        <h1 class="intro_title">${OLTO_WORDMARK_SVG}<span class="visually-hidden">Configure your Olto</span></h1>
        <p class="intro_delivery" data-delivery></p>
        <p class="intro_price">From ${formatMoney(basePrice)}</p>
      </section>

      <!-- Spec stats were cut from the config funnel (team review, Aug 26 —
           "not useful info at the config funnel step"). -->

      ${buildColorSection(config, variants, wrapVariantsByColor)}

      ${buildKitsSection(products)}

      <section class="opt opt--acc" data-section="accessories">
        <h2 class="opt_title">Additional Accessories</h2>
        <div class="acc-nav">
          <button type="button" class="acc-nav_btn" data-acc-scroll="-1" aria-label="Scroll accessories back">&#8249;</button>
          <button type="button" class="acc-nav_btn" data-acc-scroll="1" aria-label="Scroll accessories forward">&#8250;</button>
        </div>
        <div class="acc-list" data-acc-list>
          ${products.accessories
            .filter((p) => !ROW_HIDDEN.has(p.handle))
            .map((p) => buildAccessoryCard(p))
            .join('')}
        </div>
      </section>

      <section class="opt" data-section="quantity">
        <h2 class="opt_title">Quantity</h2>
        <div class="qty">
          <button type="button" class="qty_btn" data-qty-dec aria-label="Decrease quantity">&minus;</button>
          <span class="qty_value" data-qty-value>1</span>
          <button type="button" class="qty_btn" data-qty-inc aria-label="Increase quantity">+</button>
        </div>
      </section>

      <!-- Cash / Shop Pay Installments (Eddie, Aug 26 pm) — the two-way picker
           replaces the scratched three-way Cash/Lease/Finance one. It was tried
           at the top of the sheet and folded into the order bar; both were
           rolled back ("i dont like the payment options on mobile. lets go back
           to the way it was before"), so it is a section again, after the build
           is configured. -->
      <section class="opt" data-section="payment">
        <h2 class="opt_title">Payment</h2>
        <div class="paytoggle">
          <button type="button" class="paytoggle_btn" data-pay-mode="cash">Cash</button>
          <button type="button" class="paytoggle_btn" data-pay-mode="finance">Finance</button>
        </div>
        <div class="pay_meta">
          <div class="pay_figure" data-pay-figure></div>
          <div class="pay_sub" data-pay-sub></div>
        </div>
      </section>

      <section class="opt opt--summary" data-section="summary">
        <h2 class="opt_title">Your Olto</h2>
        <div class="summary" data-summary></div>
        <div class="summary_total">
          <span>Total</span>
          <span data-summary-total></span>
        </div>
        <!-- Olto ships in the US only. Quiet by design: geo-IP resolves this
             for almost everyone, but it is the one field the CRM splits US from
             international on (webflow_submissions.country) and the visitor's
             way to correct a bad geo read, so it has to be reachable. -->
        <p class="shipto">
          <span class="shipto_key">Ship to</span>
          <span class="shipto_val">
            <select class="shipto_select" data-country aria-label="Shipping country">
              ${countries
                .map((c) => `<option value="${esc(c.Code)}">${esc(c.Name)}</option>`)
                .join('')}
            </select>
          </span>
        </p>
        <p class="summary_note">Taxes and shipping calculated at checkout</p>
        <div class="config-actions">
          <button type="button" class="config-clear" data-config-reset>Clear configuration</button>
          <!-- Opens IM's Intercom messenger in-page (infinite.js); the href is
               the fallback for a blocked/failed widget. -->
          <a
            class="config-rep"
            data-rep-chat
            href="https://www.infinitemachine.com/contact"
            target="_blank"
            rel="noopener"
          >Talk to a rep</a>
        </div>
      </section>
    </main>

    <footer class="orderbar">
      <div class="orderbar_total">
        <div class="orderbar_amount" data-total>&nbsp;</div>
        <div class="orderbar_meta">
          <span class="orderbar_label" data-total-label>Est. purchase price</span>
          <span class="orderbar_savings" data-total-save hidden></span>
        </div>
      </div>
      <div class="orderbar_actions">
        <button type="button" class="orderbar_save" data-save>Save</button>
        <!-- An anchor, not a button, carrying sf-checkout: im-attribution's
             capture-phase backstop keys on [sf-checkout] and on anchors to the
             checkout host, and it re-stamps a cart built between two
             MutationObserver batches. A JS-only navigation is invisible to it.
             href is kept current by update(). -->
        <a class="orderbar_cta" data-cta sf-checkout="1" href="#" role="button">Order</a>
      </div>
    </footer>

    <!-- Accessory instruction clip (Bunny HLS), same source the live
         configurator plays — modules/accessory-video.js -->
    <div class="leadmodal leadmodal--video" data-video-modal hidden>
      <div class="leadmodal_backdrop" data-video-close></div>
      <div class="vid">
        <div class="vid_head">
          <h3 class="vid_title" data-video-title></h3>
          <button type="button" class="vid_close" data-video-close aria-label="Close video">&times;</button>
        </div>
        <video class="vid_player" data-video-el playsinline controls preload="none"></video>
      </div>
    </div>

    <div class="leadmodal" data-save-modal hidden>
      <div class="leadmodal_backdrop" data-save-close></div>
      <div class="leadmodal_sheet">
        <h3 class="leadmodal_title" data-save-title>Save your design</h3>
        <p class="leadmodal_body" data-save-copy>
          We&rsquo;ll copy a link that rebuilds this exact Olto &mdash; share it or pick
          up where you left off on any device.
        </p>

        <!-- The live Webflow form (#wf-form-Olto-Interest-Form, 203 submissions)
             is MOVED into this slot by src/olto-configurator.js. Moving rather
             than cloning keeps Webflow's bound AJAX handler, and the im_* hidden
             inputs travel with the node. Never re-render its children:
             im-attribution's data-im-stamped latch would not re-stamp it. -->
        <div data-wf-form-slot hidden></div>

        <!-- Fallback for the standalone demo, where no Webflow form exists.
             olto-configurator.js removes this once the real form is adopted. -->
        <form data-save-form novalidate>
          <div class="saveform_row">
            <input class="saveform_field" type="text" name="first_name" placeholder="First name" autocomplete="given-name" />
            <input class="saveform_field" type="text" name="last_name" placeholder="Last name" autocomplete="family-name" />
          </div>
          <input class="saveform_field" type="email" name="email" placeholder="Email" autocomplete="email" inputmode="email" />
          <input class="saveform_field" type="tel" name="phone" placeholder="Phone" autocomplete="tel" inputmode="tel" />
          <p class="saveform_error" data-save-error hidden></p>
          <button type="submit" class="leadmodal_cta">Save my design</button>
        </form>

        <!-- Outside the fallback form on purpose: that form is removed once the
             Webflow form is adopted, and the close affordance must survive. -->
        <button type="button" class="leadmodal_close" data-save-close>Close</button>
        <div data-save-done hidden>
          <h3 class="leadmodal_title">Design saved</h3>
          <p class="leadmodal_body" data-save-done-msg>Link copied to your clipboard.</p>
          <p class="savedone_link" data-save-link></p>
          <button type="button" class="leadmodal_cta modal_cta--alt" data-save-image>
            Download as image
          </button>
          <p class="saveform_error" data-save-image-note hidden></p>
          <button type="button" class="leadmodal_cta" data-save-close>Done</button>
        </div>
      </div>
    </div>

  `;
}

// One consolidated Color section (Aug 26 meeting): Silver anodized is the
// only base finish; every other color — Black included — is a vinyl wrap
// variant of the wrap product. The sub-line carries the "it's a wrap, not
// paint" distinction; the box that used to group the wraps is gone (team
// review, Aug 26 — "do we need this bounding box?"). One ROW of swatches,
// with the price wrapped UNDER each name (Eddie, Aug 26 pm: "simpler one
// row... wrap the text, so have the label be under the name"). Silver's old
// "Ships now" caption read as a contradiction of the August ship date
// ("shipping now?") — it now just says Included.
function buildColorSection(config, variants, wrapVariantsByColor) {
  const silverMeta = variants.find(([, m]) => /silver/i.test(m.color))?.[1];
  const blackMeta = variants.find(([, m]) => /black/i.test(m.color))?.[1];
  const hexes = { ...config.wrapColorMap, Black: blackMeta?.colorHex || '#1c1c1e' };
  const wrapOrder = ['Black', 'Sand', 'Blush', 'Forest', 'Crimson'].filter((c) =>
    wrapVariantsByColor.has(c)
  );
  return `
    <section class="opt opt--color" data-section="color">
      <h2 class="opt_title">Color</h2>
      <p class="opt_sub">Silver anodized finish. Vinyl wrap on top of the aluminum.</p>
      <div class="swatches swatches--labeled">
        <div class="swatch-opt">
          <button
            type="button"
            class="swatch"
            data-color-swatch=""
            style="--swatch: ${esc(silverMeta?.colorHex || '#d7d7d7')}"
            aria-label="Silver"
          ></button>
          <div class="swatch_name">Silver</div>
          <div class="swatch_sub">Included</div>
        </div>
        ${wrapOrder
          .map((color) => {
            const price = parseFloat(wrapVariantsByColor.get(color).price.amount);
            return `
        <div class="swatch-opt">
          <button
            type="button"
            class="swatch"
            data-color-swatch="${esc(color)}"
            style="--swatch: ${esc(hexes[color])}"
            aria-label="${esc(color)} vinyl wrap"
          ></button>
          <div class="swatch_name">${esc(color)}</div>
          <div class="swatch_sub">+${formatMoney(price)}</div>
        </div>`;
          })
          .join('')}
      </div>
    </section>
  `;
}

// Bundles: stacked full-width checklist cards. A side-scrolling carousel
// with item thumbs was tried for the Aug 26 team review and rolled back the
// same day — Eddie: "I like the previous bundle thing better. It's simple."
function buildKitsSection(products) {
  return `
    <section class="opt" data-section="bundles">
      <h2 class="opt_title">Bundle</h2>
      <div class="kit-list">
        ${KITS.map((k) => buildKitCard(k, products)).join('')}
      </div>
    </section>
  `;
}

function buildKitCard(kit, products) {
  const value = kit.items.reduce((sum, h) => {
    const v = firstVariant(products.accessories.find((p) => p.handle === h));
    return sum + (v ? parseFloat(v.price.amount) : 0);
  }, 0);
  const save = value - kit.price;
  const names = kit.items.map((h) => {
    const p = products.accessories.find((a) => a.handle === h);
    return productTitle(h, p?.title).replace(/^Olto /, '');
  });
  // Until the Shopify discount exists, the bundle costs the sum of its parts —
  // so that is what the card says. No tier price, no strikethrough, no saving.
  const shown = BUNDLE_DISCOUNT_LIVE ? kit.price : value;
  const pricing = kit.items.length
    ? `<div class="kit_price">+${formatMoney(shown)}</div>
       ${
         BUNDLE_DISCOUNT_LIVE && save > 0
           ? `<div class="kit_save"><s>${formatMoney(value)}</s> Save ${formatMoney(save)}</div>`
           : ''
       }`
    : '';
  return `
    <button type="button" class="kit" data-bundle="${esc(kit.key)}">
      ${kit.popular ? '<span class="kit_chip">Most popular</span>' : ''}
      <div class="kit_top">
        <div class="kit_id">
          <div class="kit_name">${esc(kit.label)}</div>
          <div class="kit_tagline">${esc(kit.tagline)}</div>
        </div>
        <div class="kit_pricing">${pricing}</div>
      </div>
      ${names.length ? `<p class="kit_items">${names.map((n) => esc(n)).join(', ')}</p>` : ''}
    </button>
  `;
}

// Real product options (helmet: size + color — team review, Aug 26, "helmet
// should let you choose size and color when you select"), derived from the
// variants' selectedOptions. The degenerate Title/"Default Title" pair means
// the product has no options.
export function productOptions(product) {
  const opts = new Map(); // name -> ordered unique values
  for (const v of product?.variants || []) {
    for (const o of v.selectedOptions || []) {
      if (o.name === 'Title' && o.value === 'Default Title') continue;
      if (!opts.has(o.name)) opts.set(o.name, []);
      const values = opts.get(o.name);
      if (!values.includes(o.value)) values.push(o.value);
    }
  }
  return [...opts.entries()];
}

// Variant whose selectedOptions agree with every chosen value; sellable
// variants win ties. Falls back to null so callers can use firstVariant.
export function variantForOptions(product, selections) {
  const matches = (product?.variants || []).filter((v) =>
    (v.selectedOptions || []).every(
      (o) => selections[o.name] == null || selections[o.name] === o.value
    )
  );
  return matches.find((v) => v.availableForSale) || matches[0] || null;
}

// Accessory colour chips reuse the bike's own swatch hexes where the names
// agree (config.wrapColorMap covers the wraps, these cover accessory finishes).
// An unmapped colour still renders — it just falls back to the neutral chip, so
// a new Shopify colour is a missing hex, never a missing control.
const ACCESSORY_COLOR_HEX = {
  Black: '#000000',
  Silver: '#D9D9D9',
  White: '#FFFFFF',
};

/**
 * One product option on an accessory card.
 *
 * Colour reads as chips, not a dropdown ("can helmet have color chip" —
 * obodom, Aug 27): a colour you can see beats a colour you have to read. Size
 * stays a select, where the list is what matters.
 *
 * A single-valued option renders nothing at all — Full Face Helmet's only
 * colour is Black, and a one-choice control is a control that asks a question
 * with no answer.
 */
function buildAccessoryOption(p, name, values, defaults) {
  if (values.length < 2) return '';
  const selected = defaults.get(name) ?? values[0];

  if (!/colou?rs?/i.test(name)) {
    return `
        <select class="acc_select" data-acc-option="${esc(name)}" aria-label="${esc(p.title)} ${esc(
      name
    )}">
          ${values
            .map(
              (val) =>
                `<option value="${esc(val)}"${selected === val ? ' selected' : ''}>${esc(
                  val
                )}</option>`
            )
            .join('')}
        </select>`;
  }

  return `
        <div
          class="acc_swatches"
          role="group"
          aria-label="${esc(p.title)} ${esc(name)}"
          data-acc-option="${esc(name)}"
          data-acc-value="${esc(selected)}"
        >
          ${values
            .map(
              (val) => `<button
            type="button"
            class="swatch acc_swatch${selected === val ? ' is-selected' : ''}"
            data-acc-swatch="${esc(val)}"
            style="--swatch: ${esc(ACCESSORY_COLOR_HEX[val] || 'var(--chip)')}"
            title="${esc(val)}"
            aria-label="${esc(val)}"
            aria-pressed="${selected === val ? 'true' : 'false'}"
          ></button>`
            )
            .join('')}
        </div>`;
}

function buildAccessoryCard(p) {
  const v = firstVariant(p);
  if (!v) return '';
  const options = p.variants.length > 1 ? productOptions(p) : [];
  const defaults = new Map((v.selectedOptions || []).map((o) => [o.name, o.value]));
  return `
    <div class="acc" data-acc="${esc(p.handle)}">
      <div class="acc_media">
        <img class="acc_img" src="${esc(imgUrl(p.featuredImage?.url, 240))}" alt="${esc(
    p.title
  )}" loading="lazy" />
        ${
          p.instructionVideo
            ? `<button
                type="button"
                class="acc_play"
                data-acc-play="${esc(p.handle)}"
                aria-label="Watch the ${esc(p.title)} video"
              >${PLAY_ICON}</button>`
            : ''
        }
      </div>
      <div class="acc_info">
        <div class="acc_name">${esc(p.title)}</div>
        <div class="acc_price">${formatMoney(
          parseFloat(v.price.amount),
          v.price.currencyCode
        )}</div>
      </div>
      ${
        options.length
          ? `<div class="acc_opts">${options
              .map(([name, values]) => buildAccessoryOption(p, name, values, defaults))
              .join('')}</div>`
          : ''
      }
      <div class="acc_actions">
        ${
          MULTI_UNIT_ACCESSORIES.has(p.handle)
            ? `<!-- Only meaningful once the item is in the cart; .acc.is-added reveals it -->
        <div class="acc_qty" data-acc-qty>
          <button
            type="button"
            class="acc_qty-btn"
            data-acc-qty-delta="-1"
            aria-label="One fewer ${esc(p.title)}"
          >&minus;</button>
          <span class="acc_qty-value" data-acc-qty-value>1</span>
          <button
            type="button"
            class="acc_qty-btn"
            data-acc-qty-delta="1"
            aria-label="One more ${esc(p.title)}"
          >+</button>
        </div>`
            : ''
        }
        <button type="button" class="acc_btn" data-acc-toggle="${esc(p.handle)}">Add</button>
      </div>
    </div>
  `;
}

export function firstVariant(product) {
  if (!product) return null;
  return product.variants.find((v) => v.availableForSale) || product.variants[0] || null;
}

export function buildSummaryRows(state, config) {
  const rows = [];
  if (state.bikeLine) {
    const color = config.variants[state.baseNumericId]?.color || state.bikeLine.merchandise.title;
    rows.push({
      label: `Olto &middot; ${esc(color)}`,
      amount: parseFloat(state.bikeLine.merchandise.price.amount),
    });
  }
  if (state.wrapLine) {
    rows.push({
      label: `Wrap &middot; ${esc(state.wrapLine.merchandise.title)}`,
      amount: parseFloat(state.wrapLine.merchandise.price.amount),
    });
  }
  for (const l of state.accessoryLines) {
    // Show the per-configuration count and the line's own total, so two helmets
    // read "Open Face Helmet ×2 … $596" rather than a $298 that doesn't add up
    // against the total below it.
    const { handle } = l.merchandise.product;
    const each = state.accessoryQty?.[handle] || 1;
    const title = esc(productTitle(handle, l.merchandise.product.title));
    rows.push({
      label: each > 1 ? `${title} <span class="summary_x">&times;${each}</span>` : title,
      amount: parseFloat(l.merchandise.price.amount) * each,
    });
  }
  if (state.bundleSavings > 0) {
    const kit = KITS.find((k) => k.key === state.activeBundle);
    rows.push({
      label: `${esc(kit?.label || 'Bundle')} discount`,
      amount: -state.bundleSavings / (state.quantity || 1),
      isSaving: true,
    });
  }
  const qtyNote =
    state.quantity > 1
      ? `<div class="summary_qty">&times;${state.quantity} configurations</div>`
      : '';
  return (
    rows
      .map(
        (r) => `
      <div class="summary_row${r.isSaving ? ' summary_row--save' : ''}">
        <span>${r.label}</span>
        <span>${r.isSaving ? '&minus;' : ''}${formatMoney(
          Math.abs(r.amount),
          state.currency
        )}</span>
      </div>`
      )
      .join('') + qtyNote
  );
}
