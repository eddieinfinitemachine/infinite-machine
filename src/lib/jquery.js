// Centralized jQuery accessor. Webflow loads jQuery via <script> tag, so we
// read it off the global. Importing from here gives each module a single
// reference without reaching into `window` directly.

const $ = window.jQuery;

if (!$) {
  console.error('[Configurator] jQuery not found on window. The configurator requires jQuery.');
}

export default $;
