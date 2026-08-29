import { describe, expect, it } from 'vitest';
import { continueTarget } from '../continueTarget';
import type { Lesson } from '../learnTypes';

const lesson = (slug: string): Lesson =>
  ({
    id: slug,
    slug,
    title: `Lesson ${slug}`,
    summary: '',
    readingMinutes: 2,
    level: 'beginner',
  }) as Lesson;

const LESSONS = [lesson('what-is-a-share'), lesson('what-is-an-etf')];

describe('continueTarget', () => {
  it('has nothing to show before anything is opened', () => {
    expect(continueTarget(LESSONS, null, {})).toBeNull();
  });

  it('points at the lesson in progress', () => {
    const target = continueTarget(LESSONS, 'what-is-an-etf', {});

    expect(target?.lesson.slug).toBe('what-is-an-etf');
    expect(target?.done).toBe(false);
  });

  it('keeps showing the last lesson once it is marked read', () => {
    const target = continueTarget(LESSONS, 'what-is-an-etf', {
      'what-is-an-etf': '2026-08-25T10:00:00.000Z',
    });

    expect(target?.lesson.slug).toBe('what-is-an-etf');
    expect(target?.done).toBe(true);
  });

  it('ignores a slug that no longer exists', () => {
    expect(continueTarget(LESSONS, 'retired-lesson', {})).toBeNull();
  });
});
