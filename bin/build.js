import 'dotenv/config';
import * as esbuild from 'esbuild';
import { copyFileSync, mkdirSync, readdirSync } from 'fs';
import { join, sep } from 'path';

// Config output
const BUILD_DIRECTORY = 'dist';
const PRODUCTION = process.env.NODE_ENV === 'production';

// Config entrypoint files
// src/configurator.js  — the Webflow parts-kit engine (P1 + rollback for Olto)
// src/olto-tesla.js     — the Olto configurator on the Webflow page (top-level
//                         path so it emits dist/olto-tesla.js and the site's
//                         loadPageScript('olto-tesla.js') resolves unchanged)
// src/tesla/standalone.js — the same UI for the Vercel demo shell
const ENTRY_POINTS = ['src/configurator.js', 'src/olto-tesla.js', 'src/tesla/standalone.js'];

// Config dev serving
const LIVE_RELOAD = !PRODUCTION;
const SERVE_PORT = Number(process.env.PORT) || 3000;
const SERVE_ORIGIN = `http://localhost:${SERVE_PORT}`;

// Sanity-check required env at build time. Bail loudly if missing — silent
// substitution of `undefined` would only surface as a confusing runtime error.
const REQUIRED_ENV = ['SHOPIFY_STORE_DOMAIN', 'SHOPIFY_STOREFRONT_PUBLIC_TOKEN'];
const missing = REQUIRED_ENV.filter((k) => !process.env[k]);
if (missing.length) {
  console.error(`\nMissing required env vars: ${missing.join(', ')}`);
  console.error('Check .env (gitignored) or .env.example for the expected keys.\n');
  process.exit(1);
}

// Demo page: copy the Tesla-style configurator shell into dist so the dev
// server (servedir = dist) serves it at /tesla/.
mkdirSync(join(BUILD_DIRECTORY, 'tesla'), { recursive: true });
copyFileSync('src/tesla/index.html', join(BUILD_DIRECTORY, 'tesla', 'index.html'));

// Dev-only: the Webflow host harness (see the file header). Never shipped —
// dist/webflow-harness.html is gitignored and no Webflow page references it.
if (!PRODUCTION) {
  copyFileSync('src/tesla/webflow-harness.html', join(BUILD_DIRECTORY, 'webflow-harness.html'));
}

// Create context
const context = await esbuild.context({
  bundle: true,
  entryPoints: ENTRY_POINTS,
  outdir: BUILD_DIRECTORY,
  minify: PRODUCTION,
  sourcemap: !PRODUCTION,
  target: PRODUCTION ? 'es2019' : 'esnext',
  inject: LIVE_RELOAD ? ['./bin/live-reload.js'] : undefined,
  define: {
    SERVE_ORIGIN: JSON.stringify(SERVE_ORIGIN),
    'process.env.SHOPIFY_STORE_DOMAIN': JSON.stringify(process.env.SHOPIFY_STORE_DOMAIN),
    'process.env.SHOPIFY_STOREFRONT_PUBLIC_TOKEN': JSON.stringify(
      process.env.SHOPIFY_STOREFRONT_PUBLIC_TOKEN
    ),
    'process.env.SHOPIFY_API_VERSION': JSON.stringify(
      process.env.SHOPIFY_API_VERSION || '2026-04'
    ),
  },
  // tesla.css is imported as a string and injected as a <style> at mount, so
  // the stylesheet ships inside the bundle instead of as a second versioned URL.
  loader: { '.css': 'text' },
  external: ['jquery', 'gsap', 'gsap/ScrollTrigger', 'swiper'],
});

// Build files in prod
if (PRODUCTION) {
  await context.rebuild();
  context.dispose();
}

// Watch and serve files in dev
else {
  await context.watch();
  await context
    .serve({
      servedir: BUILD_DIRECTORY,
      port: SERVE_PORT,
    })
    .then(logServedFiles);
}

/**
 * Logs information about the files that are being served during local development.
 */
function logServedFiles() {
  /**
   * Recursively gets all files in a directory.
   * @param {string} dirPath
   * @returns {string[]} An array of file paths.
   */
  const getFiles = (dirPath) => {
    const files = readdirSync(dirPath, { withFileTypes: true }).map((dirent) => {
      const path = join(dirPath, dirent.name);
      return dirent.isDirectory() ? getFiles(path) : path;
    });

    return files.flat();
  };

  const files = getFiles(BUILD_DIRECTORY);

  const filesInfo = files
    .map((file) => {
      if (file.endsWith('.map')) return;

      // Normalize path and create file location
      const paths = file.split(sep);
      paths[0] = SERVE_ORIGIN;

      const location = paths.join('/');

      // Create import suggestion
      const tag = location.endsWith('.css')
        ? `<link href="${location}" rel="stylesheet" type="text/css"/>`
        : `<script defer src="${location}"></script>`;

      return {
        'File Location': location,
        'Import Suggestion': tag,
      };
    })
    .filter(Boolean);

  // eslint-disable-next-line no-console
  console.table(filesInfo);
}
