import { clientEnv } from '@/lib/utils/env.client';

let initialized = false;

/**
 * Lazy-initialises PostHog after cookie consent is granted. Same shape
 * and reasoning as `initSentry` — dynamic import, disabled without a
 * key, no-op in development.
 */
export async function initPostHog(): Promise<void> {
  if (initialized) return;
  const key = clientEnv.NEXT_PUBLIC_POSTHOG_KEY;
  if (!key) return;
  if (process.env.NODE_ENV !== 'production') return;

  const posthog = (await import('posthog-js')).default;
  posthog.init(key, {
    api_host: clientEnv.NEXT_PUBLIC_POSTHOG_HOST,
    // PostHog listens to `history.pushState` for Next.js soft-navigations,
    // so an SPA hop registers as a real pageview.
    capture_pageview: true,
    // Respect the reader's opt-out at the SDK level too, in case a
    // future change moves init before consent gating.
    opt_out_capturing_by_default: false,
  });
  initialized = true;
}
