'use client';

import { useEffect } from 'react';
import { useConsent } from '@/lib/consent/consentContext';
import { initPostHog } from './posthog';
import { initSentry } from './sentry';

export function TrackingBootstrap() {
  const { status } = useConsent();

  useEffect(() => {
    if (status !== 'granted') return;
    void initSentry();
    void initPostHog();
  }, [status]);

  return null;
}
