'use client';

import { useCallback, useEffect, useRef } from 'react';
import { useConsent } from '@/lib/consent/consentContext';
import { clientEnv } from '@/lib/utils/env.client';

/**
 * Records that a calculator was opened or used.
 *
 * **`sendBeacon`, never `fetch`.** A beacon is queued by the browser and
 * survives the page being closed, which is exactly when a "share" or a final
 * "compute" happens. It is also fire-and-forget by design: nothing here is
 * awaited, nothing blocks a render, and a failure is silently dropped — a
 * counter is not worth a single visible error.
 *
 * **Consent-gated.** The site promises a working "Menaxho cookies" control,
 * so no analytics event fires until the reader has explicitly granted
 * consent. Necessary cookies (session, CSRF, learn progress) are exempt and
 * remain outside this gate; a calculator counter is not necessary.
 *
 * What is sent is a slug and an event name. Nothing else. The reader's
 * inputs — their salary, their mortgage, their pension — never leave the
 * browser, and the API's request schema is `.strict()` so they could not be
 * stored even if a future change tried to attach them.
 */

type CalculatorEvent = 'view' | 'compute' | 'share';

function send(slug: string, event: CalculatorEvent): void {
  if (typeof navigator === 'undefined' || !('sendBeacon' in navigator)) return;

  try {
    const url = `${clientEnv.NEXT_PUBLIC_API_URL}/calculators/events`;
    const body = new Blob([JSON.stringify({ slug, event })], {
      type: 'application/json',
    });

    navigator.sendBeacon(url, body);
  } catch {
    // A counter must never surface as an error to a reader.
  }
}

/** Count one page view, once per mount — only after consent. */
export function useCalculatorView(slug: string): void {
  const { status } = useConsent();
  // A ref rather than an empty dependency array alone: React's dev-mode
  // double-invoke would otherwise count every view twice.
  const sent = useRef(false);

  useEffect(() => {
    if (status !== 'granted') return;
    if (sent.current) return;
    sent.current = true;
    send(slug, 'view');
  }, [slug, status]);
}

/**
 * Returns a reporter for deliberate actions — a share, or the first
 * calculation. The returned function is a stable callback that silently
 * no-ops when consent has not been granted.
 *
 * Replaces the previous standalone `reportCalculatorEvent` export, which
 * fired regardless of consent and quietly broke the cookie-banner promise.
 */
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
