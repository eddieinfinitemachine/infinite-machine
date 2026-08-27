import { strict as assert } from "node:assert";
import { test } from "node:test";
import { cartLinesDiscountsGenerateRun as run } from "../src/cart_lines_discounts_generate_run.js";

// Mirrors KITS in src/infinite/ui.js. If a kit's contents change there, this
// file and the Function must move with it — the configurator advertises
// exactly what the Function takes off.
const line = (product, id) => ({
  id: `gid://shopify/CartLine/${id}`,
  quantity: 1,
  merchandise: { __typename: "ProductVariant", product: { id: product } },
});
const cart = (products) => ({
  cart: { lines: products.map((p, i) => line(p, String(i))) },
  discount: { discountClasses: ["PRODUCT"] },
});
const candidate = (out) => out.operations[0]?.productDiscountsAdd.candidates[0];
const amount = (out) => candidate(out)?.value.fixedAmount.amount;

const OLTO = "gid://shopify/Product/8376059592860";
const SIDEWALLS = "gid://shopify/Product/8437610938524";
const DOCK = "gid://shopify/Product/8437576302748";
const PHONE = "gid://shopify/Product/8437573255324";
const BOTTLE = "gid://shopify/Product/8437610643612";
const COVER = "gid://shopify/Product/9084586360988";
const CHARGER_BAG = "gid://shopify/Product/8437574729884";
const RACK = "gid://shopify/Product/8437557264540";
const BASKET = "gid://shopify/Product/8437562900636";
const SOFT_BAG = "gid://shopify/Product/8447071944860";
const SIDE_PLATE = "gid://shopify/Product/8437592129692";
const ACC_PLATE = "gid://shopify/Product/8437552840860";
const STAND = "gid://shopify/Product/8437571223708";
const SUPER = "gid://shopify/Product/8437612085404";

const COMMUTER = [SIDEWALLS, DOCK, PHONE, BOTTLE, COVER];
const CARGO = [SIDEWALLS, DOCK, PHONE, CHARGER_BAG, RACK, BASKET, SOFT_BAG, SIDE_PLATE, ACC_PLATE, STAND];
const MAX = [...CARGO, BOTTLE, SUPER];

test("full Commuter set -> -$126", () => {
  const out = run(cart([OLTO, ...COMMUTER]));
  assert.equal(amount(out), "126.00");
  assert.equal(candidate(out).message, "Olto Commuter bundle");
  assert.equal(candidate(out).targets.length, COMMUTER.length);
});

test("full Cargo set -> -$320", () => {
  const out = run(cart([OLTO, ...CARGO]));
  assert.equal(amount(out), "320.00");
  assert.equal(candidate(out).message, "Olto Cargo bundle");
});

test("full Max set -> -$416, the larger tier only (Max contains Cargo)", () => {
  const out = run(cart([OLTO, ...MAX]));
  assert.equal(amount(out), "416.00");
  assert.equal(candidate(out).message, "Olto Max bundle");
  assert.equal(out.operations.length, 1, "never both tiers");
});

test("Max cart must not fall through to Cargo (would under-discount by $96)", () => {
  assert.notEqual(amount(run(cart([OLTO, ...MAX]))), "320.00");
});

test("partial sets never leak", () => {
  assert.deepEqual(run(cart([OLTO, SIDEWALLS])).operations, []);
  assert.deepEqual(run(cart([OLTO, ...COMMUTER.slice(0, 4)])).operations, [], "Commuter minus the cover");
  assert.deepEqual(run(cart([OLTO, ...CARGO.slice(0, 9)])).operations, [], "Cargo minus the stand");
});

test("Commuter is disjoint from Cargo/Max — the cover is only in Commuter", () => {
  // A Cargo cart plus the cover is still Cargo, not Commuter-and-Cargo.
  const out = run(cart([OLTO, ...CARGO, COVER]));
  assert.equal(amount(out), "320.00");
  assert.equal(out.operations.length, 1);
});

test("no machine -> nothing, whatever the accessories", () => {
  assert.deepEqual(run(cart([...MAX])).operations, []);
});

test("a non-PRODUCT discount class run returns nothing", () => {
  assert.deepEqual(
    run({ ...cart([OLTO, ...COMMUTER]), discount: { discountClasses: ["ORDER"] } }).operations,
    []
  );
});
