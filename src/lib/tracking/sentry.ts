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
 */
export async function initSentry(): Promise<void> {
  if (initialized) return;
  const dsn = clientEnv.NEXT_PUBLIC_SENTRY_DSN;
  if (!dsn) return;
  if (process.env.NODE_ENV !== 'production') return;

  const Sentry = await import('@sentry/browser');
  Sentry.init({
    dsn,
    tracesSampleRate: 0.1,
    // No session replay — an editorial site does not need surveillance
    // recordings, and replay adds real cost.
    replaysSessionSampleRate: 0,
    replaysOnErrorSampleRate: 0,
  });
  initialized = true;
}
