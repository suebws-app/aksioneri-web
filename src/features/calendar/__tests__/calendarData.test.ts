import { describe, expect, it } from 'vitest';
import { getCalendarWeek, TODAY } from '../calendarData';

describe('getCalendarWeek', () => {
  it('resolves content into Albanian', () => {
    const sq = getCalendarWeek('sq');

    expect(sq.nextUp?.title).toBe(
      'Të dhënat e inflacionit në SHBA (CPI), korrik',
    );
    // The English locale was removed; no event may still carry English copy.
    expect(sq.days.flatMap((d) => d.events).map((e) => e.title)).not.toContain(
      'Producer price index (PPI), July',
    );
  });

  it('starts with today selected', () => {
    const week = getCalendarWeek('sq');
    expect(week.selectedDate).toBe(TODAY);
    expect(week.todayDate).toBe(TODAY);
  });

  it('marks exactly one event as next up', () => {
    const week = getCalendarWeek('sq');
    const nextUp = week.days
      .flatMap((day) => day.events)
      .filter((event) => event.isNextUp);

    expect(nextUp).toHaveLength(1);
    // The highlighted row and the lead card must point at the same release.
    expect(nextUp[0]?.slug).toBe(week.nextUp?.slug);
  });

  it('leaves unreleased figures null rather than empty strings', () => {
    const week = getCalendarWeek('sq');
    const ecb = week.days
      .flatMap((day) => day.events)
      .find((event) => event.slug === 'ecb-interest-rate-decision');

    expect(ecb?.actual).toBeNull();
    expect(ecb?.expected).toBe('3.25%');
  });
});
