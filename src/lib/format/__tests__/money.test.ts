import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  formatCompactMoney,
  formatMoney,
  formatNumber,
  formatPercent,
  formatPercentChange,
} from '../money';

// Written as escapes, not literals: a non-breaking space and a true minus are
// indistinguishable from a space and a hyphen in a diff, and an assertion
// nobody can read is an assertion nobody can trust.
const NBSP = '\u00A0';
const MINUS = '\u2212';

describe('formatMoney', () => {
  it('groups thousands with a dot and decimals with a comma', () => {
    expect(formatMoney(1234.56, 'EUR')).toBe(`1.234,56${NBSP}€`);
    expect(formatMoney(1234567.89, 'EUR')).toBe(`1.234.567,89${NBSP}€`);
  });

  it('groups a leading partial group correctly', () => {
    // The off-by-one every hand-rolled grouper gets wrong: 4 digits and 7
    // digits both start with a group shorter than three.
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

describe('formatCompactMoney', () => {
  it('abbreviates with Albanian units', () => {
    expect(formatCompactMoney(1_200_000, 'EUR')).toBe(`1,2${NBSP}mln${NBSP}€`);
    expect(formatCompactMoney(12_000_000, 'EUR')).toBe(`12${NBSP}mln${NBSP}€`);
    expect(formatCompactMoney(2_500_000_000, 'EUR')).toBe(
      `2,5${NBSP}mld${NBSP}€`,
    );
    expect(formatCompactMoney(45_000, 'EUR')).toBe(`45${NBSP}mijë${NBSP}€`);
  });

  it('leaves small figures whole', () => {
    expect(formatCompactMoney(9_500, 'EUR')).toBe(`9.500${NBSP}€`);
  });
});

describe('rate precision', () => {
  it('keeps four decimals, so a sub-1 rate is not rounded to 1', () => {
    // The bug this guards: a USD/GBP rate of 0.7336 rendered with zero
    // decimals came out as "1" — not imprecise, wrong.
    expect(formatNumber(0.733579, 4)).toBe('0,7336');
    expect(formatNumber(1.36318, 4)).toBe('1,3632');
    // EUR/HUF, where two decimals would be useless.
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

  /**
   * The whole reason this module exists.
   *
   * Node's full ICU and Chromium's subset disagree about `sq`, so a figure
   * formatted through `Intl` on the server and again during hydration can
   * differ — and every calculator renders its result on both sides.
   * `formatDate.ts` hit this with month names and hardcoded its tables; this
   * is the same defence for digits, and this test is what keeps it true after
   * someone "simplifies" the grouping code.
   */
  it('never constructs an Intl.NumberFormat', () => {
    const spy = vi.spyOn(Intl, 'NumberFormat');

    formatMoney(1234.56, 'EUR');
    formatMoney(-98765.43, 'USD', { decimals: 0 });
    formatPercent(6.25);
    formatPercentChange(-1.5);
    formatCompactMoney(1_200_000, 'EUR');
    formatNumber(1234567);

    expect(spy).not.toHaveBeenCalled();
  });

  it('produces the same string regardless of the ambient locale', () => {
    // A cheap proxy for the server/client split: if the implementation ever
    // reaches for a locale-aware API, one of these will drift.
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
