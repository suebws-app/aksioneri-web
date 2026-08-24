import { describe, expect, it } from 'vitest';
import { getCalendarWeek, TODAY } from '../calendarData';

describe('getCalendarWeek', () => {
  it('resolves content into the requested locale', () => {
    const sq = getCalendarWeek('sq');
    const en = getCalendarWeek('en');

    expect(en.nextUp?.title).toBe('US inflation data (CPI), July');
    expect(sq.nextUp?.title).toBe(
      'Të dhënat e inflacionit në SHBA (CPI), korrik',
    );
    // Every event title must be translated, not silently falling back.
    expect(sq.days.flatMap((d) => d.events).map((e) => e.title)).not.toContain(
      'Producer price index (PPI), July',
    );
  });

  it('starts with today selected', () => {
    const week = getCalendarWeek('en');
    expect(week.selectedDate).toBe(TODAY);
    expect(week.todayDate).toBe(TODAY);
  });

  it('marks exactly one event as next up', () => {
    const week = getCalendarWeek('en');
    const nextUp = week.days
      .flatMap((day) => day.events)
      .filter((event) => event.isNextUp);

    expect(nextUp).toHaveLength(1);
    // The highlighted row and the lead card must point at the same release.
    expect(nextUp[0]?.slug).toBe(week.nextUp?.slug);
  });

  it('leaves unreleased figures null rather than empty strings', () => {
    const week = getCalendarWeek('en');
    const ecb = week.days
      .flatMap((day) => day.events)
      .find((event) => event.slug === 'ecb-interest-rate-decision');

    expect(ecb?.actual).toBeNull();
    expect(ecb?.expected).toBe('3.25%');
  });
});
