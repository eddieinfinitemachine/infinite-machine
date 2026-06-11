import $ from '../lib/jquery.js';
import { revealItem, hideItem } from '../lib/dom.js';

// Region-based show/hide config for the configurator's location/payment flow.
// Triggered when the user selects a country from #country dropdown.

// Two regions only: US (direct buy) and EU (form). "EU" here is the catch-all
// for any non-US country — they all get the EU experience (form + EU metadata).
const US_COUNTRIES = ['United States', 'Canada'];

// "Starting at" row ([data-eu-price]) used to be hidden for US (legacy:
// "you're buying so see your total, not the starting price"). No reason
// they're mutually exclusive — always show it now.
const REGION_CONFIG = {
  us: {
    reveal: '[data-delivery-date="us"],[data-meta-side],[data-eu-price]',
    hide: '[data-delivery-date="eu"]',
    active: '[data-img-local="us"]',
    inactive: '[data-img-local="eu"]',
  },
  eu: {
    reveal: '[data-delivery-date="eu"],[data-meta-side],[data-eu-price]',
    hide: '[data-delivery-date="us"]',
    active: '[data-img-local="eu"]',
    inactive: '[data-img-local="us"]',
  },
};

// Module state — exported readers below for other modules that need it
let currentRegion = '';
let currentCountry = null;
const regionChangeHandlers = [];

export function getCurrentRegion() {
  return currentRegion;
}

export function getSelectedCountry() {
  return currentCountry;
}

export function onRegionChange(handler) {
  regionChangeHandlers.push(handler);
  return () => {
    const i = regionChangeHandlers.indexOf(handler);
    if (i >= 0) regionChangeHandlers.splice(i, 1);
  };
}

export function initLocationFlow() {
  const $select = $('#country');
  if (!$select.length) return;

  populateCountryOptions($select);
  bindCountryChange($select);
  setupGeoip($select);
}

function populateCountryOptions($select) {
  // `countries` is loaded by Webflow custom code as a global (third-party
  // script that ships a `[{Name, Code}]` array). Bail safely if missing.
  const list = window.countries;
  if (!Array.isArray(list)) {
    console.warn('[Configurator] window.countries not found — skipping country list population');
    return;
  }

  for (const country of list) {
    const option = document.createElement('option');
    option.value = country.Name;
    option.textContent = country.Name;
    option.setAttribute('data-code', country.Code);
    $select.append(option);
  }
}

function bindCountryChange($select) {
  $select.on('change', () => locationFlow($select));
}

function setupGeoip($select) {
  // The third-party geoip script calls window.geoip(json) once it resolves.
  // It runs BEFORE our bundle parses, so an early shim in <head> captures the
  // data into window.__geoipData. We pick it up here, OR register a fresh
  // window.geoip if the shim didn't fire yet (defensive fallback).

  const apply = (data) => {
    const code = data?.country_code || 'US';
    selectCountryByCode($select, code);
  };

  if (window.__geoipData) {
    apply(window.__geoipData);
    return;
  }

  // Shim hasn't captured data yet — register our handler. If shim already
  // stashed something, this won't be called. If shim never fires (geo.js
  // failed), nothing happens — country stays unselected, user picks manually.
  window.geoip = apply;
}

function selectCountryByCode($select, code) {
  const options = $select.find('option');
  for (let i = 0; i < options.length; i++) {
    if ($(options[i]).attr('data-code') === code) {
      $select.prop('selectedIndex', i);
      locationFlow($select);
      return;
    }
  }
}

function locationFlow($select) {
  currentCountry = $select.val();

  const region = US_COUNTRIES.includes(currentCountry) ? 'us' : 'eu';
  const settings = REGION_CONFIG[region];

  currentRegion = region;

  revealItem($(settings.reveal));
  hideItem($(settings.hide));

  $(settings.active).addClass('active');
  $(settings.inactive).removeClass('active');

  // After region is set, decide which payment/form blocks to show.
  // US/EU customers can buy directly. Other countries get the lead form.
  applyFlowForRegion(region);

  regionChangeHandlers.forEach((h) => h({ region: currentRegion, country: currentCountry }));
}

// Show / hide the payment block vs the lead-form block based on region.
// Mirrors the legacy decideFlow('full' | 'form') split. Drops the 'shopify' /
// 'deposit' variants — those were Shopyflow-internal payment options.
function applyFlowForRegion(region) {
  const $paymentBlocks = $('[payment-block]');
  const $formBlock = $('[form-block]');
  const $buyButton = $('[buy-button]');
  const $formButton = $('[form-button]');
  const $depositButton = $('[deposit-button]');
  const $depositEmail = $('[data-deposit-email]');
  const $totalPrice = $('[data-total-block]');

  if (region === 'us') {
    // Direct-buy flow — only US/Canada
    revealItem($paymentBlocks);
    revealItem($buyButton);
    revealItem($totalPrice);
    hideItem($formBlock);
    hideItem($formButton);
    hideItem($depositButton);
    hideItem($depositEmail);
  } else {
    // Form flow — EU and everywhere else
    // (EU still shows the EU price via showEuPrice in REGION_CONFIG above)
    hideItem($paymentBlocks);
    hideItem($buyButton);
    hideItem($depositButton);
    hideItem($totalPrice);
    hideItem($depositEmail);
    revealItem($formBlock);
    revealItem($formButton);
  }
}
