// Olto configurator recipe.
// Anything that's purely product data lives in Shopify (fetched at runtime).
// Anything keyed by product handle here is a behavioral overlay — rules the
// configurator's JS logic needs that don't belong in Shopify.

export default {
  id: 'olto',

  // Flow definition — the ONLY place step order / numbering / structure is
  // declared. lib/flow.js builds the entire right-hand column from this list:
  // each entry becomes a step block inside [data-flow="steps"], in this order;
  // the sticky bottom bar (total + action button) is built into
  // [data-flow="actions"]. Add / insert / reorder / rename a step by editing
  // this array — no Webflow work needed. Every step is collapsible and collapsed
  // by default. Per-step flags:
  //   validation  — show the "Response Required" line in the head (location/forms)
  //   startOpen   — expand this step on load instead of collapsed
  steps: [
    { type: 'location', no: '01', title: 'Location', validation: true, collapsible: false },
    { type: 'variant', no: '02', title: 'Base' },
    { type: 'wrap', no: '03', title: 'Wrap' },
    { type: 'bundle', no: '04', title: 'Accessory Pack' },
    { type: 'accessories', no: '05', title: 'Configure your Accessories' },
    { type: 'quantity', no: '06', title: 'Quantity' },
    // The interest/save form is a standalone Webflow modal ([data-modal-name="interest"]),
    // opened by primary-action.js — not a step in this flow.
  ],

  // Main product (queried by handle, not ID — handles survive product re-creation)
  product: { handle: 'olto-1' },

  // Accessory list — drag-drop ordered in Shopify
  accessoriesCollection: 'olto-accessories',

  // TEMP (testing) — fallback instruction-video used for every accessory that
  // doesn't yet have its own `custom.instruction_video` metafield. Remove once
  // the real Bunny clips are uploaded per accessory.
  testInstructionVideo:
    'https://vz-19725589-529.b-cdn.net/a4c98a2a-412b-4e2e-a2ce-4e9a64123464/playlist.m3u8',

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
    44842879156380: {
      color: 'Black',
      colorHex: '#000000',
      delivery: 'July 2026',
      backgroundImage:
        'https://cdn.prod.website-files.com/66856cd71d6df6db1cada051/68ff73905e7daa5ef224c5d5_olto-eu-black.avif',
    },
    44842879123612: {
      color: 'Silver',
      colorHex: '#D9D9D9',
      delivery: 'August 2026',
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
