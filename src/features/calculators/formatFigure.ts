import {
  formatMoney,
  formatNumber,
  formatPercent,
  formatPercentChange,
} from '@/lib/format/money';
import type { NumberFormatKind } from './types';

/**
 * Renders one figure the way its `ResultSpec` asked for.
 *
 * The definitions describe a figure as a number plus a format kind, and this
 * is the only place that mapping is resolved. Formatting decided at the call
 * site is how the headline balance ends up with two decimals in the result
 * card and none in the table.
 *
 * `years` takes its unit from the catalogue rather than hardcoding "vjet",
 * since it is user-facing text like any other.
 */
export function formatFigure(
  value: number,
  kind: NumberFormatKind,
  currency: string,
  unit?: string,
): string {
  switch (kind) {
    case 'money':
      return formatMoney(value, currency);
    case 'moneyWhole':
      // Cents on a twenty-year projection imply a precision the assumptions
      // cannot support. Whole units, everywhere a projected balance appears.
      return formatMoney(value, currency, { decimals: 0 });
    case 'percent':
      return formatPercent(value);
    case 'percentChange':
      return formatPercentChange(value);
    case 'years':
      return unit ? `${formatNumber(value)} ${unit}` : formatNumber(value);
    case 'plain':
      return formatNumber(value);
    case 'rate':
      // Four decimals is the FX convention, and enough for every pair the
      // converter offers — including EUR/HUF, where two would be useless.
      return formatNumber(value, 4);
  }
}
