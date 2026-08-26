'use client';

import { useEffect, useRef } from 'react';
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

/** Count one page view, once per mount. */
export function useCalculatorView(slug: string): void {
  // A ref rather than an empty dependency array alone: React's dev-mode
  // double-invoke would otherwise count every view twice.
  const sent = useRef(false);

  useEffect(() => {
    if (sent.current) return;
    sent.current = true;
    send(slug, 'view');
  }, [slug]);
}

/** Report a deliberate action — a share, or the first calculation. */
export function reportCalculatorEvent(
  slug: string,
  event: CalculatorEvent,
): void {
  send(slug, event);
}
