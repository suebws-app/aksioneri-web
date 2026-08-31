import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  formatMoney,
  formatNumber,
  formatPercent,
  formatPercentChange,
} from '../money';

const NBSP = '\u00A0';
const MINUS = '\u2212';

describe('formatMoney', () => {
  it('groups thousands with a dot and decimals with a comma', () => {
    expect(formatMoney(1234.56, 'EUR')).toBe(`1.234,56${NBSP}€`);
    expect(formatMoney(1234567.89, 'EUR')).toBe(`1.234.567,89${NBSP}€`);
  });

  it('groups a leading partial group correctly', () => {
    expect(formatMoney(1000, 'EUR', { decimals: 0 })).toBe(`1.000${NBSP}€`);
    expect(formatMoney(1000000, 'EUR', { decimals: 0 })).toBe(
      `1.000.000${NBSP}€`,
    );
    expect(formatMoney(999, 'EUR', { decimals: 0 })).toBe(`999${NBSP}€`);
  });

  it('puts the symbol after the number, separated by a non-breaking space', () => {
    expect(formatMoney(10, 'USD', { decimals: 0 })).toBe(`10${NBSP}$`);
  });

  it('uses U+2212 for negatives, not a hyphen', () => {
    const formatted = formatMoney(-1234.56, 'EUR');

    expect(formatted).toBe(`${MINUS}1.234,56${NBSP}€`);
    expect(formatted).not.toContain('-');
  });

  it('honours the decimals option', () => {
    expect(formatMoney(1234.56, 'EUR', { decimals: 0 })).toBe(`1.235${NBSP}€`);
  });

  it('degrades to an em dash rather than printing NaN', () => {
    expect(formatMoney(Number.NaN, 'EUR')).toBe('—');
    expect(formatMoney(Number.POSITIVE_INFINITY, 'EUR')).toBe('—');
  });

  it('formats zero without a sign', () => {
    expect(formatMoney(0, 'EUR')).toBe(`0,00${NBSP}€`);
  });
});

describe('formatPercent', () => {
  it('formats a percentage, not a fraction', () => {
    expect(formatPercent(6.25)).toBe(`6,25${NBSP}%`);
  });

  it('always prints the sign for a change', () => {
    expect(formatPercentChange(4.8)).toBe(`+4,80${NBSP}%`);
    expect(formatPercentChange(-4.8)).toBe(`${MINUS}4,80${NBSP}%`);
  });
});

describe('rate precision', () => {
  it('keeps four decimals, so a sub-1 rate is not rounded to 1', () => {
    expect(formatNumber(0.733579, 4)).toBe('0,7336');
    expect(formatNumber(1.36318, 4)).toBe('1,3632');
    expect(formatNumber(391.4523, 4)).toBe('391,4523');
  });
});

describe('formatNumber', () => {
  it('groups without a unit', () => {
    expect(formatNumber(1234567)).toBe('1.234.567');
    expect(formatNumber(1234.5, 2)).toBe('1.234,50');
  });
});

describe('hydration safety', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('never constructs an Intl.NumberFormat', () => {
    const spy = vi.spyOn(Intl, 'NumberFormat');

    formatMoney(1234.56, 'EUR');
    formatMoney(-98765.43, 'USD', { decimals: 0 });
    formatPercent(6.25);
    formatPercentChange(-1.5);
    formatNumber(1234567);

    expect(spy).not.toHaveBeenCalled();
  });

  it('produces the same string regardless of the ambient locale', () => {
    const first = formatMoney(1234.56, 'EUR');
    const originalToLocaleString = Number.prototype.toLocaleString;

    Number.prototype.toLocaleString = () => {
      throw new Error('formatMoney must not use toLocaleString');
    };

    try {
      expect(formatMoney(1234.56, 'EUR')).toBe(first);
    } finally {
      Number.prototype.toLocaleString = originalToLocaleString;
    }
  });
});
