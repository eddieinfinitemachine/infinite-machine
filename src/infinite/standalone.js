// Standalone host — the Vercel demo (dist/infinite/index.html).
//
// The Webflow host is src/olto-configurator.js. Both are thin: they locate a
// root element and hand it to mount(); all behaviour lives in infinite.js.
import { mount } from './infinite.js';

mount(document.querySelector('#app'));
