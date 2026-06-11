// Verify olto-accessories collection exists and has the right products.

import 'dotenv/config';
import { createStorefrontApiClient } from '@shopify/storefront-api-client';

const client = createStorefrontApiClient({
  storeDomain: process.env.SHOPIFY_STORE_DOMAIN,
  apiVersion: process.env.SHOPIFY_API_VERSION || '2026-04',
  publicAccessToken: process.env.SHOPIFY_STOREFRONT_PUBLIC_TOKEN,
});

const query = `
  query GetAccessoriesCollection {
    collection(handle: "olto-accessories") {
      handle
      title
      description
      products(first: 50) {
        edges {
          node {
            id
            handle
            title
            availableForSale
            priceRange {
              minVariantPrice { amount currencyCode }
            }
          }
        }
      }
    }
  }
`;

const { data, errors } = await client.request(query);
if (errors) {
  console.error('GraphQL errors:');
  console.error(JSON.stringify(errors, null, 2));
  process.exit(1);
}

if (!data.collection) {
  console.error('Collection "olto-accessories" not found.');
  console.error('Either: (a) handle is different, or (b) collection is not published to Storefront API.');
  process.exit(1);
}

const c = data.collection;
const products = c.products.edges.map((e) => e.node);

console.log(`Collection: "${c.title}" (handle: ${c.handle})`);
console.log(`Products:   ${products.length}\n`);

products.forEach((p, i) => {
  const price = p.priceRange.minVariantPrice;
  const stock = p.availableForSale ? '✓' : '✗';
  console.log(
    `  ${String(i + 1).padStart(2)}. ${stock} ${p.handle.padEnd(35)} ${p.title.padEnd(30)} $${price.amount}`
  );
});

console.log(`\nCollection verified. Ready for Phase 1b.`);
