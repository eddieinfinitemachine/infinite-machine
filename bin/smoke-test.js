import 'dotenv/config';
import { createStorefrontApiClient } from '@shopify/storefront-api-client';

const {
  SHOPIFY_STORE_DOMAIN,
  SHOPIFY_STOREFRONT_PUBLIC_TOKEN,
  SHOPIFY_API_VERSION,
} = process.env;

if (!SHOPIFY_STORE_DOMAIN || !SHOPIFY_STOREFRONT_PUBLIC_TOKEN) {
  console.error('Missing env vars. Check .env file.');
  process.exit(1);
}

const client = createStorefrontApiClient({
  storeDomain: SHOPIFY_STORE_DOMAIN,
  apiVersion: SHOPIFY_API_VERSION || '2024-10',
  publicAccessToken: SHOPIFY_STOREFRONT_PUBLIC_TOKEN,
});

const BIKE_PRODUCT_ID = 'gid://shopify/Product/8376059592860';

const query = `
  query GetProduct($id: ID!) {
    product(id: $id) {
      id
      title
      handle
      availableForSale
      vendor
      productType
      variants(first: 25) {
        edges {
          node {
            id
            title
            availableForSale
            quantityAvailable
            price {
              amount
              currencyCode
            }
            selectedOptions {
              name
              value
            }
          }
        }
      }
    }
  }
`;

console.log(`\nFetching bike product from ${SHOPIFY_STORE_DOMAIN}...\n`);

const { data, errors } = await client.request(query, {
  variables: { id: BIKE_PRODUCT_ID },
});

if (errors) {
  console.error('GraphQL errors:');
  console.error(JSON.stringify(errors, null, 2));
  process.exit(1);
}

if (!data?.product) {
  console.error(`No product found for ID ${BIKE_PRODUCT_ID}`);
  console.error('Possible causes:');
  console.error('  - Product is in draft state (not published to Storefront API)');
  console.error('  - Product ID has changed in Shopify');
  console.error('  - Token does not have unauthenticated_read_product_listings scope');
  process.exit(1);
}

const { product } = data;
console.log('SUCCESS — connected to Storefront API');
console.log('================================================');
console.log(`Title:    ${product.title}`);
console.log(`Handle:   ${product.handle}`);
console.log(`Vendor:   ${product.vendor}`);
console.log(`Type:     ${product.productType}`);
console.log(`For sale: ${product.availableForSale}`);
console.log(`Variants: ${product.variants.edges.length}`);
console.log('');

for (const { node: v } of product.variants.edges) {
  const opts = v.selectedOptions.map((o) => `${o.name}=${o.value}`).join(', ');
  console.log(`  - ${v.title.padEnd(20)} ${v.price.amount} ${v.price.currencyCode}  [${opts}]  ${v.availableForSale ? 'in stock' : 'OUT'}`);
}

console.log('');
console.log('Phase 0 smoke test passed.');
