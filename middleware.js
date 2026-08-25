// Shared-password gate for the Olto configurator demo (Vercel Edge Middleware).
// Server-side check per the project auth rule — nothing serves without the
// cookie, which is only set by POSTing the correct password to /gate.
// Password lives in the DEMO_PASSWORD env var (Vercel project settings).

const COOKIE = 'olto_gate';

export const config = { matcher: '/(.*)' };

async function token(pw) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(`olto:${pw}`));
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

export default async function middleware(req) {
  const pw = process.env.DEMO_PASSWORD;
  if (!pw) return page('Gate not configured', 500);

  const url = new URL(req.url);
  const expected = await token(pw);
  const cookies = req.headers.get('cookie') || '';

  // Authed — fall through to the static site
  if (cookies.includes(`${COOKIE}=${expected}`)) return undefined;

  if (req.method === 'POST' && url.pathname === '/gate') {
    let entered = '';
    try {
      entered = String((await req.formData()).get('password') || '');
    } catch {
      /* malformed body -> treated as wrong password */
    }
    if (entered === pw) {
      return new Response(null, {
        status: 302,
        headers: {
          Location: '/',
          'Set-Cookie': `${COOKIE}=${expected}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=2592000`,
        },
      });
    }
    return page('Incorrect password', 401);
  }

  return page('', 401);
}

function page(message, status) {
  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="robots" content="noindex" />
<title>Olto — Private Preview</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: 'Helvetica Now Text', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    background: #fff; color: #252525; min-height: 100vh;
    display: flex; align-items: center; justify-content: center; }
  .card { width: 100%; max-width: 340px; padding: 24px; text-align: center; }
  .mark { font-size: 12px; font-weight: 700; letter-spacing: 0.3em; text-indent: 0.3em; }
  h1 { margin-top: 28px; font-size: 20px; font-weight: 500; }
  p { margin-top: 8px; font-size: 13px; color: #6a6a6a; }
  input { width: 100%; margin-top: 24px; padding: 13px 16px; font-size: 15px;
    border: 1px solid #e5e5e5; border-radius: 0.625rem; outline: none; }
  input:focus { border-color: #252525; }
  button { width: 100%; margin-top: 12px; padding: 14px; font-size: 15px; font-weight: 500;
    border: 0; border-radius: 999px; background: #252525; color: #fff; cursor: pointer; }
  button:active { transform: translateY(1px); }
  .err { margin-top: 12px; font-size: 13px; color: #b44c47; min-height: 1.2em; }
</style>
</head>
<body>
  <div class="card">
    <div class="mark">INFINITE MACHINE</div>
    <h1>Olto configurator</h1>
    <p>Private preview — enter the password to continue.</p>
    <form method="POST" action="/gate">
      <input type="password" name="password" placeholder="Password" autofocus autocomplete="current-password" />
      <button type="submit">Enter</button>
      <div class="err">${message}</div>
    </form>
  </div>
</body>
</html>`;
  return new Response(html, { status, headers: { 'Content-Type': 'text/html; charset=utf-8' } });
}
