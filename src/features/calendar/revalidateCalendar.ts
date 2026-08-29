'use server';

import { updateTag } from 'next/cache';

export async function revalidateCalendar(): Promise<void> {
  updateTag('calendar');
}
