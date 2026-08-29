const MIN_PER_HOUR = 60;
const MIN_PER_DAY = MIN_PER_HOUR * 24;
const MIN_PER_WEEK = MIN_PER_DAY * 7;
const MIN_PER_MONTH = MIN_PER_DAY * 30;
const MIN_PER_YEAR = MIN_PER_DAY * 365;

type Translator = (
  key: string,
  values?: Record<string, string | number>,
) => string;

export function formatMinutesAgo(minutesAgo: number, t: Translator): string {
  const minutes = Math.max(0, Math.floor(minutesAgo));

  if (minutes < MIN_PER_HOUR) {
    return t('minutesAgo', { minutes });
  }
  if (minutes < MIN_PER_DAY) {
    return t('hoursAgo', { hours: Math.floor(minutes / MIN_PER_HOUR) });
  }
  if (minutes < MIN_PER_WEEK) {
    return t('daysAgo', { days: Math.floor(minutes / MIN_PER_DAY) });
  }
  if (minutes < MIN_PER_MONTH) {
    return t('weeksAgo', { weeks: Math.floor(minutes / MIN_PER_WEEK) });
  }
  if (minutes < MIN_PER_YEAR) {
    return t('monthsAgo', { months: Math.floor(minutes / MIN_PER_MONTH) });
  }
  return t('yearsAgo', { years: Math.floor(minutes / MIN_PER_YEAR) });
}
