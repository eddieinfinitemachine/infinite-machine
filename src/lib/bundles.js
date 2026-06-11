import { client } from './client.js';

const cache = new Map();

// Fetches all instances of a metaobject type, flattens fields into a plain
// object per bundle: { id, handle, label, products: [{handle,...}], preset_value, ... }
// Returns [] if config.bundles is not defined or if Storefront access is off.

export async function fetchBundles(config) {
  const type = config.bundles?.metaobjectType;
  if (!type) return [];

  if (cache.has(type)) return cache.get(type);

  const query = `
    query GetBundles($type: String!) {
      metaobjects(type: $type, first: 50) {
        edges {
          node {
            id
            handle
            type
            fields {
              key
              value
              type
              reference {
                ... on Product { id handle title featuredImage { url } }
              }
              references(first: 50) {
                edges {
                  node {
                    ... on Product { id handle title featuredImage { url } }
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  const { data, errors } = await client.request(query, { variables: { type } });

  if (errors) {
    console.warn(`[Bundles] GraphQL errors fetching "${type}":`, errors);
    return [];
  }

  const result = data.metaobjects.edges.map(({ node }) => flattenMetaobject(node));
  cache.set(type, result);
  return result;
}

function flattenMetaobject(node) {
  const obj = { id: node.id, handle: node.handle };
  for (const f of node.fields) {
    if (f.references?.edges?.length) {
      // List of references (e.g. products field)
      obj[f.key] = f.references.edges.map((e) => e.node);
    } else if (f.reference) {
      // Single reference
      obj[f.key] = f.reference;
    } else if (f.value != null) {
      // Scalar value (string, number, etc — Shopify returns as string)
      obj[f.key] = f.value;
    }
  }
  return obj;
}

export function clearBundlesCache() {
  cache.clear();
}
