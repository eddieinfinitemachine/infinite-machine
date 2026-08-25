# Tesla-style mobile configurator (dist/tesla.html)

Plan: ~/.claude/plans/swift-wibbling-jellyfish.md

- [x] .env → real public storefront creds (public token from committed dist)
- [x] bin/build.js: add src/tesla/tesla.js entry, copy index.html → dist/tesla.html, PORT env override
- [x] src/tesla/index.html — shell + GSAP CDN
- [x] src/tesla/state.js — cart-derived state store
- [x] src/tesla/ui.js — section builders (hero, stats, paint, wrap, bundles, accessories, qty, summary, footer)
- [x] src/tesla/tesla.js — boot + events + update()
- [x] src/tesla/tesla.css — Tesla-inspired mobile look, IM monochrome
- [x] Verify: build green, dist diff clean for configurator.js
- [x] Verify in Chrome @390px: crossfade, wrap, accessories+deps, bundle, qty, total math, checkout URL
- [x] Screenshots for Eddie

## Review (2026-08-25)

All verified live in Chrome against shop.infinitemachine.com:
- Hero crossfade Black<->Silver (GSAP), delivery line follows variant (July/Aug 2026)
- Wrap Sand +$500; Basic pack = Phone Mount + Sidewalls + Charging Dock = $274 exact-set match
- Rear Basket auto-added Rear Rack (dependency rule); deselect logic mirrors upstream
- Qty x2 -> summary "x2 configurations", total $9,170 = 2 x $4,585 (hand-checked vs API prices)
- Order -> real Shopify checkout (shop.app redirect) — verified load only, no purchase
- Full reload restores config from cart; fixed hero-sync bug for restored non-default variant
- Console clean; eslint clean on src/tesla; dist/configurator.js byte-identical to upstream

Notes:
- dev: PORT=3999 pnpm dev -> http://localhost:3999/tesla/ (3000 occupied by c2-dashboard)
- Sky wrap hidden: no Sky variant exists on olto-wrap in Shopify (data-driven filter)
- Stat row figures are placeholder constants in src/tesla/ui.js (TODO eddie: confirm)
- If this ever deploys, add the auth gate first (CLAUDE.md rule)

## Round 2 (2026-08-25): IM branding + payment modes
- [x] Real IM wordmark SVG (from im-creative-library) in topbar + boot screen
- [x] Helvetica Now Display 300/400/500 + Text 400/500 via live-site Webflow CDN @font-face
- [x] Style-guide tokens: #6a6a6a muted, #e5e5e5 border, #f8f8f8 chip, 0.625rem radius, flat (no shadows), h1 Light, IM ease 450ms
- [x] IM green #00ff38: single signature-accent use (active payment segment underline) + boot spinner
- [x] Tesla-style Cash / Lease / Finance toggle — verified $248.35/mo lease + $764.17/mo finance vs $9,170 cash; terms are ILLUSTRATIVE constants (PAYMENT_PLANS in ui.js, TODO eddie)

## Round 3 (2026-08-25): red Olto logo + layout rework
- [x] Red OLTO wordmark SVG (#E90022, Brand Files 2026_Current/Vehicle) replaces the text title
- [x] Section order: Base Material (renamed from Paint/Finish) -> Wrap -> packs -> accessories
- [x] Wrap color updates the vehicle: hero swaps to the REAL wrapped-Olto photo from the Shopify wrap variant image (Sand/Blush/Forest/Crimson); None -> base shot
- [x] Scooter always visible: hero pinned (fixed), sheet is its own scroll container below it (ScrollTrigger scroller re-pointed)

## Round 4 (2026-08-25): on-vehicle accessory layers
- [x] Replicated the live configurator's layer stack: per-accessory in-position AVIFs toggled over the base bike image (15 of 17 accessories; phone mount + trailer adapter have no layer on the live site either)
- [x] Layer URLs extracted from live /olto/configure — CMS bucket 66ea2a84659b76f5d91d481b (NOT the main asset folder; mirror-derived guesses 404'd)
- [x] customImageRules combos honored (soft bag renders inside rear basket; dock+battery rule inert since battery isn't an accessory)
- [x] Wrap photo yields to layer view when any accessory is on the bike (layers align to base canvas only)

## Round 5 (2026-08-25): clear button
- [x] "Clear configuration" pill under the summary — two-tap confirm (no native dialog), then removeConfig(session) + fresh session + default-bike reseed (mirrors upstream config-reset.js)
- [x] Verified: full config wiped, hero back to clean bike, qty 1, wrap None, session id rolled in URL, summary = Olto Black $3,495
- [x] Tween visibility guard: skip count-up animation when document.hidden

## Round 6 (2026-08-25): US vs EU base image fix
- [x] Bug: hero always used config.variants backgroundImage = the EU-spec bike (olto-eu-*.avif); accessory layers are US-canvas shots, so adding a pack composited US accessories over the EU bike ("pack screws up color")
- [x] Fix: mirror the live site's [data-img-local="us"/"eu"] split (selection.js:93) — hero base = Shopify variant image (OLTO-QUARTER-FRONT-*.jpg, 4000sq) for US/unresolved region; EU avif only for rest-of-world
- [x] US variant images preloaded at boot; crossfade key carries the region bucket

## Round 7 (2026-08-25): wrap + accessories composite
- [x] Answered "why does the pack remove the wrap": live site has no wrap-on-vehicle art at all; wrap PDP shots are a different shoot from the layer canvas
- [x] Calibrated a registration transform (WRAP_PHOTO_FIT: scale 1.10, x +3.4%, y -2.9%) mapping the "3.4" wrap shots onto the layer canvas — layers now composite on wrapped bikes
- [x] Sand excluded (side-view shot, NON_COMPOSITE_WRAPS) — falls back to base bike + layers
- [x] Verified: Blush + Cargo renders basket/bag/plate/stand/dock on the wrapped bike coherently

## Round 8 (2026-08-25): "color wraps are oversized" fix
- [x] Root cause: Round 7's eyeballed WRAP_PHOTO_FIT (scale 1.1) — wrap photos were never misframed. Canvas bbox scan proved EU/US/wrap shots all frame the bike identically and layers register natively
- [x] Deleted the transform; wrap views now render the bike at the same scale as base views, layers registered exactly (verified at zoom: rack arm on deck, plate on panel, stand on ground)

## Round 9 (2026-08-25): deployed to Vercel
- [x] https://olto-configurator.vercel.app — project `olto-configurator` in the Infinite Machine Vercel team
- [x] Password gate (CLAUDE.md auth rule): Edge middleware (middleware.js), server-side check, HttpOnly cookie, 30-day expiry — password `olto2026` (DEMO_PASSWORD env var)
- [x] vercel.json: pnpm build, outputDirectory dist/tesla; SHOPIFY_* env vars set (Production)
- [x] Verified: 401 on all routes unauthed (assets included), wrong pw 401, right pw 302+cookie, app loads with live store data

## Round 10 (2026-08-25): save pill + stat change
- [x] "Save" pill next to Order — copies a shareable ?d= link encoding base/wrap/qty/payMode/accessories; opening it rebuilds the design into a fresh cart session (cross-device); clipboard fallback keeps link in URL bar
- [x] Third stat tile: Removable/Battery -> Class 2 / E-bike
- [x] Verified round-trip locally ($4,987 design reconstructed exactly); redeployed to olto-configurator.vercel.app
