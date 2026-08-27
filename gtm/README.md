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

### Conversion surface — bind goals here

| Event | Fires when | Extra params |
|---|---|---|
| `view_configurator` | mount | — |
| `begin_checkout` | Order pressed (US/CA) | `checkout_url`, `olto_pay_mode` |
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
