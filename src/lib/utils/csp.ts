import { NEWS_IMAGE_HOSTS } from '@/config/news-image-hosts';

/**
 * Content-Security-Policy header. Applied in `proxy.ts` so it covers every
 * response, including ones served straight from the cache.
 *
 * `'unsafe-inline'` on style-src is required by Next.js's injected critical CSS.
 * Script-src keeps `'unsafe-eval'` in development only — the dev overlay needs it.
 *
 * **`'unsafe-inline'` in script-src is a deliberate trade-off.** The strict
 * alternative is a per-request nonce, but a nonce must differ on every
 * response, which forces every page to render dynamically — exactly the
 * SSG/ISR the marketing pages were just restored to. Until Next.js can stamp
 * nonces into cached HTML, the mitigations are (a) React's JSX escaping,
 * which never emits an unescaped `<script>` from data, and (b) the
 * `safeJsonLd` helper in `@/lib/seo/schemas`, which escapes `<` in every
 * JSON-LD block — the only place the app writes `dangerouslySetInnerHTML`.
 * Revisit when the caching story for nonces improves.
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
const originOf = (url: string): string => {
  try {
    return new URL(url).origin;
  } catch {
    return url;
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

/**
 * Image sources: the app itself (`next/image` serves optimised copies from
 * `/_next/image`), inline data/blob URIs, and the explicit publisher CDNs in
 * `NEWS_IMAGE_HOSTS` — the same allow-list `next.config.ts` gives the image
 * optimiser. A blanket `https:` would let an injected tag beacon to any host.
 */
const imgSrc = [
  "'self'",
  'data:',
  'blob:',
  ...NEWS_IMAGE_HOSTS.map((host) => `https://${host}`),
].join(' ');

interface CspExtras {
  /**
   * `NEXT_PUBLIC_POSTHOG_HOST` when analytics is on. PostHog's browser SDK
   * POSTs events to this host, so it MUST appear in `connect-src` — a bare
   * policy silently blocks every event and analytics look "broken" with no
   * visible error.
   */
  posthogHost?: string;
  /**
   * `NEXT_PUBLIC_SENTRY_DSN` when error tracking is on. The DSN's origin is
   * where the browser SDK POSTs error and transaction envelopes; without it
   * in `connect-src`, Sentry silently drops every event.
   */
  sentryDsn?: string;
}

export function buildCsp(
  apiUrl: string,
  isProduction: boolean,
  extras: CspExtras = {},
): string {
  const apiOrigin = originOf(apiUrl);
  const apiWsOrigin = wsOriginOf(apiOrigin);

  const scriptSrc = isProduction
    ? "'self' 'unsafe-inline'"
    : "'self' 'unsafe-inline' 'unsafe-eval'";

  // Compose connect-src from the API origin (HTTP + WS) and any telemetry
  // hosts the operator has enabled. Missing hosts are silently omitted, so a
  // deployment with no Sentry / PostHog carries no dead entries.
  const connectSources = new Set<string>(["'self'", apiOrigin, apiWsOrigin]);
  if (extras.posthogHost) {
    connectSources.add(originOf(extras.posthogHost));
  }
  if (extras.sentryDsn) {
    // A DSN is a URL of the form `https://<key>@<host>/<projectId>`; the
    // ingest endpoint the browser SDK talks to is `<host>` verbatim.
    connectSources.add(originOf(extras.sentryDsn));
  }
  const connectSrc = [...connectSources].join(' ');

  return [
    "default-src 'self'",
    `script-src ${scriptSrc}`,
    "style-src 'self' 'unsafe-inline'",
    `img-src ${imgSrc}`,
    "font-src 'self' data:",
    `connect-src ${connectSrc}`,
    "frame-src 'none'",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    'upgrade-insecure-requests',
  ].join('; ');
}
