// Tries additional type patterns + a specific-handle query.
// If specific-handle works but list doesn't, that narrows the diagnosis.

import 'dotenv/config';
import { createStorefrontApiClient } from '@shopify/storefront-api-client';

const client = createStorefrontApiClient({
  storeDomain: process.env.SHOPIFY_STORE_DOMAIN,
  apiVersion: process.env.SHOPIFY_API_VERSION || '2026-04',
  publicAccessToken: process.env.SHOPIFY_STOREFRONT_PUBLIC_TOKEN,
});

// Common guesses (incl. namespaced forms that some Shopify apps emit)
const TYPES = [
  'olto_bundle',
  '$app:olto_bundle',
  'app--olto_bundle',
  'custom.olto_bundle',
  'configurator.olto_bundle',
  // capitalization variants — Shopify is supposed to be case-sensitive but worth a try
  'Olto_bundle',
  'OltoBundle',
];

console.log('--- LIST QUERIES ---\n');
for (const type of TYPES) {
  try {
    const { data, errors } = await client.request(
      `query($t: String!) { metaobjects(type: $t, first: 5) { edges { node { id handle type } } } }`,
      { variables: { t: type } }
    );
    if (errors) {
      console.log(`  ${type.padEnd(35)} ERROR: ${errors[0]?.message || 'unknown'}`);
    } else {
      console.log(`  ${type.padEnd(35)} ${data.metaobjects.edges.length} result(s)`);
    }
  } catch (e) {
    console.log(`  ${type.padEnd(35)} EXCEPTION: ${e.message}`);
  }
}

console.log('\n--- HANDLE QUERIES (common bundle naming) ---\n');
// If listing returns 0 but a specific handle works, it means the type exists but
// listing is restricted. (Shouldn't happen, but worth checking.)
const HANDLE_GUESSES = [
  { type: 'olto_bundle', handle: 'commuter' },
  { type: 'olto_bundle', handle: 'commuter-pack' },
  { type: 'olto_bundle', handle: 'cargo' },
  { type: 'olto_bundle', handle: 'cargo-pack' },
  { type: 'olto_bundle', handle: 'family' },
  { type: 'olto_bundle', handle: 'family-pack' },
];

for (const { type, handle } of HANDLE_GUESSES) {
  try {
    const { data, errors } = await client.request(
      `query($h: MetaobjectHandleInput!) { metaobject(handle: $h) { id handle type } }`,
      { variables: { h: { type, handle } } }
    );
    if (errors) {
      console.log(`  ${type}/${handle.padEnd(20)} ERROR: ${errors[0]?.message || 'unknown'}`);
    } else if (data.metaobject) {
      console.log(`  ${type}/${handle.padEnd(20)} ✓ FOUND: ${data.metaobject.id}`);
    } else {
      console.log(`  ${type}/${handle.padEnd(20)} not found (or no access)`);
    }
  } catch (e) {
    console.log(`  ${type}/${handle.padEnd(20)} EXCEPTION: ${e.message}`);
  }
}
