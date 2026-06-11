// Watches `?variant=` in the URL and emits change events. Decoupled from
// any DOM updates — subscribers (delivery-dates, image-swap) handle their own.

const POLL_MS = 100;

let currentVariant = null;
let defaultVariant = null;
let intervalId = null;
let handlers = [];

export function initVariantObserver(config) {
  defaultVariant = config.defaultVariantId || null;

  checkVariant();
  intervalId = setInterval(checkVariant, POLL_MS);
  window.addEventListener('popstate', checkVariant);
}

export function getCurrentVariant() {
  return currentVariant;
}

export function setVariant(variantId) {
  const params = new URLSearchParams(window.location.search);
  params.set('variant', variantId);
  const newUrl = `${window.location.pathname}?${params.toString()}`;
  window.history.pushState({}, '', newUrl);
  checkVariant();
}

export function onVariantChange(handler) {
  handlers.push(handler);
  // Fire immediately if we already have a variant
  if (currentVariant) handler(currentVariant);
  return () => {
    handlers = handlers.filter((h) => h !== handler);
  };
}

// Tear down for testing / hot-reload — exported but rarely used in prod
export function destroyVariantObserver() {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
  window.removeEventListener('popstate', checkVariant);
  handlers = [];
  currentVariant = null;
}

function checkVariant() {
  const params = new URLSearchParams(window.location.search);
  // If multiple ?variant= params accumulated (can happen when a previous page
  // appends instead of replacing), take the LAST one — most recent selection.
  const allVariants = params.getAll('variant');
  let variant = allVariants.length ? allVariants[allVariants.length - 1] : null;

  if (!variant) variant = defaultVariant;
  if (!variant) return; // No default, nothing to fire

  // Normalize URL so only one ?variant= remains
  if (allVariants.length !== 1 || allVariants[0] !== variant) {
    params.delete('variant');
    params.set('variant', variant);
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.replaceState({}, '', newUrl);
  }

  if (variant !== currentVariant) {
    currentVariant = variant;
    handlers.forEach((h) => h(variant));
  }
}
