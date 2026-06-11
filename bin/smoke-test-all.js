import 'dotenv/config';
import { createStorefrontApiClient } from '@shopify/storefront-api-client';

const {
  SHOPIFY_STORE_DOMAIN,
  SHOPIFY_STOREFRONT_PUBLIC_TOKEN,
  SHOPIFY_API_VERSION,
} = process.env;

const client = createStorefrontApiClient({
  storeDomain: SHOPIFY_STORE_DOMAIN,
  apiVersion: SHOPIFY_API_VERSION || '2026-04',
  publicAccessToken: SHOPIFY_STOREFRONT_PUBLIC_TOKEN,
});

// All product IDs extracted from the live page HTML
const PRODUCT_IDS = {
  bike: '8376059592860',
  wrap: '8974651228316',
  accessories: [
    '8437552840860',
    '8437557264540', // rear rack
    '8437562900636', // basket
    '8437564637340',
    '8437566537884',
    '8437571223708',
    '8437573255324', // phone mount
    '8437574729884',
    '8437576302748', // dock
    '8437592129692',
    '8437610643612',
    '8437610938524',
    '8437612085404',
    '8437612904604',
    '8445322494108',
    '8447071944860', // bag
    '8573107667100',
  ],
};

const allIds = [
  `gid://shopify/Product/${PRODUCT_IDS.bike}`,
  `gid://shopify/Product/${PRODUCT_IDS.wrap}`,
  ...PRODUCT_IDS.accessories.map((id) => `gid://shopify/Product/${id}`),
];

const productsQuery = `
  query GetAllConfiguratorProducts($ids: [ID!]!) {
    nodes(ids: $ids) {
      ... on Product {
        id
        title
        handle
        availableForSale
        productType
        featuredImage {
          url
          altText
        }
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
              image {
                url
              }
            }
          }
        }
      }
    }
  }
`;

const metaobjectsQuery = `
  query GetBundleMetaobjects {
    metaobjects(type: "olto_bundle", first: 20) {
      edges {
        node {
          id
          handle
          type
          fields {
            key
            value
          }
        }
      }
    }
  }
`;

console.log(`\nFetching ${allIds.length} products from ${SHOPIFY_STORE_DOMAIN}...\n`);
const productsStart = Date.now();

const productsResp = await client.request(productsQuery, {
  variables: { ids: allIds },
});

const productsMs = Date.now() - productsStart;

if (productsResp.errors) {
  console.error('GraphQL errors on products query:');
  console.error(JSON.stringify(productsResp.errors, null, 2));
  process.exit(1);
}

const nodes = productsResp.data.nodes;
const missing = nodes.filter((n) => !n);
const products = nodes.filter(Boolean);

console.log(`Products query: ${productsMs}ms — ${products.length} returned, ${missing.length} missing\n`);
console.log('Title                           Variants  Price range     Stock');
console.log('================================================================');

for (const p of products) {
  const variants = p.variants.edges.map((e) => e.node);
  const prices = variants.map((v) => parseFloat(v.price.amount));
  const min = Math.min(...prices).toFixed(2);
  const max = Math.max(...prices).toFixed(2);
  const priceRange = min === max ? `$${min}` : `$${min} - $${max}`;
  const inStock = variants.filter((v) => v.availableForSale).length;
  console.log(
    `${p.title.padEnd(30)}  ${String(variants.length).padStart(3)}      ${priceRange.padEnd(15)} ${inStock}/${variants.length}`
  );
}

if (missing.length > 0) {
  console.log(`\nWARNING: ${missing.length} product(s) returned null — likely draft/archived or wrong ID.`);
  const returnedIds = new Set(products.map((p) => p.id));
  const expectedIds = allIds;
  const missingIds = expectedIds.filter((id) => !returnedIds.has(id));
  console.log('Missing IDs:');
  missingIds.forEach((id) => console.log(`  ${id}`));
}

console.log(`\nQuerying bundle metaobjects (type "olto_bundle")...`);
const metaStart = Date.now();
const metaResp = await client.request(metaobjectsQuery);
const metaMs = Date.now() - metaStart;

if (metaResp.errors) {
  console.log(`Metaobjects query failed (${metaMs}ms):`);
  console.log(JSON.stringify(metaResp.errors, null, 2));
  console.log('(Expected if the "olto_bundle" type does not exist yet in Shopify.)');
} else {
  const bundles = metaResp.data.metaobjects.edges;
  console.log(`Metaobjects query: ${metaMs}ms — ${bundles.length} bundle(s) defined`);
  if (bundles.length === 0) {
    console.log('(No bundles yet — expected. We will create the metaobject definition in Phase 1.)');
  } else {
    bundles.forEach(({ node }) => {
      console.log(`  ${node.handle}:`);
      node.fields.forEach((f) => console.log(`    ${f.key}: ${f.value}`));
    });
  }
}

console.log(`\nTotal time: ${productsMs + metaMs}ms`);
console.log('Phase 1a smoke test complete.');
