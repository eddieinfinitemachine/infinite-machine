// Entry point. Reads body[data-configurator] to determine which product
// recipe to boot. One JS bundle serves all products (olto, p1, future).

import configs from './configs/index.js';
import { initConfigurator } from './lib/configurator-init.js';

// Look for [data-configurator] anywhere — body, .page-wrapper, or a section
// wrapper. First match wins.
const configEl = document.querySelector('[data-configurator]');
const configKey = configEl?.dataset.configurator;

if (!configKey) {
  console.error(
    '[Configurator] No data-configurator attribute on <body>. Add e.g. <body data-configurator="olto">'
  );
} else {
  const config = configs[configKey];
  if (!config) {
    console.error(
      `[Configurator] Unknown configurator "${configKey}". Available: ${Object.keys(configs).join(', ')}`
    );
  } else {
    initConfigurator(config);
  }
}
