import { describe, expect, it } from 'vitest';
import { clampDayToMonth } from '../DatePicker';

describe('clampDayToMonth', () => {
  it('keeps a day that exists in the target month', () => {
    expect(clampDayToMonth(2026, 8, 15)).toBe(15);
  });

  it('clamps the 31st into a 30-day month', () => {
    expect(clampDayToMonth(2026, 8, 31)).toBe(30);
  });

  it('clamps into February, leap year and not', () => {
    expect(clampDayToMonth(2024, 1, 31)).toBe(29);
    expect(clampDayToMonth(2023, 1, 31)).toBe(28);
    expect(clampDayToMonth(2100, 1, 31)).toBe(28);
    expect(clampDayToMonth(2000, 1, 31)).toBe(29);
  });

  it('never returns a day the month does not have', () => {
    for (let year = 2020; year <= 2030; year += 1) {
      for (let month = 0; month < 12; month += 1) {
        const clamped = clampDayToMonth(year, month, 31);
        const rebuilt = new Date(year, month, clamped);

        expect(rebuilt.getMonth()).toBe(month);
        expect(rebuilt.getFullYear()).toBe(year);
      }
    }
  });
});
