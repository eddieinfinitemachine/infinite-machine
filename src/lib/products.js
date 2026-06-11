import { client } from './client.js';

// In-memory cache. Subsequent calls in the same page-load return immediately.
const cache = new Map();

const PRODUCT_FIELDS = `
  id
  handle
  title
  description
  availableForSale
  productType
  vendor
  tags
  featuredImage { url altText }
  accessoryEta: metafield(namespace: "custom", key: "accessory_etas") { value }
  collections(first: 10) {
    edges { node { handle title } }
  }
  variants(first: 25) {
    edges {
      node {
        id
        title
        availableForSale
        quantityAvailable
        price { amount currencyCode }
        compareAtPrice { amount currencyCode }
        selectedOptions { name value }
        image { url altText }
      }
    }
  }
`;

export async function fetchProducts(config) {
  if (cache.has(config.id)) return cache.get(config.id);

  const wantsWrap = Boolean(config.wrap?.productHandle);

  const query = `
    query LoadConfigurator(
      $productHandle: String!
      $accessoriesHandle: String!
      ${wantsWrap ? '$wrapHandle: String!' : ''}
    ) {
      main: product(handle: $productHandle) { ${PRODUCT_FIELDS} }
      accessoriesCollection: collection(handle: $accessoriesHandle) {
        title
        handle
        products(first: 50) {
          edges { node { ${PRODUCT_FIELDS} } }
        }
      }
      ${wantsWrap ? `wrap: product(handle: $wrapHandle) { ${PRODUCT_FIELDS} }` : ''}
    }
  `;

  const variables = {
    productHandle: config.product.handle,
    accessoriesHandle: config.accessoriesCollection,
  };
  if (wantsWrap) variables.wrapHandle = config.wrap.productHandle;

  const { data, errors } = await client.request(query, { variables });
  if (errors) throw new Error(`[Products] GraphQL errors: ${JSON.stringify(errors)}`);

  if (!data.main) throw new Error(`[Products] Product not found: ${config.product.handle}`);
  if (!data.accessoriesCollection) throw new Error(`[Products] Collection not found: ${config.accessoriesCollection}`);

  const result = {
    main: normalize(data.main),
    wrap: data.wrap ? normalize(data.wrap) : null,
    accessories: data.accessoriesCollection.products.edges.map((e) => normalize(e.node)),
  };

  cache.set(config.id, result);
  return result;
}

function normalize(p) {
  return {
    id: p.id,
    handle: p.handle,
    title: p.title,
    description: p.description,
    availableForSale: p.availableForSale,
    productType: p.productType,
    vendor: p.vendor,
    tags: p.tags || [],
    featuredImage: p.featuredImage,
    accessoryEta: p.accessoryEta?.value || null,
    collections: (p.collections?.edges || []).map((e) => e.node),
    variants: p.variants.edges.map(({ node: v }) => ({
      id: v.id,
      title: v.title,
      availableForSale: v.availableForSale,
      quantityAvailable: v.quantityAvailable,
      price: v.price,
      compareAtPrice: v.compareAtPrice,
      selectedOptions: v.selectedOptions,
      image: v.image,
    })),
  };
}

// Lookup helpers — used by modules that have a handle/ID and need the full record

export function findProductByHandle(products, handle) {
  if (products.main?.handle === handle) return products.main;
  if (products.wrap?.handle === handle) return products.wrap;
  return products.accessories.find((p) => p.handle === handle) || null;
}

export function findVariantById(products, variantId) {
  const all = [products.main, products.wrap, ...products.accessories].filter(Boolean);
  for (const product of all) {
    const variant = product.variants.find((v) => v.id === variantId);
    if (variant) return { variant, product };
  }
  return null;
}

export function clearProductsCache() {
  cache.clear();
}
