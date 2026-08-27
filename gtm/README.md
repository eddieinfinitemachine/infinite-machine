# GTM container changes for the Olto configurator

The container (`GTM-5ZBFGDCB`) is the only place several conversions are
defined, and none of it lives in a repo. This directory keeps the audit and the
change alongside the code that depends on it — the same reason `src/infinite/`
nearly got lost.

## The audit (2026-08-27)

21 tags, 16 triggers. Only these touch `/olto/configure`:

| Trigger | Condition | Fires | New UI |
|---|---|---|---|
| [15] Configurator Loaded | Page Path contains `/configure` | Meta + page-loaded HTML | **survives** — path unchanged |
| [12] Checkout | **Click Text contains `Checkout`** | `GA4 - Checkout`, `Checkout Tag` (Google Ads `Y14VCNG94KEbEOKmuJQ-`) | **BREAKS** — the CTA now reads *Order* |
| [51] Olto Save Configure Submission | CSS `.w-form:has(form[data-name="Olto Interest Form"]) .w-form-done` | `GA4 - Olto Save Config` | **survives** — only because the real Webflow form is MOVED with its `.w-form` wrapper rather than cloned |
| [55] Wrap events | `_event` matches `^wrap_` | `GA4 - Olto Wrap events` | unaffected (pushed by `olto-wrap.js` on `/olto`) |
| [63] CE - lead_form_success | `_event` = `lead_form_success` | `Meta \| Lead` | unaffected (pushed on `/olto`) |

Orphans, referenced by no tag: **[31]**, **[33]**, **[36]** — the last being a
stale `Form Classes contains checkout_button`. Safe to delete, unrelated to this.

So the real exposure was one trigger, not the "28 selector-bound events" the CRM
audit implied. But that one carries a Google Ads conversion, so it affects
bidding and not just reporting.

## The change

`GTM-5ZBFGDCB_begin_checkout.json` — import into GTM with **Admin → Import
Container → Merge → Overwrite conflicting**. Review the diff GTM shows before
publishing; it should be exactly:

- **+ trigger 100** `CE - begin_checkout` — `{{_event}} EQUALS begin_checkout`
- **~ `GA4 - Checkout`** firing triggers `[12]` → `[12, 100]`
- **~ `Checkout Tag`** firing triggers `[12]` → `[12, 100]`

Nothing is removed. Trigger 12 stays, so any other "Checkout" link keeps working;
the new trigger keys on the dataLayer event `src/infinite/infinite.js` pushes
(`pushDataLayer('begin_checkout')`), which no copy change can silently break.

## Verify after publishing

GTM Preview on `https://infinite-machine.webflow.io/olto/configure-tesla`:
click **Order** and confirm `GA4 - Checkout` and `Checkout Tag` both fire on
`begin_checkout`. Then build a bundle, submit the lead form, and confirm
`GA4 - Olto Save Config` still fires off trigger 51.

## Not done, deliberately

The configurator also pushes `view_configurator`, `select_color`,
`select_bundle`, `add_accessory`, `remove_accessory`, `change_quantity`,
`select_country`, `save_configuration_open`, `interest_form_open` and
`form_submit`, each carrying variant / wrap / pack / quantity / value /
currency / region / config id. None has a trigger yet. Worth wiring up for
funnel analysis, but it is additive and none of it is load-bearing today.

---

## The full event contract (2026-08-27)

Every event below is pushed explicitly by `src/infinite/infinite.js`. **Bind
triggers to `{{_event}}`, never to Click Text, Click Classes or a CSS selector**
— that coupling is what a rebuilt DOM breaks silently, and it is why `[12]` and
`[51]` were the exposure in the audit above.

Every push also carries the configuration as context, so no trigger needs to
scrape the page for it: `configurator` (always `olto`), `olto_variant`,
`olto_wrap`, `olto_pack`, `olto_quantity`, `olto_accessory_count`, `olto_value`,
`olto_savings`, `olto_currency`, `olto_region`, `olto_config_id`.

**These context params are the state at the moment of the click, before the
interaction is applied.** The cart is the source of truth and its write is
async, so pushing afterwards would delay the event and lose it entirely if the
visitor navigates. Read the interaction from its own named param
(`olto_selected_color`, `olto_selected_bundle`, `olto_accessory`, …) and the
context params as "what they were looking at when they pressed it". Only
`begin_checkout` and the form events describe a settled configuration.

### Conversion surface — bind goals here

