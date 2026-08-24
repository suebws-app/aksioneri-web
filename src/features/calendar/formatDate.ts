import { formattingLocales, type Locale } from '@/i18n/config';

/**
 * Dates in the calendar are calendar days, not instants: "21 August" is the
 * same day for every reader. They are parsed as UTC midnight and formatted in
 * UTC so a reader west of Greenwich is never shown the previous day.
 */
const atUtcMidnight = (isoDate: string): Date =>
  new Date(`${isoDate}T00:00:00Z`);

/** "Fri 21" — the day-tab label. */
export const formatDayTab = (locale: Locale, isoDate: string): string =>
  new Intl.DateTimeFormat(formattingLocales[locale], {
    weekday: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  }).format(atUtcMidnight(isoDate));

/** "Monday 24 August" — the heading above a later day's table. */
export const formatLongDate = (locale: Locale, isoDate: string): string =>
  new Intl.DateTimeFormat(formattingLocales[locale], {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    timeZone: 'UTC',
  }).format(atUtcMidnight(isoDate));

/** "Friday, 21 August 2026 at 16:42" — the market timestamp on the homepage. */
export const formatTimestamp = (locale: Locale, iso: string): string =>
  new Intl.DateTimeFormat(formattingLocales[locale], {
    dateStyle: 'full',
    timeStyle: 'short',
    timeZone: 'UTC',
    hour12: false,
  }).format(new Date(iso));
