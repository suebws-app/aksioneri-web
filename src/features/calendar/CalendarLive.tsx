'use client';

import { useEffect } from 'react';
import { useRouter } from '@/i18n/navigation';
import { calendarSocket } from '@/lib/websockets/calendarSocket';
import { revalidateCalendar } from './revalidateCalendar';

/**
 * Invisible client mount that connects to the calendar Socket.io namespace
 * and refreshes the page whenever the API pulses `calendar-updated`.
 *
 * Two-step refresh so an ISR-cached body does not paper over new data:
 *   1. Server action `revalidateCalendar()` flushes the `'calendar'` tag
 *      in Next.js' data cache.
 *   2. `router.refresh()` re-runs the server components; the calendar
 *      fetch now misses the cache and pulls the fresh week.
 *
 * A dropped socket costs live updates for that tab, nothing else — the
 * 60 s ISR still refreshes on the next reload.
 */
export function CalendarLive() {
  const router = useRouter();

  useEffect(() => {
    return calendarSocket.onUpdate(() => {
      void revalidateCalendar().then(() => router.refresh());
    });
  }, [router]);

  return null;
}
