import {
  formatMoney,
  formatNumber,
  formatPercent,
  formatPercentChange,
} from '@/lib/format/money';
import type { NumberFormatKind } from './types';

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
      return formatNumber(value, 4);
  }
}
