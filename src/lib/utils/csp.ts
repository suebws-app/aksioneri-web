/**
 * Content-Security-Policy header. Applied in `proxy.ts` so it covers every
 * response, including ones served straight from the cache.
 *
 * `'unsafe-inline'` on style-src is required by Next.js's injected critical CSS.
 * Script-src keeps `'unsafe-eval'` in development only — the dev overlay needs it.
 *
 * No third-party iframes are permitted: the markets pages used to embed a
 * TradingView widget frame, but the ticker and charts now render from
 * aksioneri-api's `/markets` endpoints, so `frame-src` is closed.
 */

/**
 * `NEXT_PUBLIC_API_URL` carries a path (`http://localhost:4000/api`), and a CSP
 * source expression that includes a path matches only that exact path. Left
 * as-is it permits `/api` and blocks every `/api/news?…` the browser asks for,
 * which stayed invisible for as long as nothing fetched client-side.
 */
const originOf = (apiUrl: string): string => {
  try {
    return new URL(apiUrl).origin;
  } catch {
    return apiUrl;
  }
};

/**
 * WebSocket origin twin for `connect-src`. Chromium and Firefox reject a
 * `ws://<host>` connection when the policy only lists `http://<host>` —
 * they treat schemes as distinct, spec-notwithstanding — so both variants
 * have to be enumerated. The markets Socket.io gateway upgrades to `ws://`
 * (or `wss://` in production) on the API origin, and that upgrade is what
 * this expression clears.
 */
const wsOriginOf = (httpOrigin: string): string =>
  httpOrigin.replace(/^http:/, 'ws:').replace(/^https:/, 'wss:');

export function buildCsp(apiUrl: string, isProduction: boolean): string {
  const apiOrigin = originOf(apiUrl);
  const apiWsOrigin = wsOriginOf(apiOrigin);

  const scriptSrc = isProduction
    ? "'self' 'unsafe-inline'"
    : "'self' 'unsafe-inline' 'unsafe-eval'";

  return [
    "default-src 'self'",
    `script-src ${scriptSrc}`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob: https:",
    "font-src 'self' data:",
    `connect-src 'self' ${apiOrigin} ${apiWsOrigin}`,
    "frame-src 'none'",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    'upgrade-insecure-requests',
  ].join('; ');
}
