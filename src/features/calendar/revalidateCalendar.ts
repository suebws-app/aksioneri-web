'use server';

import { updateTag } from 'next/cache';

/**
 * Expire every fetch tagged `calendar` in Next.js' data cache, right now.
 *
 * Called by the client-side socket listener the instant the API pulses
 * `calendar-updated`, so the follow-up `router.refresh()` re-renders the
 * page against a fresh API response — the 60 s ISR window would otherwise
 * serve back the same body it just cached.
 *
 * Next.js 16: `updateTag` is the server-action equivalent of the old
 * `revalidateTag` — it flushes immediately (`revalidateTag` in 16
 * requires a `cacheLife` profile and is meant for scheduled expiry).
 */
export async function revalidateCalendar(): Promise<void> {
  updateTag('calendar');
}
