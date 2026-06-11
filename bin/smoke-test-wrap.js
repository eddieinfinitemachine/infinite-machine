// Inspect wrap product variants — IDs, prices, selectedOptions per color.

import 'dotenv/config';
import { createStorefrontApiClient } from '@shopify/storefront-api-client';

const client = createStorefrontApiClient({
  storeDomain: process.env.SHOPIFY_STORE_DOMAIN,
  apiVersion: process.env.SHOPIFY_API_VERSION || '2026-04',
  publicAccessToken: process.env.SHOPIFY_STOREFRONT_PUBLIC_TOKEN,
});

const { data } = await client.request(`
  query {
    product(handle: "olto-wrap") {
      title
      variants(first: 25) {
        edges {
          node {
            id
            title
            availableForSale
            price { amount currencyCode }
            selectedOptions { name value }
          }
        }
      }
    }
  }
`);

console.log(`Product: ${data.product.title}\n`);
console.log('ID                                                   | Title       | Price | Options');
console.log('-----------------------------------------------------+-------------+-------+----------');
for (const { node: v } of data.product.variants.edges) {
  const opts = v.selectedOptions.map(o => `${o.name}=${o.value}`).join(', ');
  console.log(`${v.id.padEnd(53)} | ${v.title.padEnd(11)} | $${v.price.amount.padEnd(5)} | ${opts}`);
}
