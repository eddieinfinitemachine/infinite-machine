// Olto configurator recipe.
// Anything that's purely product data lives in Shopify (fetched at runtime).
// Anything keyed by product handle here is a behavioral overlay — rules the
// configurator's JS logic needs that don't belong in Shopify.

export default {
  id: 'olto',

  // Main product (queried by handle, not ID — handles survive product re-creation)
  product: { handle: 'olto-1' },

  // Accessory list — drag-drop ordered in Shopify
  accessoriesCollection: 'olto-accessories',

  // Color wrap (single product with 5 color variants — Custom hex deprecated)
  wrap: {
    productHandle: 'olto-wrap',
  },

  // Bundles — defined as Shopify metaobjects (Content → Metaobjects).
  // Type is the metaobject's Type field (machine name), NOT its Name field.
  bundles: { metaobjectType: 'bundles' },

  // UI metadata per variant — overlay on Shopify variant data. Keyed by
  // variant ID (matches the ?variant= URL param the configurator drives off).
  variants: {
    '44842879156380': {
      color: 'Black',
      colorHex: '#000000',
      delivery: 'June 2026',
      backgroundImage:
        'https://cdn.prod.website-files.com/66856cd71d6df6db1cada051/68ff73905e7daa5ef224c5d5_olto-eu-black.avif',
    },
    '44842879123612': {
      color: 'Silver',
      colorHex: '#D9D9D9',
      delivery: 'July 2026',
      backgroundImage:
        'https://cdn.prod.website-files.com/66856cd71d6df6db1cada051/68ff7390e94ecc537b713a30_olto-eu-silver.avif',
    },
  },
  defaultVariantId: '44842879156380', // Black

  // Wrap color → hex swatch map (Custom uses a rainbow gradient until user picks)
  wrapColorMap: {
    Sand: '#DECEAF',
    Blush: '#F6C6DC',
    Sky: '#707A8D',
    Forest: '#627063',
    Crimson: '#B44C47',
  },

  // Accessory dependencies — when a child is added, the parent must also be added.
  // Keyed by parent handle. requiredBy lists children that pull the parent in.
  // (Wired up by modules/accessory-dependencies.js — added in Phase 1d)
  accessoryDependencies: {
    'olto-rear-rack': {
      requiredBy: ['olto-rear-basket', 'olto-side-mounting-plate'],
    },
  },

  // Image substitution rules — when a combination is selected, swap one
  // product's image (and optionally hide another). Used to show combined-state
  // images like "bag in basket" or "battery plugged into dock".
  // (Wired up by modules/custom-images.js — added in Phase 1d)
  customImageRules: [
    {
      when: ['olto-soft-bag', 'olto-rear-basket'],
      replace: {
        'olto-soft-bag':
          'https://cdn.prod.website-files.com/66856cd71d6df6db1cada051/69219c3d619077ba6f1689ed_Soft%20Bag%20in%20Rear%20Basket.avif',
      },
    },
    {
      when: ['olto-charging-dock', 'olto-battery'],
      replace: {
        'olto-battery':
          'https://cdn.prod.website-files.com/66856cd71d6df6db1cada051/6921a4037d0eab061d3d7ca4_Battery%20Dock%20with%20Battery%20Plugged%20in.avif',
      },
      hide: ['olto-charging-dock'],
    },
  ],
};
