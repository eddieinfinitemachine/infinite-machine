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
