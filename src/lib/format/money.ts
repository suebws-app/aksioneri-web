export type Currency = 'EUR' | 'USD';

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

function groupThousands(digits: string): string {
  const firstGroup = digits.length % 3 || 3;
  const groups: string[] = [digits.slice(0, firstGroup)];

  for (let i = firstGroup; i < digits.length; i += 3) {
    groups.push(digits.slice(i, i + 3));
  }

  return groups.join(GROUP_SEPARATOR);
}

function formatDigits(value: number, decimals: number): string | null {
  if (!Number.isFinite(value)) return null;

  const fixed = Math.abs(value).toFixed(decimals);
  const [whole = '0', fraction] = fixed.split('.');

  const grouped = groupThousands(whole);
  return fraction ? `${grouped}${DECIMAL_SEPARATOR}${fraction}` : grouped;
}

const PLACEHOLDER = '—';

export interface MoneyOptions {
  decimals?: 0 | 2;
}

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

export function formatPercent(value: number, decimals = 2): string {
  const digits = formatDigits(value, decimals);
  if (digits === null) return PLACEHOLDER;

  const sign = value < 0 ? MINUS : '';
  return `${sign}${digits}${NBSP}%`;
}

export function formatPercentChange(value: number, decimals = 2): string {
  const digits = formatDigits(value, decimals);
  if (digits === null) return PLACEHOLDER;

  const sign = value < 0 ? MINUS : '+';
  return `${sign}${digits}${NBSP}%`;
}

export function formatNumber(value: number, decimals = 0): string {
  const digits = formatDigits(value, decimals);
  if (digits === null) return PLACEHOLDER;

  return value < 0 ? `${MINUS}${digits}` : digits;
}
