import { formattingLocales, type Locale } from '@/i18n/config';

/**
 * Dates in the calendar are calendar days, not instants: "21 August" is the
 * same day for every reader. They are parsed as UTC midnight and formatted in
 * UTC so a reader west of Greenwich is never shown the previous day.
 */
const atUtcMidnight = (isoDate: string): Date =>
  new Date(`${isoDate}T00:00:00Z`);

/**
 * Hard-coded Kosovar Albanian tables for weekday / month names.
 *
 * Node's Intl (full ICU) and Chromium's Intl (subset ICU) disagree on
 * `sq` and `sq-AL` — the server renders `hën, 24` while the browser
 * falls back to `24 Mon`, and that mismatch breaks hydration. Since
 * this codebase's `sq` locale is fixed Kosovar Albanian, we bypass Intl
 * for the language-dependent parts and compose the strings ourselves.
 * Server and client agree byte-for-byte.
 */
const SQ_WEEKDAY_SHORT = ['die', 'hën', 'mar', 'mër', 'enj', 'pre', 'sht'];
const SQ_WEEKDAY_LONG = [
  'e diel',
  'e hënë',
  'e martë',
  'e mërkurë',
  'e enjte',
  'e premte',
  'e shtunë',
];
const SQ_MONTH_LONG = [
  'janar',
  'shkurt',
  'mars',
  'prill',
  'maj',
  'qershor',
  'korrik',
  'gusht',
  'shtator',
  'tetor',
  'nëntor',
  'dhjetor',
];

/** "hën 21" — the day-tab label. */
export const formatDayTab = (locale: Locale, isoDate: string): string => {
  if (locale === 'sq') {
    const d = atUtcMidnight(isoDate);
    return `${SQ_WEEKDAY_SHORT[d.getUTCDay()]} ${d.getUTCDate()}`;
  }
  return new Intl.DateTimeFormat(formattingLocales[locale], {
    weekday: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  }).format(atUtcMidnight(isoDate));
};

/** "e hënë, 24 gusht" — the heading above a later day's table. */
export const formatLongDate = (locale: Locale, isoDate: string): string => {
  if (locale === 'sq') {
    const d = atUtcMidnight(isoDate);
    return `${SQ_WEEKDAY_LONG[d.getUTCDay()]}, ${d.getUTCDate()} ${SQ_MONTH_LONG[d.getUTCMonth()]}`;
  }
  return new Intl.DateTimeFormat(formattingLocales[locale], {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    timeZone: 'UTC',
  }).format(atUtcMidnight(isoDate));
};

/** "e premte, 21 gusht 2026, 16:42" — the market timestamp on the homepage. */
export const formatTimestamp = (locale: Locale, iso: string): string => {
  const d = new Date(iso);
  if (locale === 'sq') {
    const hh = String(d.getUTCHours()).padStart(2, '0');
    const mm = String(d.getUTCMinutes()).padStart(2, '0');
    return `${SQ_WEEKDAY_LONG[d.getUTCDay()]}, ${d.getUTCDate()} ${SQ_MONTH_LONG[d.getUTCMonth()]} ${d.getUTCFullYear()}, ${hh}:${mm}`;
  }
  return new Intl.DateTimeFormat(formattingLocales[locale], {
    dateStyle: 'full',
    timeStyle: 'short',
    timeZone: 'UTC',
    hour12: false,
  }).format(d);
};
