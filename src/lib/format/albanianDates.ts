/**
 * Albanian day and month names, written out.
 *
 * **Not derived from `Intl`,** for the reason `features/calendar/formatDate.ts`
 * documents at length: Node ships full ICU and Chromium ships a subset, and
 * the two disagree about `sq`. A name formatted on the server and again during
 * hydration came out different, and React replaced the node.
 *
 * They live in `lib/` rather than beside the calendar because the date picker
 * needs them too, and a shared component may not import a feature — the
 * layering rule is enforced by `eslint-plugin-boundaries`.
 */

/** Sunday-first, matching `Date.prototype.getUTCDay()`. */
export const SQ_WEEKDAY_SHORT = [
  'die',
  'hën',
  'mar',
  'mër',
  'enj',
  'pre',
  'sht',
] as const;

export const SQ_WEEKDAY_LONG = [
  'e diel',
  'e hënë',
  'e martë',
  'e mërkurë',
  'e enjte',
  'e premte',
  'e shtunë',
] as const;

/** January-first, matching `Date.prototype.getUTCMonth()`. */
export const SQ_MONTH_LONG = [
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
] as const;
