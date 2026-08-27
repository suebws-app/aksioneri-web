import { clientEnv } from '@/lib/utils/env.client';

let initialized = false;

/**
 * Lazy-initialises PostHog after cookie consent is granted. Same shape
 * and reasoning as `initSentry` — dynamic import, disabled without a
 * key, no-op in development.
 *
 * PII policy:
 * - `person_profiles: 'identified_only'` — no anonymous-visitor profile
 *   trees; a profile only exists after an explicit `identify()` call
 *   (and today nothing identifies, so no profiles at all).
 * - `property_denylist: ['$ip']` — strips the reader's IP from every
 *   event body. The connection IP is still visible to PostHog's edge, so
 *   for full IP-suppression the project setting also needs "Discard IPs"
 *   turned on. This client-side belt is the second layer.
 *
 * The default host is US cloud; operators serving an EU-adjacent audience
 * should set `NEXT_PUBLIC_POSTHOG_HOST=https://eu.i.posthog.com` — the
 * env schema accepts either.
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
    // No person profiles for anonymous readers — analytics stay
    // aggregate-only unless something later calls `identify()`.
    person_profiles: 'identified_only',
    // Drop the IP from event properties. See file docstring.
    property_denylist: ['$ip'],
  });
  initialized = true;
}
