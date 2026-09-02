#!/usr/bin/env node
/**
 * Create (idempotently) the three Olto bundle discount codes.
 *
 * Why codes and not the Shopify Function: an app-owned automatic discount can
 * only be created by the app that OWNS the function, and olto-bundles has no
 * backend to authenticate as. Native code discounts have no such ownership —
 * which is exactly how infinite-machine-ambassadors creates referral codes
 * (src/lib/shopify.ts createDiscountCode), with the same Admin token.
 *
 * The configurator applies the matching code to the cart when a bundle's
 * component set matches exactly, and clears it otherwise. Shopify then holds
 * the real money, and src/infinite/state.js reads the applied amount back off
 * the cart — so the page can only ever show a saving the store actually gave.
 *
 * The trade-off vs the Function: a code cannot enforce "exact set" server-side.
 * The mitigation is the one ambassadors already uses — a subtotal minimum, here
 * set to base + the tier's components, so the code is worthless unless you have
 * effectively bought the bundle anyway.
 *
 *   SHOPIFY_STORE=… SHOPIFY_ADMIN_TOKEN=… node bin/create-bundle-discounts.mjs [--apply]
 */
import 'dotenv/config';
import { readFileSync } from 'fs';

const STORE = process.env.SHOPIFY_STORE || 'hcqrd2-n1.myshopify.com';
const TOKEN = process.env.SHOPIFY_ADMIN_TOKEN || process.env.SHOPIFY_ACCESS_TOKEN;
const APPLY = process.argv.includes('--apply');
const UPDATE = process.argv.includes('--update');
if (!TOKEN) { console.error('Need SHOPIFY_ADMIN_TOKEN (write_discounts)'); process.exit(2); }

const admin = async (query, variables) => {
  const r = await fetch(`https://${STORE}/admin/api/2025-07/graphql.json`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-Shopify-Access-Token': TOKEN },
    body: JSON.stringify({ query, variables }),
  });
  const j = await r.json();
  if (j.errors?.length) throw new Error(j.errors.map((e) => e.message).join('; '));
  return j.data;
};

// Kit contents come from the UI, so the codes cannot drift from what is shown.
const ui = readFileSync('src/infinite/ui.js', 'utf8');
const block = ui.slice(ui.indexOf('export const KITS'));
const KITS = [...block.matchAll(/key:\s*'(\w+)'[\s\S]*?label:\s*'([^']+)'[\s\S]*?price:\s*(\d+)[\s\S]*?items:\s*\[([\s\S]*?)\]/g)].map((m) => ({
  key: m[1], label: m[2], price: Number(m[3]),
  items: [...m[4].matchAll(/'([^']+)'/g)].map((x) => x[1]),
}));

const handles = [...new Set(KITS.flatMap((k) => k.items)), 'olto-1'];
const q = `{${handles.map((h, i) => `p${i}: productByHandle(handle:"${h}"){ id handle variants(first:5){edges{node{price availableForSale}}} }`).join(' ')}}`;
const products = Object.values(await admin(q)).filter(Boolean);
const byHandle = Object.fromEntries(products.map((p) => [p.handle, p]));
const priceOf = (h) => {
  const vs = byHandle[h].variants.edges.map((e) => e.node);
  return Number((vs.find((v) => v.availableForSale) || vs[0]).price);
};
const BASE = priceOf('olto-1');

// The existing target list comes back too: the update path has to REMOVE
// products that have left the kit, not just add new ones. Without
// productsToRemove a handle dropped from KITS stays targeted by the code
// forever, silently, because productsToAdd is a no-op for it.
const FIND = `query($q:String!){ codeDiscountNodeByCode(code:$q){ id codeDiscount{ ...on DiscountCodeBasic{ title status
  customerGets{ items{ ...on DiscountProducts { products(first:50){ nodes{ id handle } } } } } } } } }`;
const CREATE = `mutation($d: DiscountCodeBasicInput!){ discountCodeBasicCreate(basicCodeDiscount:$d){ codeDiscountNode{id} userErrors{field message} } }`;

for (const kit of KITS) {
  const components = kit.items.reduce((s, h) => s + priceOf(h), 0);
  const amount = components - kit.price;
  // Shopify evaluates minimumRequirement against the subtotal of the TARGETED
  // products, not the cart — a base+components minimum can never be met and the
  // code silently reports applicable:false. Verified on a live cart.
  // Set to the component sum, so the code needs that much of the bundle's own
  // products in the cart before it does anything.
  const minimum = components;
  const code = `OLTO-${kit.key.toUpperCase()}-BUNDLE`;

  const existing = await admin(FIND, { q: code });
  if (existing.codeDiscountNodeByCode) {
    if (!UPDATE) {
      console.log(`  ${code.padEnd(24)} exists  (${existing.codeDiscountNodeByCode.codeDiscount.status})`);
      continue;
    }
    const current = existing.codeDiscountNodeByCode.codeDiscount.customerGets?.items?.products?.nodes ?? [];
    const want = kit.items.map((h) => byHandle[h].id);
    const stale = current.filter((n) => !kit.items.includes(n.handle)).map((n) => n.id);
    await admin(
      `mutation($id:ID!,$d:DiscountCodeBasicInput!){discountCodeBasicUpdate(id:$id,basicCodeDiscount:$d){userErrors{field message}}}`,
      {
        id: existing.codeDiscountNodeByCode.id,
        d: {
          minimumRequirement: { subtotal: { greaterThanOrEqualToSubtotal: String(minimum) } },
          customerGets: {
            value: { discountAmount: { amount: String(amount), appliesOnEachItem: false } },
            items: { products: { productsToAdd: want, productsToRemove: stale } },
          },
        },
      }
    );
    console.log(
      `  ${code.padEnd(24)} updated  -$${amount}  min $${minimum}` +
        (stale.length ? `  (removed ${stale.length} stale target${stale.length > 1 ? 's' : ''})` : '')
    );
    continue;
  }
  console.log(`  ${code.padEnd(24)} -$${amount}  min $${minimum}  ${APPLY ? '' : '(dry run)'}`);
  if (!APPLY) continue;

  const d = await admin(CREATE, {
    d: {
      title: `${kit.label} bundle`,
      code,
      startsAt: new Date().toISOString(),
      // PRODUCT class (customerGets targets specific products) so it still
      // combines with the ORDER-class referral and employee codes. Two
      // ORDER-class discounts would refuse to stack.
      combinesWith: { orderDiscounts: true, shippingDiscounts: true, productDiscounts: false },
      minimumRequirement: { subtotal: { greaterThanOrEqualToSubtotal: String(minimum) } },
      customerGets: {
        value: { discountAmount: { amount: String(amount), appliesOnEachItem: false } },
        items: { products: { productsToAdd: kit.items.map((h) => byHandle[h].id) } },
      },
      customerSelection: { all: true },
      appliesOncePerCustomer: false,
    },
  });
  const errs = d.discountCodeBasicCreate.userErrors;
  if (errs.length) { console.error('   !!', JSON.stringify(errs)); process.exit(1); }
  console.log(`   created ${d.discountCodeBasicCreate.codeDiscountNode.id}`);
}
