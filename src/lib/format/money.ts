/**
 * Money and percentage formatting for Albanian readers.
 *
 * **This module deliberately never calls `Intl`.** The reason is the one
 * `src/features/calendar/formatDate.ts` documents for dates: Node ships full
 * ICU while Chromium ships a subset, and the two disagree about `sq`. A date
 * formatted on the server and re-formatted during hydration came out
 * different, and React replaced the node.
 *
 * A calculator makes that worse, not better. Every figure is server-rendered
 * so the page works with JavaScript off, then hydrated so it can update as the
 * reader types. If `Intl.NumberFormat('sq')` groups with `.` on the server and
 * `,` in the browser, every result on the page mismatches on first paint.
 *
 * So the digits are grouped by hand. The rules are Kosovar Albanian and match
 * the euro area: `.` between thousands, `,` before decimals, currency symbol
 * after the number with a non-breaking space — `1.234,56 €`.
 *
 * Negatives use U+2212 MINUS SIGN rather than a hyphen, the same choice
 * `ChangeValue.tsx` makes: in IBM Plex Mono the true minus has the width of a
 * digit, so a column of figures stays aligned.
 */

/**
 * The currencies the site-wide toggle offers.
 *
 * Narrower than what `formatMoney` accepts on purpose: the toggle is a
 * two-way editorial choice, while a converter can produce any of seventeen
 * currencies and must be able to label all of them.
 */
export type Currency = 'EUR' | 'USD';

/**
 * Symbols for the currencies that have a widely-recognised one.
 *
 * Anything absent falls back to its ISO code — `1.000,00 SEK` rather than a
 * glyph most readers would misread. A wrong symbol is worse than no symbol:
 * `kr` alone does not say whether it is Swedish, Norwegian or Danish.
 */
const SYMBOL: Record<string, string> = {
  EUR: '€',
  USD: '$',
  GBP: '£',
  JPY: '¥',
  CHF: 'CHF',
};

const symbolFor = (currency: string): string => SYMBOL[currency] ?? currency;

const MINUS = '−';
const NBSP = ' ';

const GROUP_SEPARATOR = '.';
const DECIMAL_SEPARATOR = ',';

/**
 * Group the integer part in threes, from the right.
 *
 * Written out rather than done with a lookahead regex because the regex form
 * (`/\B(?=(\d{3})+(?!\d))/g`) silently mangles anything that is not already a
 * bare digit string, and this receives the output of `toFixed`.
 */
function groupThousands(digits: string): string {
  const firstGroup = digits.length % 3 || 3;
  const groups: string[] = [digits.slice(0, firstGroup)];

  for (let i = firstGroup; i < digits.length; i += 3) {
    groups.push(digits.slice(i, i + 3));
  }

  return groups.join(GROUP_SEPARATOR);
}

/**
 * A finite number as grouped digits, sign handled separately.
 *
 * Non-finite input is the caller's bug, but a `NaN` reaching a reader is worse
 * than an em dash, so it degrades rather than throws — the calculators refuse
 * to compute at all in that case, and this is the last line of defence.
 */
function formatDigits(value: number, decimals: number): string | null {
  if (!Number.isFinite(value)) return null;

  const fixed = Math.abs(value).toFixed(decimals);
  const [whole = '0', fraction] = fixed.split('.');

  const grouped = groupThousands(whole);
  return fraction ? `${grouped}${DECIMAL_SEPARATOR}${fraction}` : grouped;
}

/** What a figure degrades to when it cannot be formatted. */
const PLACEHOLDER = '—';

export interface MoneyOptions {
  /**
   * Cents are noise on a projection twenty years out and essential on a
   * monthly payment, so the caller decides. Defaults to 2.
   */
  decimals?: 0 | 2;
}

/**
 * `1.234,56 €` — the shape every result card, table cell and axis label uses.
 */
export function formatMoney(
  value: number,
  currency: string,
  options: MoneyOptions = {},
): string {
  const digits = formatDigits(value, options.decimals ?? 2);
  if (digits === null) return PLACEHOLDER;

  const sign = value < 0 ? MINUS : '';
  return `${sign}${digits}${NBSP}${symbolFor(currency)}`;
}

/**
 * `6,25 %`.
 *
 * Takes a percentage, not a fraction: `formatPercent(6.25)` is `6,25 %`. The
 * engine works in fractions internally and converts at its boundary, so that
 * the unit is unambiguous wherever this is read.
 */
export function formatPercent(value: number, decimals = 2): string {
  const digits = formatDigits(value, decimals);
  if (digits === null) return PLACEHOLDER;

  const sign = value < 0 ? MINUS : '';
  return `${sign}${digits}${NBSP}%`;
}

/**
 * A signed percentage, for anything describing a change: `+4,80 %`.
 *
 * The sign is always printed. `ChangeValue.tsx` explains why — colour alone
 * cannot carry direction, so the glyph has to say it too.
 */
export function formatPercentChange(value: number, decimals = 2): string {
  const digits = formatDigits(value, decimals);
  if (digits === null) return PLACEHOLDER;

  const sign = value < 0 ? MINUS : '+';
  return `${sign}${digits}${NBSP}%`;
}

const THOUSAND = 1_000;
const MILLION = 1_000_000;
const BILLION = 1_000_000_000;

/**
 * `1,2 mln €` — for chart axis labels, where a full figure would collide with
 * its neighbour.
 *
 * Suffixes are Albanian abbreviations (`mijë`, `milion`, `miliard`). Only used
 * where the exact number is also available as text: every chart ships a data
 * table with the unrounded values, so nothing is lost to a reader who needs
 * the precision.
 */
export function formatCompactMoney(value: number, currency: string): string {
  if (!Number.isFinite(value)) return PLACEHOLDER;

  const magnitude = Math.abs(value);
  const sign = value < 0 ? MINUS : '';
  const symbol = symbolFor(currency);

  const compact = (divisor: number, suffix: string): string => {
    const scaled = magnitude / divisor;
    // One decimal below ten (1,2 mln), none above (12 mln): two significant
    // figures is all an axis label can carry without crowding.
    const digits = formatDigits(scaled, scaled < 10 ? 1 : 0) ?? PLACEHOLDER;
    return `${sign}${digits}${NBSP}${suffix}${NBSP}${symbol}`;
  };

  if (magnitude >= BILLION) return compact(BILLION, 'mld');
  if (magnitude >= MILLION) return compact(MILLION, 'mln');
  if (magnitude >= 10 * THOUSAND) return compact(THOUSAND, 'mijë');

  return formatMoney(value, currency, { decimals: 0 });
}

/**
 * A plain grouped number with no unit: `1.234,56`.
 *
 * For quantities that are neither money nor a rate — a share count, a number
 * of payments.
 */
export function formatNumber(value: number, decimals = 0): string {
  const digits = formatDigits(value, decimals);
  if (digits === null) return PLACEHOLDER;

  return value < 0 ? `${MINUS}${digits}` : digits;
}
