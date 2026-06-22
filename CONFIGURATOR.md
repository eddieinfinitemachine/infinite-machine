# Infinite Machine — Product Configurator

A single JavaScript bundle that powers the interactive "build your bike" configurator
(currently the **Olto**). The customer picks a location, base model, wrap colour,
accessory pack, individual accessories and quantity; the right-hand bar keeps a live
total and routes them either to **checkout** (US/Canada) or to a **"Register your
interest"** form (rest of world).

This document is the single reference for understanding and editing the configurator.
It's written so a developer can make common changes quickly, and so a non-developer
can understand how the pieces fit together.

---

## Table of contents

1. [The big idea](#1-the-big-idea)
2. [Architecture at a glance](#2-architecture-at-a-glance)
3. [The Webflow contract](#3-the-webflow-contract)
4. [Boot sequence](#4-boot-sequence)
5. [Configuration — `configs/olto.js`](#5-configuration--configsoltojs)
6. [The two customer flows](#6-the-two-customer-flows)
7. [The action bar & save/interest form](#7-the-action-bar--saveinterest-form)
8. [Module reference](#8-module-reference)
9. [Common edits (recipes)](#9-common-edits-recipes)
10. [Build & deploy](#10-build--deploy)
11. [Troubleshooting](#11-troubleshooting)
12. [Glossary](#12-glossary)

---

## 1. The big idea

> **Code owns the entire step structure. Webflow only supplies styled building blocks.**

Older versions of this page were hand-built in Webflow, step by step. That made every
change (reorder a step, rename it, add one) a manual Webflow job. Now:

- **Webflow provides** a hidden "parts kit" (one styled copy of each UI piece) plus two
  empty mount points.
- **The JavaScript builds** the whole step column and the bottom bar from a single
  config file (`configs/olto.js`).

So to **add, remove, reorder, or rename a step you edit one array in `olto.js`** — no
Webflow work required. Product data (prices, variants, images, accessories) lives in
**Shopify** and is fetched at runtime.

---

## 2. Architecture at a glance

```
Webflow page                          JavaScript bundle
─────────────                         ─────────────────
[data-configurator="olto"]   ──┐
[data-step="template"] (kit) ──┼──►  configurator.js  (entry: which product?)
[data-flow="steps"]  (mount) ──┤            │
[data-flow="actions"](mount) ──┘            ▼
                                     configurator-init.js  (boot orchestrator)
Shopify (products, variants,                │
prices, accessories, bundles) ──►   ┌───────┴────────┐
                                    ▼                ▼
                              lib/flow.js       lib/templates.js
                          (builds step skeleton  (clones atoms per
                           from config.steps)     Shopify product)
                                    │                │
                                    └───────┬────────┘
                                            ▼
                                 modules/*  (behaviour: selection,
                                 cart, validation, accessories,
                                 price, accordions, drawer …)
```

### Source layout

| Path | What lives here |
|------|-----------------|
| `src/configurator.js` | Entry point. Reads `[data-configurator]`, picks the recipe, boots. |
| `src/configs/olto.js` | **The recipe.** Step order, product handles, variants, bundles, accessory rules. The file you edit most. |
| `src/configs/index.js` | Registry of all recipes (`olto`, future `p1`…). |
| `src/lib/` | Core engine: flow builder, templates, cart, selection, Shopify client, products/bundles fetch, DOM helpers. |
| `src/modules/` | Feature behaviours — one concern each (validation, accordions, accessories, price, cart drawer, etc.). |

### Key principles

- **Config-driven flow.** `config.steps` is the *only* place step order/number/title is declared.
- **Bridge, don't rewrite.** `flow.js` stamps the data-attributes downstream modules expect, so each module stays simple and independent.
- **Attribute-driven, not class-driven.** DOM hooks are custom attributes (`[data-flow]`, `[primary-action]`, `[option-head]`…), so restyling in Webflow never breaks the JS.
- **No ShopyFlow.** The configurator emits no `sf-*` attributes; it owns its cart end-to-end via `lib/cart.js`.

---

## 3. The Webflow contract

The Webflow page must provide exactly three things. Everything else is generated.

### 3.1 The boot marker
```html
<body data-configurator="olto">
```
Tells the bundle which recipe to load. Without it nothing boots (check the console).

### 3.2 The parts kit — `[data-step="template"]`
ONE hidden, fully-styled copy of each UI atom, each tagged under the `data-step="*"`
namespace. `flow.js` clones these to build the real flow, then removes the kit.

| Atom (`data-step="…"`) | Used for |
|------------------------|----------|
| `head` (+ `step`, `title`, `expander`) | The numbered, collapsible step header |
| `countries` | Location dropdown (`#country`) |
| `option` | A generic selectable option (base model, wrap colour) |
| `bundle` | An accessory-pack card |
| `acs` (+ `acs-options`, `acs-option-item`, `acs-play`, etc.) | An accessory card |
| `filters` / `filter-item` | Accessory filter bar |
| `interest-form` | The save / register-interest form (`#wf-form-Olto-Interest-Form`) |
| `total-block` | The live price total |
| `checkout-action` | The bottom-bar button (`[primary-action]`) |
| `loader` | Boot spinner (`.checkout_product-load`) |

> The kit atoms **carry the real layout CSS** (bordered head, option spacing, scroll
> area, sticky bar). The JS clones them so generated steps look correct — bare divs
> would break the layout. **Style here; never hand-build whole steps.**

### 3.3 Two empty mounts
```html
<div data-flow="steps"></div>     <!-- the numbered step column is built into this -->
<div data-flow="actions"></div>   <!-- the sticky bottom bar is built into this -->
```

That's the whole contract. Reorder/rename/add steps in `olto.js`; only touch Webflow
when you need a **new kind** of atom or to restyle an existing one.

---

## 4. Boot sequence

`configurator-init.js → initConfigurator(config)` runs, in order:

1. `forceRevealBaseSection()` — un-hide "Included as standard" items Webflow IX2 leaves collapsed.
2. **`buildFlow(config)`** — builds the entire step skeleton + bottom bar from `config.steps`. Runs first so every module below finds the DOM it expects.
3. `bindWebflowForms()` — re-runs Webflow's form handler so the injected forms submit via AJAX (not a page-reloading GET).
4. `initFormValidation()`, `initLocationFlow()` — pure-DOM modules.
5. **Fetch Shopify** products (+ bundles) → `renderTemplates()` clones the kit atoms per product → `initCart()`.
6. `initSelection()` + `bindUi()` — central state + declarative UI updates.
7. Feature modules (accessories, wrap, bundles, custom images, cart drawer, reset, quantity, price, **primary action**, buy flow).
8. Variant chain (`initVariantObserver` **last**, so all subscribers are registered first).
9. Hide the loader → `"[Configurator] \"olto\" boot complete"`.

If something breaks at boot, that final console line is your checkpoint — if it's
missing, the error above it shows which step threw.

---

## 5. Configuration — `configs/olto.js`

This is the file you'll edit most. Everything that's pure product data lives in Shopify;
this file is the **behavioural overlay** — rules the JS needs that don't belong in Shopify.

### 5.1 `steps` — the flow definition
```js
steps: [
  { type: 'location', no: '01', title: 'Location', validation: true, collapsible: false },
  { type: 'variant',  no: '02', title: 'Base' },
  { type: 'wrap',     no: '03', title: 'Wrap' },
  { type: 'bundle',   no: '04', title: 'Accessory Pack' },
  { type: 'accessories', no: '05', title: 'Configure your Accessories' },
  { type: 'quantity', no: '06', title: 'Quantity' },
  // The save / interest form is added automatically (see §7).
],
```

| Field | Meaning |
|-------|---------|
| `type` | Which builder to use: `location`, `variant`, `wrap`, `bundle`, `accessories`, `quantity`. |
| `no` | The number shown in the step head (`"01"`). |
| `title` | The step heading. |
| `validation` | Show the "Response Required" line in the head (location/forms). |
| `collapsible` | `false` = always open, no chevron (used for Location). Default: collapsible & collapsed. |
| `startOpen` | Expand on load instead of collapsed. |

**Reordering** = move array items. **Renaming** = edit `title`/`no`. **Removing** = delete the line.

### 5.2 Product & catalogue keys
| Key | Purpose |
|-----|---------|
| `product.handle` | Main product, queried by **handle** (survives product re-creation). |
| `accessoriesCollection` | Shopify collection of accessories (drag-drop ordered in Shopify). |
| `wrap.productHandle` | The wrap product (one product, multiple colour variants). |
| `bundles.metaobjectType` | Bundles are Shopify **metaobjects**; this is the machine-name Type. |
| `variants` | Per-variant UI overlay (colour name, hex, delivery date, background image), keyed by variant ID. |
| `defaultVariantId` | Which variant loads first. |
| `wrapColorMap` | Wrap colour name → hex swatch. |

### 5.3 Behaviour rules
- **`accessoryDependencies`** — when a child accessory is added, auto-add its parent (e.g. a rear basket pulls in the rear rack).
- **`customImageRules`** — swap a product image when a combination is selected (e.g. "soft bag *in* rear basket"), optionally hiding another item.
- **`testInstructionVideo`** — *temporary* fallback instruction video used for any accessory that doesn't yet have its own `custom.instruction_video` metafield. **Remove once real Bunny clips are uploaded per accessory.**

---

## 6. The two customer flows

The selected **location** decides the flow (handled by `location-flow.js`):

| Region | Countries | Flow |
|--------|-----------|------|
| **US** | United States, Canada | **Full payment** — configure → bottom-bar **Checkout** → cart drawer → Shopify checkout. |
| **Rest of world** ("eu") | everything else | **Register interest** — the interest form is the last step; bottom-bar button becomes **Submit**. |

The region is detected automatically via geoip (`get.geojs.io`) and can be changed by
the customer from the Location dropdown. Changing it re-runs the region logic everywhere
through the `onRegionChange` subscription.

---

## 7. The action bar & save/interest form

The bottom bar (`[checkout-actions]`, inside `[data-flow="actions"]`) holds the **total**,
the **checkout/submit button** (`[primary-action]`), and the **interest/save form**
(`#wf-form-Olto-Interest-Form`). The form has two heads and a collapsible body:

- `[option-head="save"]` — US: *"Not ready to buy? / Save your configuration"* (collapsed by default).
- `[option-head="non-us"]` — rest of world: *"Register your interest"* (expanded by default).

### Behaviour by region (owned by `modules/primary-action.js`)

| | US / Canada | Rest of world |
|---|---|---|
| Form **location** | **First item in the action bar**, next to total + button | **Last step** in the flow column |
| Form **state** | Collapsed (save head); chevron toggles it | Expanded (register-interest head) |
| Bottom button | **Checkout** → cart drawer | **Submit** → submits the form |
| How the form submits | Its **own** circle button `[data-submit-btn="save"]` | The bottom bar button |

### Important implementation notes
- **Click scoping.** The bar's click handler ignores clicks inside `[form-block]`, so toggling the save head or using its inputs/button never triggers checkout.
- **Email gating.** The email input is only marked `data-required` while the form is *open*. (jQuery's `:visible` still counts an input inside a `height:0` container, so a collapsed form would otherwise wrongly disable the Checkout button.)
- **Success collapse.** On a successful save, the config steps and the bar's total + button hide, but the form (and its success message) stays visible — wherever it currently lives.
- **Chevron ↔ X.** The save head's chevron swaps to an "X" while the form is open.

---

## 8. Module reference

### Core engine (`src/lib/`)
| File | Responsibility |
|------|----------------|
| `flow.js` | **Builds the whole flow** from `config.steps` + the parts kit. Bridges kit atoms to the data-attributes modules read. |
| `templates.js` | Clones the kit atoms once per Shopify product/variant after fetch. |
| `products.js` / `bundles.js` | Fetch products / bundle metaobjects from Shopify. |
| `client.js` | Shopify Storefront API client. |
| `cart.js` | The cart: line mutations, optimistic updates, `getCheckoutUrl()`, multi-config sessions. |
| `selection.js` | Central state — computes the current selection; drives the UI. |
| `bindings.js` / `renderer.js` | Declarative binding + render helpers. |
| `dom.js` | `revealItem` / `hideItem` and small DOM utilities. |
| `countries.js` | Embedded country list for the location dropdown. |
| `env.js` | Environment/config constants. |

### Feature modules (`src/modules/`)
| File | Responsibility |
|------|----------------|
| `location-flow.js` | Country dropdown, geoip, US-vs-RoW region, `onRegionChange` pub/sub. |
| `form-validation.js` | Required-field checks, button enable/disable, error lines, scroll-to-missing. |
| `accordion.js` | Generic collapsible step (height animation + rotating chevron). |
| `primary-action.js` | Bottom-bar button + the interest/save form (heads, expand, submit, region relocation). |
| `price-display.js` | Live total in the bar. |
| `cart-drawer.js` | The attribute-driven cart drawer (`openCartDrawer()`); the bike line can't be removed. |
| `config-quantity.js` | Quantity stepper. |
| `config-reset.js` | "Reset" the current configuration. |
| `buy-flow.js` / `main-product-cart.js` | Add-to-cart / checkout plumbing for the main product. |
| `variant-observer.js` / `variant-swatch.js` | Drive everything off the selected variant. |
| `accessory-orchestration.js` | Master accessory add/remove logic. |
| `accessory-sidebar.js` | The "configure your accessories" panel & summary. |
| `accessory-dependencies.js` | Auto-add parent accessories (`config.accessoryDependencies`). |
| `accessory-layers.js` | Show product image layers for selected accessories. |
| `accessory-video.js` | Click-to-open instruction-video modal (Bunny HLS via hls.js). |
| `custom-images.js` | Combination image swaps (`config.customImageRules`). |
| `bundles-ui.js` | Accessory-pack (bundle) selection UI. |
| `wrap-orchestration.js` | Wrap-colour selection. |
| `filters.js` | Accessory filtering. |
| `ui-bindings.js` | Wires `selection.js` state → the DOM. |

---

## 9. Common edits (recipes)

**Add / reorder / rename a step** → edit the `steps` array in `configs/olto.js`. Rebuild.

**Add a brand-new *kind* of step** → add a builder branch in `flow.js` (`buildStep` switch) + an atom in the Webflow kit, then reference it from `steps`.

**Change which countries are "US flow"** → `US_COUNTRIES` in `modules/location-flow.js`.

**Add a variant / change colour, delivery, background** → `variants` + `defaultVariantId` in `olto.js` (and the variant must exist in Shopify).

**Add an accessory** → add it to the `olto-accessories` collection in Shopify (ordering is drag-drop there). Give it a `custom.instruction_video` metafield for its own video.

**Add an accessory dependency** → `accessoryDependencies` in `olto.js`.

**Add a combination image swap** → `customImageRules` in `olto.js`.

**Restyle anything** → edit the matching atom in the Webflow `[data-step="template"]` kit. No code change.

**Retire the placeholder video** → delete `testInstructionVideo` from `olto.js` once every accessory has a real clip.

---

## 10. Build & deploy

Finsweet-style starter, bundled with esbuild.

```bash
npm run dev      # local dev server, http://localhost:3000 (live reload)
npm run build    # production bundle (run before publishing)
npm run lint     # eslint + prettier check
npm run format   # prettier write
```

The Webflow page loads the built bundle via a `<script>` tag (dev: localhost; production:
the hosted/CDN URL). After any code change, **`npm run build`** and publish/point the page
at the new bundle.

---

## 11. Troubleshooting

| Symptom | Likely cause / fix |
|---------|--------------------|
| Nothing boots, console error about `data-configurator` | The `<body data-configurator="olto">` marker is missing. |
| Whole step column blank | An error during `buildFlow` or a module init — check the console; the `"boot complete"` line will be missing. |
| Checkout button stuck disabled | A visible required field is empty. Note: the interest-form email only counts while the form is **open** (see §7). |
| Clicking inside the form triggers checkout | The bar click handler should skip `[form-block]` clicks (it does — see §7). |
| Form reloads the page with data in the URL | Webflow's AJAX handler didn't bind to the injected form — `bindWebflowForms()` handles this; confirm it runs. |
| Accessory video won't open | The accessory has no `custom.instruction_video` metafield and `testInstructionVideo` was removed. |
| A step won't collapse / has no chevron | It's marked `collapsible: false` in `olto.js` (intended for Location). |

---

## 12. Glossary

- **Parts kit** — the hidden `[data-step="template"]` block in Webflow holding one styled copy of each UI atom.
- **Atom** — a single styled element type (head, option, accessory card…) the kit provides and the JS clones.
- **Mount** — `[data-flow="steps"]` / `[data-flow="actions"]`, the empty containers the flow is built into.
- **Recipe / config** — `configs/olto.js`; the per-product behavioural overlay.
- **Bridge** — `flow.js` re-stamping data-attributes so downstream modules run unchanged.
- **Region** — `us` (US + Canada) vs `eu` (rest of world); decides the flow.
- **Bundle** — an accessory pack, defined as a Shopify metaobject.

---

*Maintained alongside the code. When you change the architecture, update this file in the same commit.*
