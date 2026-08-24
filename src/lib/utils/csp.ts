/**
 * Content-Security-Policy header. Applied in `proxy.ts` so it covers every
 * response, including ones served straight from the cache.
 *
 * `'unsafe-inline'` on style-src is required by Next.js's injected critical CSS.
 * Script-src keeps `'unsafe-eval'` in development only — the dev overlay needs it.
 */
export function buildCsp(apiOrigin: string, isProduction: boolean): string {
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
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    'upgrade-insecure-requests',
  ].join('; ');
}
