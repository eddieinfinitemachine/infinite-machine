import $ from '../lib/jquery.js';

// Instruction-video preview for accessories. Drives the page's
// [data-bunny-lightbox-init] player DIRECTLY (no Osmo JS). Each accessory card has
// one always-visible play trigger ([data-step="acs-play"]):
//   - Desktop: HOVER the trigger → the MUTED, looping HLS clip plays in the player,
//     floated slightly ABOVE the trigger. A grace-delay bridge keeps it open while
//     the cursor moves from the trigger up into the player so controls stay reachable.
//   - Touch: TAP the trigger → the player opens centered in the viewport; tap the
//     same trigger again, or anywhere outside, to dismiss.
// Audio toggles via [data-player-control="mute"] or by clicking the video itself
// (preference persists across opens).
//
// Markup (Webflow, built from the Osmo lightbox structure — classes checkout_vid*):
//   [data-bunny-lightbox-status]                 wrapper — we toggle active/not-active
//     [data-bunny-lightbox-init]                 player — we set [data-player-muted] for the icon
//       <video class="checkout_vid-player_video">
//       [data-player-control="mute"]             mute toggle (icon CSS keys on data-player-muted)
//   [data-accessory-handle] [data-step="acs-play"]  the hover/tap trigger on each card
//
// Show/hide is CSS off [data-bunny-lightbox-status]: not-active = hidden,
// active = shown. (Style this in Webflow and drop the temporary inline
// display:none — the status attribute is the switch.)
//
// Video URL = Shopify metafield custom.instruction_video (product.instructionVideo),
// a Bunny .m3u8 HLS playlist. Needs hls.js (window.Hls) on the page; Safari plays
// HLS natively without it.

const HIDE_DELAY = 350; // ms grace before hiding after leaving a trigger
const SHOW_DELAY = 120; // ms hover-intent before loading a trigger's clip

