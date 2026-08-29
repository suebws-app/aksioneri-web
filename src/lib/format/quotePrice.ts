export interface QuotePrecision {
  digits: number;
  grouping: boolean;
}

export function quotePrecisionOf(formatted: string): QuotePrecision {
  const dot = formatted.indexOf('.');
  return {
    digits: dot === -1 ? 0 : formatted.length - dot - 1,
    grouping: formatted.includes(','),
  };
}

export function formatQuotePrice(
  value: number,
  precision: QuotePrecision,
): string {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: precision.digits,
    maximumFractionDigits: precision.digits,
    useGrouping: precision.grouping,
  }).format(value);
}
