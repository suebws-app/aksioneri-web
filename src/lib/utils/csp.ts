/**
 * Content-Security-Policy header. Applied in `proxy.ts` so it covers every
 * response, including ones served straight from the cache.
 *
 * `'unsafe-inline'` on style-src is required by Next.js's injected critical CSS.
 * Script-src keeps `'unsafe-eval'` in development only — the dev overlay needs it.
 *
 * TradingView's ticker tape is the one third party allowed in, and only as a
 * frame: it is embedded as a plain iframe rather than through their loader
 * script, so `script-src` stays closed to third parties. Whatever the tape
 * fetches, it fetches under its own origin's policy, not ours.
 */
const TRADINGVIEW_FRAMES = 'https://www.tradingview-widget.com';
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

export function buildCsp(apiUrl: string, isProduction: boolean): string {
  const apiOrigin = originOf(apiUrl);

  const scriptSrc = isProduction
    ? "'self' 'unsafe-inline'"
    : "'self' 'unsafe-inline' 'unsafe-eval'";

  return [
    "default-src 'self'",
    `script-src ${scriptSrc}`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob: https:",
    "font-src 'self' data:",
    `connect-src 'self' ${apiOrigin}`,
    `frame-src ${TRADINGVIEW_FRAMES}`,
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    'upgrade-insecure-requests',
  ].join('; ');
}
