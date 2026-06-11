// Probe what's already in Shopify so we know what to reference dynamically.
// - Lists all collections (so we know if olto-accessories exists or needs creating)
// - Lists tags on the bike + wrap + a sample accessory
// - Lists product handles so the config can reference by handle

import 'dotenv/config';
import { createStorefrontApiClient } from '@shopify/storefront-api-client';

const client = createStorefrontApiClient({
  storeDomain: process.env.SHOPIFY_STORE_DOMAIN,
  apiVersion: process.env.SHOPIFY_API_VERSION || '2026-04',
  publicAccessToken: process.env.SHOPIFY_STOREFRONT_PUBLIC_TOKEN,
});

const query = `
  query Shape {
    collections(first: 50) {
      edges {
        node {
          handle
          title
          productsCount: products(first: 250) {
            edges { node { id handle title tags } }
          }
        }
      }
    }
    bike: product(id: "gid://shopify/Product/8376059592860") { handle title tags productType vendor }
    wrap: product(id: "gid://shopify/Product/8974651228316") { handle title tags productType vendor }
    sampleAccessory: product(id: "gid://shopify/Product/8437573255324") { handle title tags productType vendor }
  }
`;

const { data, errors } = await client.request(query);
if (errors) {
  console.error(JSON.stringify(errors, null, 2));
  process.exit(1);
}

console.log('=== COLLECTIONS ===');
const collections = data.collections.edges.map((e) => e.node);
console.log(`Found ${collections.length} collection(s):\n`);
for (const c of collections) {
  const productCount = c.productsCount.edges.length;
  console.log(`  ${c.handle.padEnd(35)} "${c.title}"  (${productCount} product${productCount === 1 ? '' : 's'})`);
}

console.log('\n=== KEY PRODUCTS ===');
for (const [key, label] of [['bike', 'BIKE'], ['wrap', 'WRAP'], ['sampleAccessory', 'SAMPLE ACCESSORY']]) {
  const p = data[key];
  console.log(`\n${label}:`);
  console.log(`  Handle:       ${p.handle}`);
  console.log(`  Title:        ${p.title}`);
  console.log(`  Product type: ${p.productType}`);
  console.log(`  Vendor:       ${p.vendor}`);
  console.log(`  Tags:         ${p.tags.length ? p.tags.join(', ') : '(none)'}`);
}

console.log('\n=== COLLECTIONS CONTAINING THE BIKE ===');
const bikeId = 'gid://shopify/Product/8376059592860';
const wrapId = 'gid://shopify/Product/8974651228316';
const sampleId = 'gid://shopify/Product/8437573255324';
for (const c of collections) {
  const hasIds = c.productsCount.edges.map((e) => e.node.id);
  const includes = [];
  if (hasIds.includes(bikeId)) includes.push('BIKE');
  if (hasIds.includes(wrapId)) includes.push('WRAP');
  if (hasIds.includes(sampleId)) includes.push('SAMPLE');
  if (includes.length) console.log(`  ${c.handle.padEnd(35)} → ${includes.join(', ')}`);
}

console.log('\nDone.');
