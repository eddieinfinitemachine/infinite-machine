// Entry point the Shopify CLI compiles to WASM. One target: the cart-lines
// discount run. The logic lives next door so it stays plain JS with no
// generated-type imports, which is what lets test/run.test.mjs call it
// directly under `node --test`.
export * from './cart_lines_discounts_generate_run.js';
