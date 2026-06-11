// Probe possible metaobject type names. Storefront API has no "list all types"
// endpoint, so we try several variants. Also tries fetching by handle to
// check if individual access works while listing doesn't (would indicate
// the "Storefront access" toggle is off on the definition).

import 'dotenv/config';
import { createStorefrontApiClient } from '@shopify/storefront-api-client';

const client = createStorefrontApiClient({
  storeDomain: process.env.SHOPIFY_STORE_DOMAIN,
  apiVersion: process.env.SHOPIFY_API_VERSION || '2026-04',
  publicAccessToken: process.env.SHOPIFY_STOREFRONT_PUBLIC_TOKEN,
});

const TYPE_CANDIDATES = [
  'olto_bundle',
  'olto-bundle',
  'oltobundle',
  'bundle',
  'olto_bundles',
  'olto_pack',
  'olto_preset',
  'configurator_bundle',
];

console.log('Probing metaobject types...\n');

for (const type of TYPE_CANDIDATES) {
  const query = `
    query Probe($type: String!) {
      metaobjects(type: $type, first: 10) {
        edges { node { id handle type } }
      }
    }
  `;
  const { data, errors } = await client.request(query, { variables: { type } });

  if (errors) {
    console.log(`  ${type.padEnd(28)} ERROR: ${errors[0]?.message || JSON.stringify(errors)}`);
    continue;
  }
  const count = data.metaobjects.edges.length;
  if (count > 0) {
    console.log(`  ${type.padEnd(28)} ✓ ${count} object(s) FOUND`);
    data.metaobjects.edges.forEach(({ node }) => {
      console.log(`      ${node.handle} (${node.type})`);
    });
  } else {
    console.log(`  ${type.padEnd(28)} ✗ 0`);
  }
}

console.log('\nIf all returned 0:');
console.log('  → Open Shopify admin → Content → Metaobjects → click "Olto Bundle" definition');
console.log('  → Look for "Storefront API access" setting');
console.log('  → Toggle it ON (or set "Storefront access" → "Read"), save');
console.log('  → Re-run this script\n');
