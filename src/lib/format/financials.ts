const PLACEHOLDER = '—';

export function formatFinancialValue(
  value: number | null,
  unit: string,
  locale: string,
): string {
  if (value === null || !Number.isFinite(value)) return PLACEHOLDER;

  try {
    if (unit === 'USD/shares') {
      return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(value);
    }

    if (unit === 'USD') {
      const magnitude = Math.abs(value);
      return new Intl.NumberFormat(locale, {
        notation: 'compact',
        style: 'currency',
        currency: 'USD',
        compactDisplay: 'short',
        maximumFractionDigits: magnitude >= 1e11 ? 0 : 2,
      }).format(value);
    }

    if (unit === 'shares') {
      return new Intl.NumberFormat(locale, {
        notation: 'compact',
        compactDisplay: 'short',
      }).format(value);
    }

    return new Intl.NumberFormat(locale, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  } catch {
    return PLACEHOLDER;
  }
}

export function formatFiscalPeriod(
  fiscalYear: number,
  fiscalPeriod: string,
): string {
  return fiscalPeriod === 'FY'
    ? `FY ${fiscalYear}`
    : `${fiscalPeriod} ${fiscalYear}`;
}

export function formatEndDate(iso: string, locale: string): string {
  try {
    return new Intl.DateTimeFormat(locale, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}
