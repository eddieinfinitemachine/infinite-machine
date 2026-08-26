// Pure HTML builders for the Tesla-style page. No state, no listeners —
// tesla.js renders this once, then mutates the dynamic bits in update().

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

// Payment plans — Tesla-style Cash / Lease / Finance toggle.
// Finance mirrors the ClarityPay Tier 1 48-month offer (15.99% APR w/ AutoPay,
// proposal dated 2026-08-21); no financing is live on the store yet, so figures
// remain estimates. Lease is still ILLUSTRATIVE — no lease program exists.
export const PAYMENT_PLANS = {
  finance: { months: 48, apr: 0.1599 },
  lease: { months: 24, residualPct: 0.35 },
};

// What the order bar + Payment section show for a given mode.
export function paymentFigures(total, currency, mode) {
  if (mode === 'finance') {
    const { months, apr } = PAYMENT_PLANS.finance;
    const r = apr / 12;
    const monthly = r > 0 ? (total * r) / (1 - (1 + r) ** -months) : total / months;
    return {
      amount: monthly,
      suffix: '/mo',
      label: 'Est. finance payment',
      sub: `${months} monthly payments of ${formatMoney(monthly, currency)} at ${(
        apr * 100
      ).toFixed(2)}% APR. Estimate for illustration — payment options appear at checkout.`,
    };
  }
  if (mode === 'lease') {
    const { months, residualPct } = PAYMENT_PLANS.lease;
    const monthly = (total * (1 - residualPct)) / months;
    return {
      amount: monthly,
      suffix: '/mo',
      label: 'Est. lease payment',
      sub: `${months}-month term, ${Math.round(
        residualPct * 100
      )}% residual. Estimate for illustration.`,
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
// TODO(eddie): Cargo/Max tier prices are placeholders — confirm. The meeting
// also wanted the cover in bundles; no sellable cover product exists yet.
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
      'open-face-helmet',
      'bottom-cover',
    ],
  },
  {
    key: 'cargo',
    label: 'Olto Cargo',
    tagline: 'Carry everything.',
    price: 700,
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
    price: 950,
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

// TODO(eddie): confirm spec figures for the stat row
const STATS = [
  { value: '40 mi', label: 'Range (est.)' },
  { value: '20 mph', label: 'Top Speed' },
  { value: 'Class 2', label: 'E-bike' },
];

// Adapted from modules/price-display.js formatMoney — cents shown only when
// they exist (Tesla-style "$3,495", not "$3,495.00").
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
  const { months, apr } = PAYMENT_PLANS.finance;
  const monthlyRate = apr / 12;
  const monthlyFrom = Math.round((basePrice * monthlyRate) / (1 - (1 + monthlyRate) ** -months));

  return `
    <header class="topbar">
      <div class="topbar_mark">${WORDMARK_SVG}</div>
    </header>

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
      <div class="sheet_handle" aria-hidden="true"></div>

      <section class="intro">
        <h1 class="intro_title">${OLTO_WORDMARK_SVG}</h1>
        <p class="intro_delivery" data-delivery></p>
        <p class="intro_price">From ${formatMoney(basePrice)} · or ${formatMoney(
    monthlyFrom
  )}/mo financing</p>
        <div class="stats">
          ${STATS.map(
            (s) => `
            <div class="stats_item">
              <div class="stats_value">${esc(s.value)}</div>
              <div class="stats_label">${esc(s.label)}</div>
            </div>`
          ).join('')}
        </div>
      </section>

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

      <section class="opt" data-section="payment">
        <h2 class="opt_title">Payment</h2>
        <div class="paytoggle">
          <button type="button" class="paytoggle_btn" data-pay-mode="cash">Cash</button>
          <button type="button" class="paytoggle_btn" data-pay-mode="lease">Lease</button>
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
        <p class="summary_note">Taxes and shipping calculated at checkout</p>
        <button type="button" class="config-clear" data-config-reset>Clear configuration</button>
      </section>
    </main>

    <footer class="orderbar">
      <div class="orderbar_total">
        <div class="orderbar_amount" data-total>&nbsp;</div>
        <div class="orderbar_label" data-total-label>Est. purchase price</div>
      </div>
      <div class="orderbar_actions">
        <button type="button" class="orderbar_save" data-save>Save</button>
        <button type="button" class="orderbar_cta" data-cta>Order</button>
      </div>
    </footer>

    <aside class="nudge" data-nudge hidden>
      <button type="button" class="nudge_close" data-nudge-close aria-label="Dismiss">&times;</button>
      <p class="nudge_title">Don&rsquo;t lose your design</p>
      <p class="nudge_body">Save it to share or finish later &mdash; or talk it through with an IM rep.</p>
      <div class="nudge_actions">
        <button type="button" class="nudge_save" data-save>
          Save my design
        </button>
        <a
          class="nudge_rep"
          href="https://www.infinitemachine.com/contact"
          target="_blank"
          rel="noopener"
        >
          Talk to a rep
        </a>
      </div>
    </aside>

    <div class="modal" data-interest hidden>
      <div class="modal_backdrop" data-interest-close></div>
      <div class="modal_sheet">
        <h3 class="modal_title">Not in your region yet</h3>
        <p class="modal_body">
          Olto is currently available in the United States and Canada. Register your
          interest and we&rsquo;ll let you know when Olto reaches you.
        </p>
        <a class="modal_cta" href="https://www.infinitemachine.com" target="_blank" rel="noopener">
          Visit infinitemachine.com
        </a>
        <button type="button" class="modal_close" data-interest-close>Close</button>
      </div>
    </div>

    <div class="modal" data-save-modal hidden>
      <div class="modal_backdrop" data-save-close></div>
      <div class="modal_sheet">
        <form data-save-form novalidate>
          <h3 class="modal_title">Save your design</h3>
          <p class="modal_body">
            We&rsquo;ll copy a link that rebuilds this exact Olto &mdash; share it or pick
            up where you left off on any device.
          </p>
          <input class="saveform_field" type="text" name="name" placeholder="Name" autocomplete="name" />
          <input class="saveform_field" type="email" name="email" placeholder="Email" autocomplete="email" inputmode="email" />
          <input class="saveform_field" type="tel" name="phone" placeholder="Phone" autocomplete="tel" inputmode="tel" />
          <p class="saveform_error" data-save-error hidden></p>
          <button type="submit" class="modal_cta">Save my design</button>
          <button type="button" class="modal_close" data-save-close>Close</button>
        </form>
        <div data-save-done hidden>
          <h3 class="modal_title">Design saved</h3>
          <p class="modal_body" data-save-done-msg>Link copied to your clipboard.</p>
          <p class="savedone_link" data-save-link></p>
          <button type="button" class="modal_cta" data-save-close>Done</button>
        </div>
      </div>
    </div>

  `;
}

// One consolidated Color section (Aug 26 meeting): Silver anodized is the
// only base finish; every other color — Black included — is a vinyl wrap
// variant of the wrap product. The sub-line is the "it's a wrap, not paint"
// distinction Eddie asked for.
function buildColorSection(config, variants, wrapVariantsByColor) {
  const silverMeta = variants.find(([, m]) => /silver/i.test(m.color))?.[1];
  const blackMeta = variants.find(([, m]) => /black/i.test(m.color))?.[1];
  const hexes = { ...config.wrapColorMap, Black: blackMeta?.colorHex || '#1c1c1e' };
  const wrapOrder = ['Black', 'Sand', 'Blush', 'Forest', 'Crimson'].filter((c) =>
    wrapVariantsByColor.has(c)
  );
  return `
    <section class="opt" data-section="color">
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
          <div class="swatch_sub">Ships now</div>
        </div>
        <div class="swatch-box">
          <div class="swatch-box_label">Vinyl wrap</div>
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
      </div>
    </section>
  `;
}

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
    return (p?.title || h).replace(/^Olto /, '');
  });
  const pricing = kit.items.length
    ? `<div class="kit_price">+${formatMoney(kit.price)}</div>
       ${
         save > 0
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
      ${
        names.length
          ? `<div class="kit_items">${names
              .map((n) => `<span class="kit_item">${esc(n)}</span>`)
              .join('')}</div>`
          : ''
      }
    </button>
  `;
}

function buildAccessoryCard(p) {
  const v = firstVariant(p);
  if (!v) return '';
  return `
    <div class="acc" data-acc="${esc(p.handle)}">
      <img class="acc_img" src="${esc(imgUrl(p.featuredImage?.url, 240))}" alt="${esc(
    p.title
  )}" loading="lazy" />
      <div class="acc_info">
        <div class="acc_name">${esc(p.title)}</div>
        <div class="acc_price">${formatMoney(
          parseFloat(v.price.amount),
          v.price.currencyCode
        )}</div>
      </div>
      <button type="button" class="acc_btn" data-acc-toggle="${esc(p.handle)}">Add</button>
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
    rows.push({
      label: esc(l.merchandise.product.title),
      amount: parseFloat(l.merchandise.price.amount),
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
      <div class="summary_row">
        <span>${r.label}</span>
        <span>${formatMoney(r.amount, state.currency)}</span>
      </div>`
      )
      .join('') + qtyNote
  );
}
