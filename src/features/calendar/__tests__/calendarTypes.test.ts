import { describe, expect, it } from 'vitest';
import { isRegionFilterValue, matchesRegionFilter } from '../calendarTypes';

describe('matchesRegionFilter', () => {
  it('lets every region through the ALL filter', () => {
    expect(matchesRegionFilter('JP', 'ALL')).toBe(true);
    expect(matchesRegionFilter('US', 'ALL')).toBe(true);
  });

  it('groups Germany under the euro area', () => {
    // The filter pills are groups, not regions: a German release belongs to
    // the euro area even though its own code is DE.
    expect(matchesRegionFilter('DE', 'EU')).toBe(true);
    expect(matchesRegionFilter('EU', 'EU')).toBe(true);
    expect(matchesRegionFilter('DE', 'US')).toBe(false);
  });

  it('groups Japan under Asia', () => {
    expect(matchesRegionFilter('JP', 'ASIA')).toBe(true);
    expect(matchesRegionFilter('JP', 'EU')).toBe(false);
  });
});

describe('isRegionFilterValue', () => {
  it('accepts known filters and rejects anything else', () => {
    expect(isRegionFilterValue('EU')).toBe(true);
    expect(isRegionFilterValue('ALL')).toBe(true);
    // A hand-edited query string must fall back rather than filter to nothing.
    expect(isRegionFilterValue('eu')).toBe(false);
    expect(isRegionFilterValue('MARS')).toBe(false);
  });
});
