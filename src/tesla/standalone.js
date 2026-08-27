// Standalone host — the Vercel demo (dist/tesla/index.html).
//
// The Webflow host is src/olto-tesla.js. Both are thin: they locate a root
// element and hand it to mount(); all behaviour lives in tesla.js.
import { mount } from './tesla.js';

mount(document.querySelector('#app'));