export function initAccessoryVideo(config, products) {
  if (!products.accessories?.length) return;

  const player = document.querySelector('[data-bunny-lightbox-init]');
  const wrapper = player?.closest('[data-bunny-lightbox-status]');
  const video = player?.querySelector('video');
  if (!player || !wrapper || !video) {
    console.warn('[AccessoryVideo] No [data-bunny-lightbox-init] player on page — preview disabled');
    return;
  }

  // handle → HLS url. Falls back to config.testInstructionVideo (TEMP) so every
  // accessory previews during testing before the real metafields are uploaded.
  const fallback = config.testInstructionVideo || null;
  const byHandle = new Map();
  for (const p of products.accessories) {
    const url = p.instructionVideo || fallback;
    if (url) byHandle.set(p.handle, url);
  }
  if (!byHandle.size) {
    console.log('[AccessoryVideo] No accessories have an instruction video — nothing to wire');
    return;
  }

  // Show the play trigger ONLY on accessories whose instruction-video metafield
  // (custom.instruction_video) is actually filled — keyed on the REAL metafield,
  // not the test fallback, so items without a video hide their trigger.
  const withMetafield = new Set(
    products.accessories.filter((p) => p.instructionVideo).map((p) => p.handle)
  );
  document.querySelectorAll('[data-accessory-handle]').forEach((card) => {
    if (withMetafield.has(card.getAttribute('data-accessory-handle'))) return;
    card.querySelectorAll('[data-step="acs-play"]').forEach((el) => {
      el.style.display = 'none';
    });
  });

  // HLS source loading: Safari plays .m3u8 natively; elsewhere attach hls.js
  // once and swap sources via loadSource on each hover.
  const isSafariNative = !!video.canPlayType('application/vnd.apple.mpegurl');
  const canUseHls = !isSafariNative && !!(window.Hls && window.Hls.isSupported());
  let hls = null;
  const loadSource = (url) => {
    if (isSafariNative) {
      video.src = url;
    } else if (canUseHls) {
      if (!hls) {
        hls = new window.Hls({ maxBufferLength: 10 });
        hls.attachMedia(video);
      }
      hls.loadSource(url);
    } else {
      video.src = url; // last resort
    }
  };

  // Reflect mute state onto the player so the existing icon CSS
  // ([data-player-muted="true"]) toggles between the volume-up / mute SVGs.
  const setMuted = (m) => {
    video.muted = m;
    player.setAttribute('data-player-muted', m ? 'true' : 'false');
  };

  let hideTimer = null;
  let showTimer = null; // hover-intent debounce before committing to a clip
  let currentHandle = null;
  let currentUrl = null; // currently-loaded source (skip reload when unchanged)
  let currentTrigger = null; // the play trigger the video is anchored to (for resize)
  let pendingHandle = null; // handle we're loading / about to show
  let loadGen = 0; // increments per load; stale (superseded) reveals are ignored
  let readyListener = null;
  let wantsAudio = false; // persists once the user unmutes

  // Touch devices (no hover): tap the play trigger to open, video centered, tap
  // outside to dismiss. Desktop: hover the play trigger, video slightly above it.
  const isTouch = () => window.matchMedia('(hover: none)').matches;

  // Desktop: float the player just ABOVE the play trigger, horizontally centered
  // on it, clamped into the viewport. Fixed positioning so it works regardless of
  // DOM nesting.
  const GAP = 10; // px between the player's bottom and the trigger's top
  const positionAboveTrigger = (triggerEl) => {
    const t = triggerEl.getBoundingClientRect();
    const w = wrapper.offsetWidth;
    const h = wrapper.offsetHeight;
    let left = t.left + t.width / 2 - w / 2; // centered on the trigger
    let top = t.top - h - GAP; // above the trigger
    left = Math.max(8, Math.min(left, window.innerWidth - w - 8));
    top = Math.max(8, top);
    wrapper.style.position = 'fixed';
    wrapper.style.transform = '';
    wrapper.style.left = `${Math.round(left)}px`;
    wrapper.style.top = `${Math.round(top)}px`;
  };

  // Touch: dead-center in the viewport.
  const centerInViewport = () => {
    wrapper.style.position = 'fixed';
    wrapper.style.left = '50%';
    wrapper.style.top = '50%';
    wrapper.style.transform = 'translate(-50%, -50%)';
  };

  const place = (triggerEl) => (isTouch() ? centerInViewport() : positionAboveTrigger(triggerEl));

  const clearReady = () => {
    if (readyListener) {
      video.removeEventListener('loadeddata', readyListener);
      readyListener = null;
    }
  };

  // Position + activate the player for triggerEl. Fresh opens snap into place;
  // moving while already open lets the CSS left/top transition slide A → B.
  const reveal = (triggerEl) => {
    const wasActive = wrapper.getAttribute('data-bunny-lightbox-status') === 'active';
    currentTrigger = triggerEl;
    if (wasActive) {
      place(triggerEl);
    } else {
      const prev = wrapper.style.transition;
      wrapper.style.transition = 'none';
      place(triggerEl);
      void wrapper.offsetWidth; // reflow to lock the start position
      wrapper.style.transition = prev;
    }
    wrapper.setAttribute('data-bunny-lightbox-status', 'active');
  };

  // Load the clip, then reveal/move ONLY once it has a frame — so we never show
  // (or slide into) an empty player while the new HLS is still loading. If the
  // source is unchanged (e.g. same shared clip), skip the reload entirely.
  const commit = (triggerEl, handle, url) => {
    if (url === currentUrl) {
      currentHandle = handle;
      video.play?.().catch(() => {});
      reveal(triggerEl);
      return;
    }
    const gen = ++loadGen;
    clearReady();
    loadSource(url);
    currentUrl = url;
    setMuted(!wantsAudio);
    let readyFallback;
    const onReady = () => {
      clearReady();
      clearTimeout(readyFallback);
      if (gen !== loadGen) return; // superseded by a newer hover, or hidden
      currentHandle = handle;
      video.play?.().catch(() => {});
      reveal(triggerEl);
    };
    readyListener = onReady;
    video.addEventListener('loadeddata', onReady);
    readyFallback = setTimeout(onReady, 2500); // safety: reveal anyway if the event never fires
  };

  // `triggerEl` is the [data-step="acs-play"] element. `immediate` (touch tap)
  // skips the hover-intent debounce.
  const show = (triggerEl, immediate) => {
    const card = triggerEl.closest('[data-accessory-handle]');
    if (!card) return;
    const handle = card.getAttribute('data-accessory-handle');
    const url = byHandle.get(handle);
    if (!url) return; // no clip → leave the player as-is
    clearTimeout(hideTimer);
    clearTimeout(showTimer);
    pendingHandle = handle;
    if (immediate) {
      commit(triggerEl, handle, url);
    } else {
      showTimer = setTimeout(() => {
        if (pendingHandle === handle) commit(triggerEl, handle, url);
      }, SHOW_DELAY);
    }
  };

  const hide = () => {
    clearTimeout(showTimer);
    clearReady();
    loadGen++; // invalidate any in-flight reveal
    pendingHandle = null;
    wrapper.setAttribute('data-bunny-lightbox-status', 'not-active');
    video.pause?.();
    currentHandle = null;
    currentTrigger = null;
  };

  // Reposition on resize while the player is open. Width-only filter — mobile
  // scroll changes viewport height and must not retrigger layout logic.
  let lastWidth = window.innerWidth;
  window.addEventListener('resize', () => {
    if (window.innerWidth === lastWidth) return;
    lastWidth = window.innerWidth;
    if (currentTrigger && wrapper.getAttribute('data-bunny-lightbox-status') === 'active') {
      place(currentTrigger);
    }
  });

  const scheduleHide = () => {
    clearTimeout(hideTimer);
    hideTimer = setTimeout(hide, HIDE_DELAY);
  };

  // Desktop hover: show on entering a play trigger (debounced intent), hide after
  // a grace delay on leaving it. The player bridge keeps it open while you move up
  // into the video. Entering any trigger cancels a pending hide, so moving A → B
  // within HIDE_DELAY keeps the player alive and lets it slide across.
  $(document)
    .on('mouseenter.accVideo', '[data-accessory-handle] [data-step="acs-play"]', function () {
      if (isTouch()) return;
      show(this, false);
    })
    .on('mouseleave.accVideo', '[data-accessory-handle] [data-step="acs-play"]', () => {
      if (isTouch()) return;
      clearTimeout(showTimer); // cancel a not-yet-committed open
      pendingHandle = null;
      scheduleHide();
    });

  // Player hover is the bridge: entering cancels the pending hide so you can move
  // from a trigger up into the video without it closing.
  $(wrapper)
    .on('mouseenter.accVideo', () => clearTimeout(hideTimer))
    .on('mouseleave.accVideo', scheduleHide);

  // Close on ANY scroll — the page OR the inner accessories list (overflow:auto).
  // A trigger-anchored floating player goes stale the instant things move.
  const closeOnScroll = () => {
    clearTimeout(showTimer);
    pendingHandle = null;
    if (wrapper.getAttribute('data-bunny-lightbox-status') === 'active') hide();
  };
  window.addEventListener('scroll', closeOnScroll, { passive: true });
  const scrollZone = document.querySelector('.checkout_accessories-wrap');
  if (scrollZone) scrollZone.addEventListener('scroll', closeOnScroll, { passive: true });

  // Touch tap → open/close the video (gated to no-hover devices). Tapping the
  // same card's trigger again closes it (no hover-out on touch).
  $(document).on('click.accVideo', '[data-step="acs-play"]', function (e) {
    if (!isTouch()) return;
    const card = this.closest('[data-accessory-handle]');
    if (!card) return;
    e.preventDefault();
    const handle = card.getAttribute('data-accessory-handle');
    const openForThis =
      currentHandle === handle && wrapper.getAttribute('data-bunny-lightbox-status') === 'active';
    if (openForThis) hide();
    else show(this, true);
  });

  // Touch: tap anywhere outside the player (and not on a play icon) dismisses it.
  $(document).on('click.accVideo', (e) => {
    if (!isTouch()) return;
    if (wrapper.getAttribute('data-bunny-lightbox-status') !== 'active') return;
    if (wrapper.contains(e.target)) return; // inside the player → keep open
    if (e.target.closest('[data-step="acs-play"]')) return; // the toggle handles itself
    hide();
  });

  // Mute toggle — via the dedicated control OR by clicking the video itself.
  const toggleMute = () => {
    wantsAudio = video.muted; // currently muted → user wants audio on
    setMuted(!wantsAudio);
    if (!video.muted) video.play?.().catch(() => {});
  };
  $(player).on('click.accVideo', '[data-player-control="mute"]', (e) => {
    e.preventDefault();
    toggleMute();
  });
  $(video).on('click.accVideo', (e) => {
    e.preventDefault();
    toggleMute();
  });
}