| Event | Fires when | Extra params |
|---|---|---|
| `view_configurator` | mount | — |
| `begin_checkout` | Order pressed (US/CA) | `checkout_url`, `olto_pay_mode` — Cash and Finance go to the same checkout, so this is the only place the intent is recorded |
| `save_configuration` | lead form submitted from the **Save** flow | — |
| `register_interest` | lead form submitted from the **rest-of-world** flow | — |
| `form_submit` | either flow submits | `form_name`, `form_flow` |
| `save_configuration_open` / `interest_form_open` | lead modal opened | — |
| `select_color` | colour row | `olto_selected_color` |
| `select_bundle` | bundle card | `olto_selected_bundle` |
| `add_accessory` / `remove_accessory` | accessory added or dropped | `olto_accessory` |
| `select_accessory_option` | colour chip or size select | `olto_accessory`, `option_name`, `option_value` |
| `change_quantity` | configuration quantity | `olto_quantity_delta` |
| `change_accessory_quantity` | per-accessory count | `olto_accessory`, `olto_accessory_quantity` |
| `select_pay_mode` | Cash / Finance | `olto_pay_mode` |
| `select_country` | ship-to changed by hand | `olto_country` |
| `open_rep_chat` | Talk to a rep | `channel` — `intercom` or `contact_page` |
| `play_accessory_video` | instruction clip opened | `olto_accessory` |
| `save_design_image` | design image exported | — |
| `clear_configuration` | Clear pressed | `stage` — `armed` (first tap) or `confirmed` (second) |

`save_configuration` replaces trigger `[51]`'s CSS selector. Both flows submit
the **same** Webflow form, so the DOM cannot distinguish them — the event carries
the intent from whichever button opened the modal.

### Coverage — do NOT bind goals here

`ui_click` fires once on **every** press, alongside any named event above:

- `control` — `order_cta`, `save`, `color_swatch`, `bundle_card`,
  `accessory_arrow`, `accessory_video`, `accessory_color`, `accessory_qty`,
  `accessory_button`, `accessory_card`, `quantity`, `pay_mode`, `talk_to_rep`,
  `clear_configuration`, `save_image`, `lead_modal_close`,
  `accessory_video_close`, `share_link`, or `other`
- `control_detail` — the swatch, bundle, accessory handle, direction, etc.

Anything clickable that is not in the table still reports as `control: "other"`
with its trimmed label, so a button added later is covered from the day it ships.

**A bundle tap emits both `ui_click` and `select_bundle`.** Binding a conversion
to `ui_click` would double-count it. Use it for the behavioural picture —
what gets touched, in what order, and what never gets touched at all.

---

## Getting the events into GA4

`GTM-5ZBFGDCB_olto_configurator_events.json` — import with **Admin → Import
Container → Merge → Rename conflicting**. It adds and removes nothing existing:

- **2 triggers** — `CE - Olto configurator events` (regex over the 20 named
  events) and `CE - Olto ui_click`
- **2 GA4 tags** — both send `eventName = {{Event}}`, so each event arrives in
  GA4 under the name the page pushed. One tag covers all 20; the click-coverage
  tag is separate so it can be paused on its own if the volume is unwanted.
- **23 dataLayer variables** — the shared configuration context plus the
  per-event params.

Two tags rather than twenty because the event name is passed through rather than
hard-coded. Adding an event to the contract means editing one regex, not
building another tag.

`begin_checkout` is deliberately **excluded** from the regex. The existing
`GA4 - Checkout` tag already fires on it via trigger 100 from the other import,
and matching it here as well would put two GA4 events on one checkout. The
Google Ads conversion is unaffected either way — it fires once, from trigger 100.
To get the configuration context onto checkout, add the `olto_*` params to
`GA4 - Checkout` rather than putting the event back in this regex.

### Which of the two imports is a cutover blocker

**`GTM-5ZBFGDCB_begin_checkout.json` is.** Trigger `[12] Checkout` matches
*Click Text contains "Checkout"* and the new CTA reads **Order**, so it stops
firing at cutover — taking `GA4 - Checkout` and `Checkout Tag`, a **Google Ads
conversion**, with it. That is bidding signal, not just reporting.

**This file is not.** It is additive: nothing breaks without it, you simply do
not get the new data. Import it whenever.

### Then register the custom dimensions in GA4 — this is the step people miss

GA4 **collects** an event parameter automatically but will not let you report on
it until it is registered. Admin → Custom definitions → Create custom dimension,
scope **Event**, one per parameter you want to break down by:

`olto_selected_color`, `olto_selected_bundle`, `olto_accessory`, `olto_pay_mode`,
`olto_variant`, `olto_wrap`, `olto_pack`, `olto_region`, `olto_country`,
`option_name`, `option_value`, `control`, `control_detail`, `stage`, `channel`,
`form_flow`.

**Registration is not retroactive.** A dimension reports from the day it is
created, so anything collected before then stays invisible in reports. Register
them at the same time as the import, not after a week of data.

`olto_value` and `olto_savings` are numbers — register those as custom
**metrics** (scope Event, unit Currency) rather than dimensions.

### What you can answer once it is in

- Which colours get picked, and which get picked and then abandoned
- Bundle attach rate, and which kit
- Cash vs Finance intent (`select_pay_mode`, and `olto_pay_mode` on `begin_checkout`)
- Which accessories are opened as a video but never added
- Where people quit — `clear_configuration` with `stage = armed` is someone who
  thought better of wiping their build
- What never gets touched at all, from `ui_click`
