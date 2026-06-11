// Exercises lib/products + lib/cart end-to-end via the real Storefront API.
// Verifies: fetchProducts, cartCreate, cartLinesAdd, cartLinesUpdate (attrs),
// cartLinesRemove, checkoutUrl.

import 'dotenv/config';
import { fetchProducts, findVariantById } from '../src/lib/products.js';
import { createStorefrontApiClient } from '@shopify/storefront-api-client';

// Override the client in lib/client.js — that module uses build-time env that
// hasn't been substituted in this Node-side smoke test, so we wire a fresh one.
const client = createStorefrontApiClient({
  storeDomain: process.env.SHOPIFY_STORE_DOMAIN,
  apiVersion: process.env.SHOPIFY_API_VERSION || '2026-04',
  publicAccessToken: process.env.SHOPIFY_STOREFRONT_PUBLIC_TOKEN,
});

const oltoConfig = (await import('../src/configs/olto.js')).default;

// --- 1. Fetch products via lib/products ---
console.log('[1/5] fetchProducts(oltoConfig)...');
// Note: this uses lib/client which reads process.env directly — same vars at
// runtime in Node so it Just Works without needing build-time substitution.
const products = await fetchProducts(oltoConfig);
console.log(`      Main: ${products.main.title} (${products.main.variants.length} variants)`);
console.log(`      Wrap: ${products.wrap?.title} (${products.wrap?.variants.length} variants)`);
console.log(`      Accessories: ${products.accessories.length} products`);

// --- 2. Create a cart directly via API ---
console.log('\n[2/5] cartCreate...');
const CART_FIELDS = `
  id checkoutUrl totalQuantity
  cost { totalAmount { amount currencyCode } }
  lines(first: 10) {
    edges {
      node {
        id quantity
        attributes { key value }
        merchandise { ... on ProductVariant { id title product { title } } }
      }
    }
  }
`;
const create = await client.request(`
  mutation { cartCreate(input: {}) { cart { ${CART_FIELDS} } userErrors { field message } } }
`);
const cart = create.data.cartCreate.cart;
console.log(`      Cart: ${cart.id}`);
console.log(`      Checkout: ${cart.checkoutUrl}`);

// --- 3. Add a line (the Black bike) + an accessory with a config_id attr ---
console.log('\n[3/5] cartLinesAdd...');
const bikeVariant = products.main.variants.find((v) => v.selectedOptions.find((o) => o.value === 'Black'));
const accessory = products.accessories[0];
const accessoryVariant = accessory.variants[0];
const configId = 'cfg_smoke_001';

const add = await client.request(
  `mutation AddLines($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart { ${CART_FIELDS} }
      userErrors { field message }
    }
  }`,
  {
    variables: {
      cartId: cart.id,
      lines: [
        { merchandiseId: bikeVariant.id, quantity: 1, attributes: [{ key: '_config_id', value: configId }] },
        { merchandiseId: accessoryVariant.id, quantity: 1, attributes: [{ key: '_config_id', value: configId }] },
      ],
    },
  }
);
const afterAdd = add.data.cartLinesAdd.cart;
console.log(`      ${afterAdd.totalQuantity} items, $${afterAdd.cost.totalAmount.amount}`);
afterAdd.lines.edges.forEach(({ node }) => {
  const configAttr = node.attributes.find((a) => a.key === '_config_id')?.value;
  console.log(`        - ${node.merchandise.product.title.padEnd(28)} qty:${node.quantity} cfg:${configAttr}`);
});

// --- 4. Update line attributes (simulate wrap custom hex) ---
console.log('\n[4/5] cartLinesUpdate (add custom-color attribute to first line)...');
const firstLine = afterAdd.lines.edges[0].node;
const update = await client.request(
  `mutation UpdateLines($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart { ${CART_FIELDS} }
      userErrors { field message }
    }
  }`,
  {
    variables: {
      cartId: cart.id,
      lines: [{
        id: firstLine.id,
        attributes: [
          { key: '_config_id', value: configId },
          { key: 'wrap_custom_color', value: '#ABCDEF' },
        ],
      }],
    },
  }
);
const afterUpdate = update.data.cartLinesUpdate.cart;
const updatedLine = afterUpdate.lines.edges.find((e) => e.node.id === firstLine.id).node;
console.log(`      Line attributes now: ${JSON.stringify(updatedLine.attributes)}`);

// --- 5. Remove a line ---
console.log('\n[5/5] cartLinesRemove (remove accessory line)...');
const accessoryLineId = afterUpdate.lines.edges.find((e) => e.node.merchandise.product.title === accessory.title).node.id;
const remove = await client.request(
  `mutation RemoveLines($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart { ${CART_FIELDS} }
      userErrors { field message }
    }
  }`,
  { variables: { cartId: cart.id, lineIds: [accessoryLineId] } }
);
console.log(`      After remove: ${remove.data.cartLinesRemove.cart.totalQuantity} items`);

console.log('\n--- All cart operations succeeded ---');
console.log(`Checkout URL (open this to see the bike in Shopify's checkout):\n  ${cart.checkoutUrl}\n`);
