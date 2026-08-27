import { clientEnv } from '@/lib/utils/env.client';

let initialized = false;

/**
 * Lazy-initialises Sentry after cookie consent is granted. The SDK is
 * dynamically imported so its ~40 KB stays out of the initial bundle for
 * every reader — only those who consented pay the download cost.
 *
 * Disabled in development so `pnpm dev` errors surface in the browser
 * overlay instead of getting funnelled to Sentry. Disabled entirely when
 * `NEXT_PUBLIC_SENTRY_DSN` is unset so a local without the env var runs
 * as if Sentry did not exist.
 *
 * PII scrubbing: `sendDefaultPii` is off, and `beforeSend` strips request
 * cookies, authorization/CSRF headers, and any hydrated user object before
 * the event leaves the browser. Zustand-style app state occasionally lands
 * in `event.contexts` (a search query, a form draft); it is dropped too.
 */
export async function initSentry(): Promise<void> {
  if (initialized) return;
  const dsn = clientEnv.NEXT_PUBLIC_SENTRY_DSN;
  if (!dsn) return;
  if (process.env.NODE_ENV !== 'production') return;

  const Sentry = await import('@sentry/browser');
  Sentry.init({
    dsn,
    release: process.env.NEXT_PUBLIC_SENTRY_RELEASE || undefined,
    environment: process.env.NODE_ENV,
    tracesSampleRate: Number(
      process.env.NEXT_PUBLIC_SENTRY_TRACES_SAMPLE_RATE ?? '0.1',
    ),
    sendDefaultPii: false,
    // No session replay — an editorial site does not need surveillance
    // recordings, and replay adds real cost.
    replaysSessionSampleRate: 0,
    replaysOnErrorSampleRate: 0,
    beforeSend(event) {
      // Any hydrated user object may hold email/name; drop the whole object
      // rather than risk missing a field the SDK grew later.
      if (event.user) {
        event.user = undefined;
      }
      if (event.request) {
        // `cookies` is Sentry's own dict on the request node — clear it.
        if ('cookies' in event.request) {
          delete (event.request as { cookies?: unknown }).cookies;
        }
        if (event.request.headers) {
          const headers = event.request.headers as Record<string, unknown>;
          delete headers.cookie;
          delete headers.Cookie;
          delete headers.authorization;
          delete headers.Authorization;
          delete headers['x-csrf-token'];
          delete headers['X-CSRF-Token'];
        }
        if (typeof event.request.query_string === 'string') {
          // Strip a `token=...` param from any query string that made it into
          // the event — reset-password flows carry secrets there.
          event.request.query_string = event.request.query_string.replace(
            /(^|&)token=[^&]*/g,
            '$1token=[Filtered]',
          );
        }
      }
      // App state — Zustand snapshots and similar — can carry the reader's
      // in-flight search query or form draft. Strip contexts other than the
      // browser/runtime ones the SDK adds itself.
      if (event.contexts) {
        for (const key of Object.keys(event.contexts)) {
          if (key !== 'browser' && key !== 'runtime' && key !== 'os') {
            delete event.contexts[key];
          }
        }
      }
      return event;
    },
  });
  initialized = true;
}
