/**
 * Turn the API's `minutesAgo` number into a human age like "3 orë më parë"
 * or "2 javë më parë".
 *
 * Only one unit is shown, the largest that still reads naturally:
 *
 *   < 60 min      → minutes  ("42 min më parë")
 *   < 24 h        → hours    ("6 orë më parë")
 *   < 7 d         → days     ("3 ditë më parë")
 *   < 30 d        → weeks    ("2 javë më parë")
 *   < 365 d       → months   ("5 muaj më parë")
 *   otherwise     → years    ("1 vit më parë" / "3 vjet më parë")
 *
 * Cascading like this is what stops the card ever reading "99 orë më parë"
 * or "220 min më parë" — a wire story is either recent (in hours) or old
 * (in a coarser unit), never one described in units too fine to be read at
 * a glance.
 */

const MIN_PER_HOUR = 60;
const MIN_PER_DAY = MIN_PER_HOUR * 24;
const MIN_PER_WEEK = MIN_PER_DAY * 7;
/** ~30 is the number every "months ago" widget uses; nobody expects it to be exact. */
const MIN_PER_MONTH = MIN_PER_DAY * 30;
const MIN_PER_YEAR = MIN_PER_DAY * 365;

/**
 * The translator shape we need. Deliberately loose (a callable that takes a
 * key + a values object): the concrete `t` returned by next-intl's
 * `useTranslations('news')` satisfies it, but this helper stays usable from
 * anywhere without a `Messages`-typed generic.
 */
type Translator = (
  key: string,
  values?: Record<string, string | number>,
) => string;

export function formatMinutesAgo(minutesAgo: number, t: Translator): string {
  // `minutesAgo` comes off the wire as a non-negative integer, but the
  // Math.max here means a client clock skew (client thinks the story is in
  // the future) shows as "0 min më parë" rather than a negative number.
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
