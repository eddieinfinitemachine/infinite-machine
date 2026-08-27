#!/usr/bin/env node
/**
 * Check the bundle discount amounts against live Shopify prices.
 *
 * The Function in shopify/olto-bundle-discount hardcodes a fixed amount per
 * tier, because a Shopify Function cannot look prices up at runtime. Component
 * prices move, so this recomputes Σ(components) − tier price from the
 * Storefront API and diffs it against what the Function and the UI currently
 * claim. Run it after any price change:
 *
 *   node bin/print-bundle-discounts.mjs
 *
 * Exits non-zero on drift so it can gate a release.
 */
import 'dotenv/config';
import { readFileSync } from 'fs';

const DOMAIN = process.env.SHOPIFY_STORE_DOMAIN;
const TOKEN = process.env.SHOPIFY_STOREFRONT_PUBLIC_TOKEN;
const VERSION = process.env.SHOPIFY_API_VERSION || '2026-04';
if (!DOMAIN || !TOKEN) {
  console.error('Missing SHOPIFY_STORE_DOMAIN / SHOPIFY_STOREFRONT_PUBLIC_TOKEN (see .env)');
  process.exit(2);
}

// Parsed from the UI rather than duplicated — ui.js is the source of truth for
// what the customer is shown, and drift between the two is the bug this catches.
const ui = readFileSync('src/infinite/ui.js', 'utf8');
const kitsBlock = ui.slice(ui.indexOf('export const KITS'));
const kits = [...kitsBlock.matchAll(/label:\s*'([^']+)'[\s\S]*?price:\s*(\d+)[\s\S]*?items:\s*\[([\s\S]*?)\]/g)].map(
  (m) => ({ label: m[1], price: Number(m[2]), items: [...m[3].matchAll(/'([^']+)'/g)].map((x) => x[1]) })
);

// And the amounts the deployed Function will actually take off.
const fn = readFileSync('shopify/olto-bundle-discount/src/cart_lines_discounts_generate_run.js', 'utf8');
const fnAmounts = Object.fromEntries(
  [...fn.matchAll(/title:\s*"Olto (\w+) bundle",\s*products:[^,]+,\s*amount:\s*"([\d.]+)"/g)].map((m) => [
    m[1].toLowerCase(),
    Number(m[2]),
  ])
);

const handles = [...new Set(kits.flatMap((k) => k.items))];
const query = `{${handles
  .map((h, i) => `p${i}: product(handle:"${h}"){ handle variants(first:5){edges{node{price{amount} availableForSale}}} }`)
  .join(' ')}}`;

const res = await fetch(`https://${DOMAIN}/api/${VERSION}/graphql.json`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', 'X-Shopify-Storefront-Access-Token': TOKEN },
  body: JSON.stringify({ query }),
});
const json = await res.json();
if (json.errors) {
  console.error('Storefront error:', json.errors.map((e) => e.message).join('; '));
  process.exit(1);
}

const price = {};
for (const p of Object.values(json.data)) {
  if (!p) continue;
  // Same rule as firstVariant() in ui.js.
  const vs = p.variants.edges.map((e) => e.node);
  const pick = vs.find((v) => v.availableForSale) || vs[0];
  if (pick) price[p.handle] = Number(pick.price.amount);
}

let drift = 0;
console.log(`\n${'Bundle'.padEnd(16)}${'components'.padStart(12)}${'tier'.padStart(8)}${'should be'.padStart(12)}${'function'.padStart(11)}`);
for (const kit of kits) {
  const missing = kit.items.filter((h) => !(h in price));
  const sum = kit.items.reduce((s, h) => s + (price[h] || 0), 0);
  const should = sum - kit.price;
  const key = kit.label.replace(/^Olto /, '').toLowerCase();
  const have = fnAmounts[key];
  const ok = have !== undefined && Math.abs(have - should) < 0.005;
  if (!ok) drift += 1;
  console.log(
    `${kit.label.padEnd(16)}${('$' + sum.toFixed(0)).padStart(12)}${('$' + kit.price).padStart(8)}` +
      `${('-$' + should.toFixed(0)).padStart(12)}${(have === undefined ? 'MISSING' : '-$' + have.toFixed(0)).padStart(11)}` +
      `${ok ? '' : '   <== DRIFT'}`
  );
  if (missing.length) {
    drift += 1;
    console.log(`${''.padEnd(16)}not in Shopify: ${missing.join(', ')}`);
  }
}

if (drift) {
  console.error(
    `\n${drift} tier(s) out of sync. Update TIERS in ` +
      'shopify/olto-bundle-discount/src/cart_lines_discounts_generate_run.js, re-run its tests, ' +
      'then `shopify app deploy`.\n'
  );
  process.exit(1);
}
console.log('\nAll tiers match the deployed amounts.\n');
