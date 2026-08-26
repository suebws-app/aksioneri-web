'use client';

import { useEffect } from 'react';
import { useConsent } from '@/lib/consent/consentContext';
import { initPostHog } from './posthog';
import { initSentry } from './sentry';

/**
 * Bridges the consent context to the tracking SDKs. Mounted once, high in
 * the tree, so promoting `status` from `unset` to `granted` — either via
 * the banner or programmatically — kicks off both inits idempotently.
 *
 * Renders nothing itself.
 */
export function TrackingBootstrap() {
  const { status } = useConsent();

  useEffect(() => {
    if (status !== 'granted') return;
    void initSentry();
    void initPostHog();
  }, [status]);

  return null;
}
