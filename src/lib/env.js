// Build-time injected env vars. Values are substituted by esbuild's `define`
// option in bin/build.js — at runtime these are string literals in the bundle,
// not actual process.env lookups (which don't exist in the browser).

export const env = {
  SHOPIFY_STORE_DOMAIN: process.env.SHOPIFY_STORE_DOMAIN,
  SHOPIFY_STOREFRONT_PUBLIC_TOKEN: process.env.SHOPIFY_STOREFRONT_PUBLIC_TOKEN,
  SHOPIFY_API_VERSION: process.env.SHOPIFY_API_VERSION || '2026-04',
};
