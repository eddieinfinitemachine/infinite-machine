// Verify tag-based query returns what we expect.

import 'dotenv/config';
import { createStorefrontApiClient } from '@shopify/storefront-api-client';

const client = createStorefrontApiClient({
  storeDomain: process.env.SHOPIFY_STORE_DOMAIN,
  apiVersion: process.env.SHOPIFY_API_VERSION || '2026-04',
  publicAccessToken: process.env.SHOPIFY_STOREFRONT_PUBLIC_TOKEN,
});

const query = `
  query TagQuery($q: String!) {
    products(first: 50, query: $q) {
      edges { node { id handle title tags productType } }
    }
  }
`;

// Test 3 candidate queries
const candidates = [
  'tag:Olto AND tag:accessory',
  'tag:Olto AND tag:vehicle',
  'tag:Olto',
];

// Hard-coded accessory IDs from the live HTML — to compare against
const EXPECTED_ACCESSORY_IDS = new Set([
  '8437552840860', '8437557264540', '8437562900636', '8437564637340',
  '8437566537884', '8437571223708', '8437573255324', '8437574729884',
  '8437576302748', '8437592129692', '8437610643612', '8437610938524',
  '8437612085404', '8437612904604', '8445322494108', '8447071944860',
  '8573107667100',
]);

for (const q of candidates) {
  console.log(`\n=== Query: "${q}" ===`);
  const { data, errors } = await client.request(query, { variables: { q } });
  if (errors) {
    console.error(JSON.stringify(errors, null, 2));
    continue;
  }
  const products = data.products.edges.map((e) => e.node);
  console.log(`Returned ${products.length} product(s)\n`);

  const returnedIds = new Set(products.map((p) => p.id.split('/').pop()));
  const missing = [...EXPECTED_ACCESSORY_IDS].filter((id) => !returnedIds.has(id));
  const extra = [...returnedIds].filter((id) => !EXPECTED_ACCESSORY_IDS.has(id));

  for (const p of products) {
    const numericId = p.id.split('/').pop();
    const inExpected = EXPECTED_ACCESSORY_IDS.has(numericId) ? '✓' : '⚠';
    console.log(`  ${inExpected} ${p.handle.padEnd(35)} ${p.title.padEnd(28)} [${p.tags.join(', ')}]`);
  }

  if (missing.length === 0 && extra.length === 0 && products.length === EXPECTED_ACCESSORY_IDS.size) {
    console.log(`\n  ✅ Exact match — 17 expected accessories returned, no surprises`);
  } else {
    if (missing.length) console.log(`\n  ⚠ Missing ${missing.length} expected accessory ID(s):`, missing);
    if (extra.length) console.log(`  ⚠ Extra ${extra.length} unexpected product ID(s):`, extra);
  }
}
