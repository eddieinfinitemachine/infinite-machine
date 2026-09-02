/**
 * Olto bundle discount — cart.lines.discounts.generate.run
 *
 * Mirrors KITS in infinite-machine/src/infinite/ui.js. Keep the two in
 * lockstep: the configurator advertises exactly what this Function takes off,
 * and src/infinite/state.js now reads the applied amount back off the cart, so
 * a mismatch shows up as the page quietly dropping the saving rather than
 * lying about it.
 *
 * Amounts = Σ(component list prices) − tier price, at prices verified
 * 2026-08-27. Re-check with `node bin/print-bundle-discounts.mjs` whenever a
 * component price moves.
 *
 *   Commuter  Σ $326    tier $200  → −$126   (cart $3,695)
 *   Cargo     Σ $920    tier $600  → −$320   (cart $4,095)
 *   Max       Σ $1,196  tier $780  → −$416   (cart $4,275)
 *
 * Rules: the machine AND the tier's full component set must be present; the
 * largest matching tier wins; one bundle per cart (the machine's quantity is
 * ignored on purpose — a two-bike order is a sales conversation, not a
 * self-serve bundle).
 *
 * Ordering matters: Max ⊇ Cargo, so Max must be tested first or a Max cart
 * would match Cargo and be under-discounted by $96. Commuter is disjoint from
 * both — it is the only tier containing the Outdoor Cover (bottom-cover).
 */
const OLTO = "gid://shopify/Product/8376059592860";
const P = {
  sidewalls: "gid://shopify/Product/8437610938524",
  chargingDock: "gid://shopify/Product/8437576302748",
  phoneMount: "gid://shopify/Product/8437573255324",
  waterBottle: "gid://shopify/Product/8437610643612",
  bottomCover: "gid://shopify/Product/9084586360988",
  chargerBag: "gid://shopify/Product/8437574729884",
  rearRack: "gid://shopify/Product/8437557264540",
  rearBasket: "gid://shopify/Product/8437562900636",
  sideMountingPlate: "gid://shopify/Product/8437592129692",
  accessoryPlate: "gid://shopify/Product/8437552840860",
  centerStand: "gid://shopify/Product/8437571223708",
  superCharger: "gid://shopify/Product/8437612085404",
};

const COMMUTER = [P.sidewalls, P.chargingDock, P.phoneMount, P.waterBottle, P.bottomCover];
const CARGO = [
  P.sidewalls, P.chargingDock, P.phoneMount, P.chargerBag, P.rearRack,
  P.rearBasket, P.sideMountingPlate, P.accessoryPlate, P.centerStand,
];
const MAX = [...CARGO, P.waterBottle, P.superCharger];

// Largest tier first — see the ordering note above.
// amount = (sum of the tier's component retail prices) - (the tier price shown
// on the page, KITS[].price in src/infinite/ui.js). bin/print-bundle-discounts.mjs
// recomputes both sides and fails loudly when they drift.
//
// 2026-09-02: Soft Bag ($98) removed from Cargo and Max (discontinued), tiers
// dropped $100 each, so Cargo 320 -> 322 and Max 416 -> 418. Commuter's 126 was
// simply WRONG — components $302 - tier $200 = $102, and it had been paying out
// $24 too much on every Commuter cart. Corrected in the same pass.
const TIERS = [
  { title: "Olto Max bundle", products: MAX, amount: "418.00" },
  { title: "Olto Cargo bundle", products: CARGO, amount: "322.00" },
  { title: "Olto Commuter bundle", products: COMMUTER, amount: "102.00" },
];

/** @param {{ cart: { lines: { id: string; quantity: number; merchandise: { __typename: string; product?: { id: string } } }[] }, discount: { discountClasses: string[] } }} input */
export function cartLinesDiscountsGenerateRun(input) {
  const classes = input.discount?.discountClasses ?? [];
  if (classes.length && !classes.includes("PRODUCT")) return { operations: [] };
  const lines = input.cart.lines.filter((l) => l.merchandise.__typename === "ProductVariant" && l.merchandise.product);
  const byProduct = new Map();
  for (const l of lines) {
    const pid = l.merchandise.product.id;
    if (!byProduct.has(pid)) byProduct.set(pid, []);
    byProduct.get(pid).push(l);
  }
  if (!byProduct.has(OLTO)) return { operations: [] };
  const tier = TIERS.find((t) => t.products.every((pid) => byProduct.has(pid)));
  if (!tier) return { operations: [] };
  // One unit of each component carries the discount (the extra Max battery is a plain add-on).
  const targets = tier.products.map((pid) => ({ cartLine: { id: byProduct.get(pid)[0].id, quantity: 1 } }));
  return {
    operations: [
      {
        productDiscountsAdd: {
          selectionStrategy: "FIRST",
          candidates: [
            {
              message: tier.title,
              targets,
              value: { fixedAmount: { amount: tier.amount, appliesToEachItem: false } },
            },
          ],
        },
      },
    ],
  };
}
