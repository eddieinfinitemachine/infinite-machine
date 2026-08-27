# Rollback: /olto/configure

The cutover to the new configurator is **custom code only** — no Designer
elements were changed, so nothing was deleted and nothing needs un-deleting.

To roll back: paste `head.html` and `footer.html` back into the page's custom
code (Page settings → Custom code) and re-add the two page-registered scripts:

    oltodeliverycopy  1.0.0  footer
    OltoWrap          1.9.0  footer

Then publish. That restores the parts-kit configurator exactly.

`dist/configurator.js` still builds and is still pinned by the site-wide
`loadPageScript` version, so the old engine is intact — `/configure-p1` runs on
it today.
