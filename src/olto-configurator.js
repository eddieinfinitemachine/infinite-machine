// Webflow host for the Olto configurator (page /olto/configure).
//
// Top-level path on purpose: it emits dist/olto-tesla.js, so the site-wide
// loadPageScript('olto-tesla.js') resolves with no change to the shared footer
// snippet. The Vercel demo's host is src/tesla/standalone.js.
//
// This file is deliberately thin. Its whole job is to reconcile the standalone
// UI with three things the Webflow page owns and JS must not recreate:
//
//   1. [sf-token][sf-domain]  — injected at runtime by Shopyflow. im-attribution
//      reads the Storefront domain + token off it to push im_* onto the cart
//      (→ Shopify note_attributes → crm-backend). No element, no order
//      attribution — and it fails silently. This already cost 0/786 orders once.
//   2. #wf-form-Olto-Interest-Form — the real Webflow form, 203 submissions,
//      and the only path into the CRM. Moved, never cloned.
//   3. Everything site-wide (GTM, Klaviyo, Intercom, consent) stays untouched.
import { mount } from './infinite/infinite.js';

const MOUNT_SELECTOR = '[data-olto-configurator]';

// Ordered by preference. The id is the production form; the structural
// selector is what actually makes this robust — it matches whatever form the
// page authored inside the interest modal, so a staging copy under a different
// name (deliberately, to keep test submissions out of the CRM's first-touch
// cron) is still adopted, and a rename in the Designer cannot silently break
// adoption.
const WF_FORM_SELECTORS = ['#wf-form-Olto-Interest-Form', '[data-modal-name="interest"] form'];

boot();

async function boot() {
  const root = document.querySelector(MOUNT_SELECTOR);
  if (!root) {
    console.error(`[Olto] No ${MOUNT_SELECTOR} on the page — configurator not mounted.`);
    return;
  }
  assertFixedPositionSafe(root);
  watchForShopyflowHost();

  await mount(root);
  adoptWebflowForm(root);
}

/**
 * The hero, sheet, orderbar and rail are all position:fixed. Any ancestor with
 * a transform/filter/perspective/containment silently demotes them to
 * absolute-inside-that-ancestor and the layout is unrecognisable — Webflow's
 * page wrappers and IX2-animated sections routinely carry transforms. Mount as
 * a direct child of <body>; this says so loudly when it isn't.
 */
function assertFixedPositionSafe(root) {
  const bad = [];
  for (let el = root.parentElement; el && el !== document.documentElement; el = el.parentElement) {
    const cs = getComputedStyle(el);
    if (
      cs.transform !== 'none' ||
      cs.filter !== 'none' ||
      cs.perspective !== 'none' ||
      cs.contain !== 'none' ||
      (cs.willChange && /transform|filter|perspective/.test(cs.willChange))
    ) {
      bad.push(el);
    }
  }
  if (bad.length) {
    console.error(
      '[Olto] Mount has ancestor(s) creating a containing block — every fixed ' +
        'region will collapse. Move the mount to a direct child of <body>.',
      bad
    );
  }
}

/**
 * Shopyflow injects [sf-token][sf-domain] after its own script runs, so this
 * cannot be a one-shot check at boot. Warn only if it never turns up.
 */
function watchForShopyflowHost() {
  if (document.querySelector('[sf-token][sf-domain]')) return;
  let tries = 0;
  const timer = setInterval(() => {
    if (document.querySelector('[sf-token][sf-domain]')) return clearInterval(timer);
    tries += 1;
    if (tries < 40) return; // ~10s
    clearInterval(timer);
    console.error(
      '[Olto] No [sf-token][sf-domain] on this page. im-attribution cannot write ' +
        'im_* onto the Shopify cart, so orders will reach the CRM with no source. ' +
        'Restore the Shopyflow host element before shipping.'
    );
  }, 250);
}

/**
 * Move the live Webflow form into the configurator's lead modal.
 *
 * MOVE, never clone:
 *  - appendChild preserves the node, so Webflow's already-bound AJAX submit
 *    handler survives; a clone loses it and submits as a native GET.
 *  - The 16 im_* hidden inputs im-attribution stamped travel with the node.
 *    Re-creating the form would strand them: stampForm() latches
 *    data-im-stamped on the element and never re-stamps it.
 *  - A clone would also leave a second identical form on the page, which
 *    im-attribution would stamp too, making the submission source ambiguous.
 *
 * The .w-form WRAPPER is what moves, not the <form>: Webflow's success
 * (.w-form-done) and error (.w-form-fail) blocks are siblings of the form
 * inside it. Move only the form and a successful submit shows the user nothing.
 */
function adoptWebflowForm(root) {
  const slot = root.querySelector('[data-wf-form-slot]');
  const form = WF_FORM_SELECTORS.reduce((found, sel) => found || document.querySelector(sel), null);
  if (!slot) {
    console.error('[Olto] No [data-wf-form-slot] in the rendered UI — form not adopted.');
    return;
  }
  if (!form) {
    console.error(
      '[Olto] No Webflow interest form found (tried: ' +
        WF_FORM_SELECTORS.join(', ') +
        '). Rest-of-world interest and US save would both capture nothing — ' +
        'leaving the fallback form in place.'
    );
    return;
  }

  slot.appendChild(form.closest('.w-form') || form);
  slot.hidden = false;

  // The built-in form only exists for the standalone demo, where no Webflow
  // form is present. Two live forms would double-submit and split attribution.
  const fallback = root.querySelector('[data-save-form]');
  if (fallback) fallback.remove();
}
