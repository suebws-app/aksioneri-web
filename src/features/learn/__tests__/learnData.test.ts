import { describe, expect, it } from 'vitest';
import { TOPICS, LESSONS, START_HERE } from '../content';
import {
  getGlossary,
  getLearnStats,
  getLessonBySlug,
  getLessonSlugs,
  getLessons,
  getTopics,
} from '../learnData';

describe('lesson registry', () => {
  it('places every lesson in exactly one topic', () => {
    for (const lesson of LESSONS) {
      const owners = TOPICS.filter((topic) =>
        topic.slugs.sq.includes(lesson.slug.sq),
      );
      expect(
        owners,
        `${lesson.slug.sq} is in ${String(owners.length)} topics`,
      ).toHaveLength(1);
    }
  });

  it('lists no slug that has no lesson behind it', () => {
    const known = new Set(LESSONS.map((lesson) => lesson.slug.sq));
    for (const topic of TOPICS) {
      for (const slug of topic.slugs.sq) {
        expect(known.has(slug), `${topic.id} lists unknown ${slug}`).toBe(true);
      }
    }
  });

  it('leaves no lesson unreachable from /learn', () => {
    const reachable = new Set(TOPICS.flatMap((topic) => topic.slugs.sq));
    const orphans = LESSONS.filter(
      (lesson) => !reachable.has(lesson.slug.sq),
    ).map((lesson) => lesson.slug.sq);

    expect(orphans).toEqual([]);
  });

  it('resolves every promoted "start here" slug', () => {
    for (const slug of START_HERE.sq) {
      expect(getLessonBySlug('sq', slug), slug).not.toBeNull();
    }
  });

  it('gives every lesson a breadcrumb and a progress position', () => {
    for (const lesson of getLessons('sq')) {
      expect(lesson.track, `${lesson.slug} has no track`).toBeDefined();
      expect(lesson.track?.position).toBeGreaterThan(0);
    }
  });

  it('counts a track total that a reader can actually reach', () => {
    for (const topic of getTopics('sq')) {
      for (const lesson of topic.lessons) {
        expect(lesson.track?.total).toBe(topic.lessons.length);
      }
    }
  });
});

describe('lesson content', () => {
  it('resolves every upNext reference', () => {
    const known = new Set(getLessonSlugs('sq'));
    for (const lesson of getLessons('sq')) {
      for (const next of lesson.upNextSlugs ?? []) {
        expect(known.has(next), `${lesson.slug} -> ${next}`).toBe(true);
      }
    }
  });

  it('gives every quiz a valid answer and an explanation', () => {
    for (const lesson of getLessons('sq')) {
      const quiz = lesson.quiz;
      if (!quiz) continue;

      expect(quiz.answer, `${lesson.slug}`).toBeGreaterThanOrEqual(0);
      expect(quiz.answer, `${lesson.slug}`).toBeLessThan(quiz.options.length);
      expect(quiz.explanation.length, `${lesson.slug}`).toBeGreaterThan(20);
    }
  });

  it('keeps comparison tables aligned with their columns', () => {
    for (const lesson of getLessons('sq')) {
      if (!lesson.comparison) continue;
      expect(lesson.comparison.columns, lesson.slug).toHaveLength(3);
      expect(lesson.comparison.rows.length, lesson.slug).toBeGreaterThan(0);
    }
  });

  it('writes enough prose to justify the reading time it claims', () => {
    for (const lesson of getLessons('sq')) {
      const words = (lesson.body ?? [])
        .flatMap((section) => section.paragraphs)
        .join(' ')
        .split(/\s+/).length;

      expect(
        words,
        `${lesson.slug} has ${String(words)} words`,
      ).toBeGreaterThan(150);
    }
  });
});

describe('getLearnStats', () => {
  it('reports the real counts, not authored ones', () => {
    const stats = getLearnStats();

    expect(stats.lessonCount).toBe(LESSONS.length);
    expect(stats.glossarySize).toBe(getGlossary('sq').length);
    expect(stats.averageMinutes).toBeGreaterThan(0);
  });
});

describe('glossary', () => {
  it('has no duplicate slugs', () => {
    const slugs = getGlossary('sq').map((term) => term.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it('points every term at a lesson that exists', () => {
    const known = new Set(getLessonSlugs('sq'));
    for (const term of getGlossary('sq')) {
      if (!term.lessonSlug) continue;
      expect(known.has(term.lessonSlug), term.slug).toBe(true);
    }
  });
});
