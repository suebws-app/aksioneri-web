import { clientEnv } from '@/lib/utils/env.client';

let initialized = false;

export async function initPostHog(): Promise<void> {
  if (initialized) return;
  const key = clientEnv.NEXT_PUBLIC_POSTHOG_KEY;
  if (!key) return;
  if (process.env.NODE_ENV !== 'production') return;

  const posthog = (await import('posthog-js')).default;
  posthog.init(key, {
    api_host: clientEnv.NEXT_PUBLIC_POSTHOG_HOST,
    capture_pageview: true,
    opt_out_capturing_by_default: false,
    person_profiles: 'identified_only',
    property_denylist: ['$ip'],
  });
  initialized = true;
}
