import { describe, expect, it } from 'vitest';
import { formatSignedPercent } from '../percent';

const MINUS = '−';

describe('formatSignedPercent', () => {
  it('formats a gain with a plus sign', () => {
    expect(formatSignedPercent(1.234)).toBe('+1.23%');
  });

  it('formats a loss with a true minus sign', () => {
    expect(formatSignedPercent(-2.5)).toBe(`${MINUS}2.50%`);
  });

  it('formats zero as a gain', () => {
    expect(formatSignedPercent(0)).toBe('+0.00%');
  });

  it('renders a dash for NaN', () => {
    expect(formatSignedPercent(Number.NaN)).toBe('—');
  });

  it('renders a dash for Infinity', () => {
    expect(formatSignedPercent(Number.POSITIVE_INFINITY)).toBe('—');
  });
});
