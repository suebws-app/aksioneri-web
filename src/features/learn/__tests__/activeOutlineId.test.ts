import { describe, expect, it } from 'vitest';
import { activeOutlineId } from '../components/LessonOutline';

const OFFSET = 96;

describe('activeOutlineId', () => {
  it('returns null when there is nothing to track', () => {
    expect(activeOutlineId([], { offset: OFFSET, atBottom: false })).toBeNull();
  });

  it('marks the first entry while the page is still at the top', () => {
    const positions = [
      { id: 'one', top: 400 },
      { id: 'two', top: 900 },
    ];

    expect(
      activeOutlineId(positions, { offset: OFFSET, atBottom: false }),
    ).toBe('one');
  });

  it('marks the last section that has crossed the offset', () => {
    const positions = [
      { id: 'one', top: -600 },
      { id: 'two', top: 40 },
      { id: 'three', top: 700 },
    ];

    expect(
      activeOutlineId(positions, { offset: OFFSET, atBottom: false }),
    ).toBe('two');
  });

  it('keeps a long section current until the next one crosses', () => {
    const positions = [
      { id: 'one', top: -2000 },
      { id: 'two', top: 300 },
    ];

    expect(
      activeOutlineId(positions, { offset: OFFSET, atBottom: false }),
    ).toBe('one');
  });

  it('marks the final entry once the page is scrolled to the bottom', () => {
    // The last section is short enough that its heading never reaches the
    // offset — without the bottom case it could never become current.
    const positions = [
      { id: 'one', top: -900 },
      { id: 'two', top: -300 },
      { id: 'three', top: 500 },
    ];

    expect(activeOutlineId(positions, { offset: OFFSET, atBottom: true })).toBe(
      'three',
    );
  });

  it('ignores sections whose element was not found', () => {
    const positions = [
      { id: 'one', top: -400 },
      { id: 'three', top: 800 },
    ];

    expect(
      activeOutlineId(positions, { offset: OFFSET, atBottom: false }),
    ).toBe('one');
  });
});
