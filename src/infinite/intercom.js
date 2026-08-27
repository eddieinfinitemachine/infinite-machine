// "Talk to a rep" → Infinite Machine's own Intercom messenger, opened over the
// configurator instead of navigating to /contact (Eddie, Aug 26 pm: "talk to a
// rep should open up a pop up that messages IM intercom from that screen").
//
// APP_ID is the public widget id the live infinitemachine.com site boots with
// — the same workspace the team already answers from, so a demo conversation
// lands in the normal inbox with the visitor's build attached.
//
// The widget is loaded on boot but its launcher is hidden: the demo has its own
// entry point and shouldn't grow a floating bubble over the order bar. Loading
// early (rather than on click) is what lets the click decide synchronously
// whether to open the messenger or fall through to the anchor's href — no
// popup-blocked window.open from an async callback.
//
// Intercom only serves the messenger on domains the workspace trusts, so the
// load is preflighted: the same /messenger/web/ping the widget calls answers
// 403 "This domain has not been trusted for the Intercom app defined in the
// JavaScript snippet" everywhere else, and there is no point booting a widget
// that will refuse to open. Preview/demo hosts have to be added under
// Intercom → Settings → Channels → Messenger → trusted domains.

const APP_ID = 'nd875425';
const API_BASE = 'https://api-iam.intercom.io';

let status = 'idle'; // idle | checking | ready | blocked

export async function initRepChat() {
  if (status !== 'idle' || typeof window === 'undefined') return;
  status = 'checking';

  if (!(await domainTrusted())) {
    status = 'blocked';
    console.info(
      `[Infinite] Intercom messenger unavailable on ${window.location.host} — ` +
        'add the domain to the workspace’s trusted domains; "Talk to a rep" ' +
        'falls back to the contact page until then.'
    );
    return;
  }

  window.intercomSettings = {
    api_base: API_BASE,
    app_id: APP_ID,
    hide_default_launcher: true,
  };

  // Call stub — queues anything sent before widget.js lands so a very fast
  // click still replays into the real messenger once it boots.
  if (typeof window.Intercom !== 'function') {
    const queue = function (...args) {
      queue.c(args);
    };
    queue.q = [];
    queue.c = (args) => queue.q.push(args);
    window.Intercom = queue;
  }

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://widget.intercom.io/widget/${APP_ID}`;
  script.onload = () => {
    status = 'ready';
    window.Intercom('boot', window.intercomSettings);
  };
  script.onerror = () => {
    status = 'blocked';
    console.warn('[Infinite] Intercom failed to load — rep link falls back to /contact');
  };
  document.head.appendChild(script);
}

async function domainTrusted() {
  try {
    const res = await fetch(`${API_BASE}/messenger/web/ping`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ app_id: APP_ID, referer: window.location.href }),
    });
    return res.ok;
  } catch {
    // Offline, ad-blocked, or CORS-refused — same answer either way
    return false;
  }
}

// `booted` is set by Intercom's own bootstrap once it has installed the
// messenger frame — the honest "will showNewMessage do anything?" signal. It
// stays false when Intercom declines to boot at all (its loader skips any UA
// matching /bot|crawler|headlesschrome|.../), which is exactly when the click
// should fall through to the contact page instead of being swallowed.
export function repChatReady() {
  return status === 'ready' && typeof window.Intercom === 'function' && window.Intercom.booted;
}

// Opens the messenger with the composer prefilled. Returns false when the
// widget isn't available, so the caller can leave the link alone and let the
// browser follow it to the contact page.
export function openRepChat({ message, lead } = {}) {
  if (!repChatReady()) return false;
  try {
    if (lead?.email) {
      window.Intercom('update', {
        name: [lead.first, lead.last].filter(Boolean).join(' ') || undefined,
        email: lead.email,
        phone: lead.phone || undefined,
      });
    }
    window.Intercom('showNewMessage', message || '');
    return true;
  } catch (err) {
    console.warn('[Infinite] Intercom refused to open:', err);
    return false;
  }
}
