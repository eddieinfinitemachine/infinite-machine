import $ from '../lib/jquery.js';

// Click-to-open instruction-video MODAL for accessories. Same behavior on desktop
// and touch: click an accessory's play trigger → the modal opens and plays the
// clip WITH SOUND (the click is a user gesture, so unmuted autoplay is allowed;
// we fall back to muted only if a browser blocks it). The modal shows the
// accessory name and closes on the close button, ESC, or any click OUTSIDE the
// player. No hover, no positioning — it's a plain modal styled in Webflow.
//
// Markup (Webflow):
//   [data-bunny-lightbox-status]            modal wrapper — we toggle active/not-active
//     [data-bunny-lightbox-title]           filled with the accessory name
//     [data-bunny-lightbox-init]            .checkout_vid-player — the player
//       <video>
//       [data-player-control="mute"]        mute toggle ([data-player-muted] drives the icon)
//     [data-bunny-lightbox-close]           close button (anything outside the player closes)
//   [data-accessory-handle] [data-step="acs-play"]  the per-card trigger
//
// The play trigger is shown only on accessories whose custom.instruction_video
// metafield is filled. Video URL = product.instructionVideo (Bunny .m3u8).
// Needs hls.js (window.Hls); Safari plays HLS natively without it.

export function initAccessoryVideo(config, products) {
  if (!products.accessories?.length) return;

  const wrapper = document.querySelector('[data-bunny-lightbox-status]');
  const player = wrapper?.querySelector('[data-bunny-lightbox-init]');
  const video = player?.querySelector('video');
  if (!wrapper || !player || !video) {
    console.warn('[AccessoryVideo] No [data-bunny-lightbox-status] modal on page — video disabled');
    return;
  }

  // handle → { url, title }. Falls back to config.testInstructionVideo (TEMP) for
  // the clip CONTENT during testing.
  const fallback = config.testInstructionVideo || null;
  const byHandle = new Map();
  for (const p of products.accessories) {
    const url = p.instructionVideo || fallback;
    if (url) byHandle.set(p.handle, { url, title: p.title });
  }
  if (!byHandle.size) {
    console.log('[AccessoryVideo] No accessories have an instruction video — nothing to wire');
    return;
  }

  // Show the play trigger ONLY on accessories whose REAL metafield is filled
  // (not the test fallback) — items without a video hide their trigger.
  const withMetafield = new Set(
    products.accessories.filter((p) => p.instructionVideo).map((p) => p.handle)
  );
  document.querySelectorAll('[data-accessory-handle]').forEach((card) => {
    if (withMetafield.has(card.getAttribute('data-accessory-handle'))) return;
    card.querySelectorAll('[data-step="acs-play"]').forEach((el) => {
      el.style.display = 'none';
    });
  });

  // HLS source loading: Safari plays .m3u8 natively; elsewhere attach hls.js once
  // and swap sources via loadSource.
  const isSafariNative = !!video.canPlayType('application/vnd.apple.mpegurl');
  const canUseHls = !isSafariNative && !!(window.Hls && window.Hls.isSupported());
  let hls = null;
  const loadSource = (url) => {
    if (isSafariNative) {
      video.src = url;
    } else if (canUseHls) {
      if (!hls) {
        hls = new window.Hls({ maxBufferLength: 30 });
        hls.attachMedia(video);
      }
      hls.loadSource(url);
    } else {
      video.src = url; // last resort
    }
  };

  // Reflect mute state onto the player so the icon CSS ([data-player-muted]) flips.
  const setMuted = (m) => {
    video.muted = m;
    player.setAttribute('data-player-muted', m ? 'true' : 'false');
  };

  // Super-basic progress bar. Uses a Webflow-provided [data-video-progress] fill
  // if present (style it yourself); otherwise injects a minimal bar pinned to the
  // bottom of the player. Read-only — just shows how far along the clip is.
  let $progress = $(player).find('[data-video-progress]').first();
  if (!$progress.length) {
    const $track = $(
      '<div data-video-timeline style="position:absolute;left:0;right:0;bottom:0;height:3px;' +
        'background:rgba(255,255,255,.25);z-index:5;pointer-events:none;"></div>'
    );
    $progress = $('<div data-video-progress style="height:100%;width:0%;background:#fff;"></div>');
    $track.append($progress);
    $(player).append($track);
  }
  // Drive the fill every animation frame while playing (not on the ~4Hz
  // timeupdate event) so it moves smoothly instead of jumping. Don't put a
  // CSS transition on the fill — the per-frame update already makes it smooth.
  const updateProgress = () => {
    $progress.css('width', (video.duration ? (video.currentTime / video.duration) * 100 : 0) + '%');
  };
  let rafId = null;
  const runProgress = () => {
    updateProgress();
    if (!video.paused && !video.ended) rafId = requestAnimationFrame(runProgress);
  };
  video.addEventListener('play', () => {
    cancelAnimationFrame(rafId);
    runProgress();
  });
  video.addEventListener('pause', () => cancelAnimationFrame(rafId));
  video.addEventListener('ended', () => cancelAnimationFrame(rafId));

  const isOpen = () => wrapper.getAttribute('data-bunny-lightbox-status') === 'active';

  const open = (triggerEl) => {
    const card = triggerEl.closest('[data-accessory-handle]');
    if (!card) return;
    const entry = byHandle.get(card.getAttribute('data-accessory-handle'));
    if (!entry) return;

    wrapper.querySelectorAll('[data-bunny-lightbox-title]').forEach((el) => {
      el.textContent = entry.title;
    });
    loadSource(entry.url);
    setMuted(false); // sound by default — the click is a user gesture
    $progress.css('width', '0%'); // reset the bar for the new clip
    wrapper.setAttribute('data-bunny-lightbox-status', 'active');

    // play() is called within the click's call stack, so user activation allows
    // unmuted playback. If a browser still blocks it, fall back to muted.
    const p = video.play?.();
    if (p && typeof p.then === 'function') {
      p.catch(() => {
        setMuted(true);
        video.play?.().catch(() => {});
      });
    }
  };

  const close = () => {
    wrapper.setAttribute('data-bunny-lightbox-status', 'not-active');
    video.pause?.();
  };

  // Auto-close when the clip finishes (open() reloads the source, so the next
  // open starts from the beginning).
  video.addEventListener('ended', close);

  // Open on clicking a play trigger — identical on desktop and touch.
  $(document).on('click.accVideo', '[data-accessory-handle] [data-step="acs-play"]', function (e) {
    e.preventDefault();
    open(this);
  });

  // Inside the modal: the mute control toggles audio; anything OUTSIDE the player
  // (backdrop, title, close button) closes it.
  $(wrapper).on('click.accVideo', (e) => {
    if (player.contains(e.target)) {
      const muteBtn = e.target.closest('[data-player-control="mute"]');
      if (muteBtn) {
        e.preventDefault();
        setMuted(!video.muted);
        if (!video.muted) video.play?.().catch(() => {});
      }
      return; // other clicks inside the player do nothing (don't close)
    }
    close();
  });

  // ESC closes the modal.
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen()) close();
  });
}
