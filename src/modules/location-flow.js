import $ from '../lib/jquery.js';
import { revealItem, hideItem } from '../lib/dom.js';
import { countries as embeddedCountries } from '../lib/countries.js';

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
  // Embedded list ships with the bundle (src/lib/countries.js). window.countries
  // is checked first so a page can override with a custom list if needed.
  const list = Array.isArray(window.countries) ? window.countries : embeddedCountries;

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

  // Fetch country code directly from geojs.io. No external script tag needed.
  // Falls back silently if the request fails — user can still pick manually.
  fetch('https://get.geojs.io/v1/ip/country')
    .then((r) => (r.ok ? r.text() : Promise.reject(new Error(`HTTP ${r.status}`))))
    .then((code) => {
      const trimmed = code.trim().toUpperCase();
      if (trimmed) selectCountryByCode($select, trimmed);
    })
    .catch((err) => {
      console.warn('[Configurator] Geoip fetch failed:', err.message);
    });

  // Also honor the legacy callback in case someone loaded the geo.js script tag
  window.geoip = (data) => {
    const code = data?.country_code;
    if (code) selectCountryByCode($select, code);
  };
}

function selectCountryByCode($select, code) {
  const options = $select.find('option');
  for (let i = 0; i < options.length; i++) {
    if ($(options[i]).attr('data-code') === code) {
      $select.prop('selectedIndex', i);
      // Fire change event so form-validation clears the "Response Required"
      // error state. bindCountryChange handler also fires locationFlow, so
      // we don't need to call it directly here.
      $select.trigger('change');
      return;
    }
  }
  console.warn(`[Configurator] No <option> matched country code "${code}"`);
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

// The interest/save form is always present as the last step. Its head swap and
// expand state per region are owned by modules/primary-action.js (it subscribes
// to region changes via onRegionChange), so there's nothing flow-specific to
// toggle here.
function applyFlowForRegion() {}
