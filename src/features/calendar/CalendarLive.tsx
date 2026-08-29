'use client';

import { useEffect } from 'react';
import { useRouter } from '@/i18n/navigation';
import { calendarSocket } from '@/lib/websockets/calendarSocket';
import { revalidateCalendar } from './revalidateCalendar';

export function CalendarLive() {
  const router = useRouter();

  useEffect(() => {
    return calendarSocket.onUpdate(() => {
      void revalidateCalendar().then(() => router.refresh());
    });
  }, [router]);

  return null;
}
