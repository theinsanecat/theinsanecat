// Privacy-friendly page-view counting with GoatCounter (no cookies, no third-party script):
// each view is one small image request to the account's /count endpoint.
// Not counted: local dev, the /preview/ copy, and automated browsers (tests, crawlers that say so).
const ENDPOINT = 'https://soumyadwivedi.goatcounter.com/count';
const SITE_BASE = '/theinsanecat';

const shouldCount = () => {
  if (typeof window === 'undefined') return false;
  const { hostname, pathname } = window.location;
  if (hostname === 'localhost' || hostname === '127.0.0.1' || hostname.endsWith('.local')) return false;
  if (pathname.startsWith(`${SITE_BASE}/preview`)) return false;
  if (navigator.webdriver) return false;
  return true;
};

let firstView = true;
const send = (params) => {
  const q = new URLSearchParams({ ...params, s: `${window.screen.width}`, rnd: Math.random().toString(36).slice(2) });
  const img = new Image();
  img.referrerPolicy = 'no-referrer-when-downgrade';
  img.src = `${ENDPOINT}?${q}`;
};

// pathname: the app route, e.g. '/', '/about'
export const countPageView = (pathname) => {
  if (!shouldCount()) return;
  const params = { p: pathname || '/', t: document.title };
  if (firstView && document.referrer) params.r = document.referrer; // where the visitor came from (LinkedIn etc.)
  firstView = false;
  send(params);
};

// Named events, e.g. countEvent('resume-open'): shown separately in the dashboard
export const countEvent = (name) => {
  if (!shouldCount()) return;
  send({ p: name, t: name, e: 'true' });
};
