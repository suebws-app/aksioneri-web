'use client';

import { useCallback, useEffect, useRef } from 'react';
import { useConsent } from '@/lib/consent/consentContext';
import { clientEnv } from '@/lib/utils/env.client';

type CalculatorEvent = 'view' | 'compute' | 'share';

function send(slug: string, event: CalculatorEvent): void {
  if (typeof navigator === 'undefined' || !('sendBeacon' in navigator)) return;

  try {
    const url = `${clientEnv.NEXT_PUBLIC_API_URL}/calculators/events`;
    const body = new Blob([JSON.stringify({ slug, event })], {
      type: 'application/json',
    });

    navigator.sendBeacon(url, body);
  } catch {}
}

export function useCalculatorView(slug: string): void {
  const { status } = useConsent();
  const sent = useRef(false);

  useEffect(() => {
    if (status !== 'granted') return;
    if (sent.current) return;
    sent.current = true;
    send(slug, 'view');
  }, [slug, status]);
}

export function useCalculatorReporter(): (
  slug: string,
  event: CalculatorEvent,
) => void {
  const { status } = useConsent();
  return useCallback(
    (slug: string, event: CalculatorEvent) => {
      if (status !== 'granted') return;
      send(slug, event);
    },
    [status],
  );
}
