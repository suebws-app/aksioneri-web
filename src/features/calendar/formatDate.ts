import { formattingLocales, type Locale } from '@/i18n/config';
import {
  SQ_MONTH_LONG,
  SQ_WEEKDAY_LONG,
  SQ_WEEKDAY_SHORT,
} from '@/lib/format/albanianDates';

const atUtcMidnight = (isoDate: string): Date =>
  new Date(`${isoDate}T00:00:00Z`);

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

export const formatTimestamp = (locale: Locale, iso: string): string => {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
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
