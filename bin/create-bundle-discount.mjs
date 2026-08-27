#!/usr/bin/env node
/**
 * Create the automatic discount that runs the Olto bundle Function.
 *
 * Order of operations:
 *   1. node bin/print-bundle-discounts.mjs            # amounts still correct?
 *   2. node --test shopify/olto-bundle-discount/test/*.test.mjs
 *   3. cd shopify && shopify app deploy               # HUMAN: needs the CLI login
 *   4. shopify app function info                      # grab the function id
 *   5. SHOPIFY_STORE=… SHOPIFY_ADMIN_TOKEN=… \
 *        node bin/create-bundle-discount.mjs --function-id <uuid> --apply
 *   6. Flip BUNDLE_DISCOUNT_LIVE in src/infinite/ui.js, rebuild, retag.
 *
 * One discount node covers all three tiers — the Function picks the largest
 * match. The node's title is what the checkout shows; the per-tier wording
 * ("Olto Commuter bundle") comes from the Function's candidate `message`.
 *
 * Without --apply it prints the mutation and changes nothing.
 */
const argv = process.argv;
const fid = argv[argv.indexOf('--function-id') + 1];
if (!argv.includes('--function-id') || !fid || fid.startsWith('--')) {
  console.error('--function-id <uuid> required (from `shopify app function info`)');
  process.exit(2);
}

const MUTATION = `mutation discountAutomaticAppCreate($automaticAppDiscount: DiscountAutomaticAppInput!) {
  discountAutomaticAppCreate(automaticAppDiscount: $automaticAppDiscount) {
    automaticAppDiscount { discountId title status }
    userErrors { field message }
  }
}`;

const variables = {
  automaticAppDiscount: {
    title: 'Olto bundle',
    functionId: fid,
    startsAt: new Date().toISOString(),
    discountClasses: ['PRODUCT'],
    // Referral and lead-offer codes are order-level and must still stack on a
    // bundled cart; no other PRODUCT discount may, or tiers could compound.
    combinesWith: { productDiscounts: false, orderDiscounts: true, shippingDiscounts: true },
  },
};

if (!argv.includes('--apply')) {
  console.log(JSON.stringify({ query: MUTATION, variables }, null, 2));
  console.log('\n(dry run — pass --apply to create it)');
  process.exit(0);
}

const store = process.env.SHOPIFY_STORE;
const token = process.env.SHOPIFY_ADMIN_TOKEN || process.env.SHOPIFY_ACCESS_TOKEN;
if (!store || !token) {
  console.error('--apply needs SHOPIFY_STORE and SHOPIFY_ADMIN_TOKEN (write_discounts)');
  process.exit(2);
}

const res = await fetch(`https://${store}/admin/api/2025-07/graphql.json`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', 'X-Shopify-Access-Token': token },
  body: JSON.stringify({ query: MUTATION, variables }),
});
const json = await res.json();
const out = json?.data?.discountAutomaticAppCreate;
if (json.errors?.length || out?.userErrors?.length) {
  console.error(JSON.stringify(json, null, 2));
  process.exit(1);
}
console.log('Created:', JSON.stringify(out.automaticAppDiscount, null, 2));
console.log('\nNext: verify a Commuter cart is billed $3,695, then flip BUNDLE_DISCOUNT_LIVE.');
