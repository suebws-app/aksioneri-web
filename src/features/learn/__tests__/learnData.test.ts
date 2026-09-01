import { describe, expect, it } from 'vitest';
import { locales } from '@/i18n/config';
import { TOPICS, LESSONS, START_HERE } from '../content';
import { pickLocalized } from '../learnTypes';
import {
  getGlossary,
  getLearnStats,
  getLessonBySlug,
  getLessonSlugs,
  getLessons,
  getTopics,
} from '../learnData';

describe.each(locales)('lesson registry (%s)', (locale) => {
  it('places every lesson in exactly one topic', () => {
    for (const lesson of LESSONS) {
      const slug = pickLocalized(lesson.slug, locale);
      const owners = TOPICS.filter((topic) =>
        pickLocalized(topic.slugs, locale).includes(slug),
      );
      expect(
        owners,
        `${slug} is in ${String(owners.length)} topics`,
      ).toHaveLength(1);
    }
  });

  it('lists no slug that has no lesson behind it', () => {
    const known = new Set(getLessonSlugs(locale));
    for (const topic of TOPICS) {
      for (const slug of pickLocalized(topic.slugs, locale)) {
        expect(known.has(slug), `${topic.id} lists unknown ${slug}`).toBe(true);
      }
    }
  });

  it('leaves no lesson unreachable from /learn', () => {
    const reachable = new Set(
      TOPICS.flatMap((topic) => pickLocalized(topic.slugs, locale)),
    );
    const orphans = getLessonSlugs(locale).filter(
      (slug) => !reachable.has(slug),
    );

    expect(orphans).toEqual([]);
  });

  it('resolves every promoted "start here" slug', () => {
    for (const slug of pickLocalized(START_HERE, locale)) {
      expect(getLessonBySlug(locale, slug), slug).not.toBeNull();
    }
  });

  it('gives every lesson a breadcrumb and a progress position', () => {
    for (const lesson of getLessons(locale)) {
      expect(lesson.track, `${lesson.slug} has no track`).toBeDefined();
      expect(lesson.track?.position).toBeGreaterThan(0);
    }
  });

  it('counts a track total that a reader can actually reach', () => {
    for (const topic of getTopics(locale)) {
      for (const lesson of topic.lessons) {
        expect(lesson.track?.total).toBe(topic.lessons.length);
      }
    }
  });
});

describe.each(locales)('lesson content (%s)', (locale) => {
  it('resolves every upNext reference', () => {
    const known = new Set(getLessonSlugs(locale));
    for (const lesson of getLessons(locale)) {
      for (const next of lesson.upNextSlugs ?? []) {
        expect(known.has(next), `${lesson.slug} -> ${next}`).toBe(true);
      }
    }
  });

  it('gives every quiz a valid answer and an explanation', () => {
    for (const lesson of getLessons(locale)) {
      const quiz = lesson.quiz;
      if (!quiz) continue;

      expect(quiz.answer, `${lesson.slug}`).toBeGreaterThanOrEqual(0);
      expect(quiz.answer, `${lesson.slug}`).toBeLessThan(quiz.options.length);
      expect(quiz.explanation.length, `${lesson.slug}`).toBeGreaterThan(20);
    }
  });

  it('keeps comparison tables aligned with their columns', () => {
    for (const lesson of getLessons(locale)) {
      if (!lesson.comparison) continue;
      expect(lesson.comparison.columns, lesson.slug).toHaveLength(3);
      expect(lesson.comparison.rows.length, lesson.slug).toBeGreaterThan(0);
    }
  });

  it('writes enough prose to justify the reading time it claims', () => {
    for (const lesson of getLessons(locale)) {
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

describe('english completeness', () => {
  const LOCALIZED_FIELDS = [
    'slug',
    'title',
    'summary',
    'inOneSentence',
    'body',
    'workedExample',
    'comparison',
    'keyTerms',
    'quiz',
    'upNextSlugs',
  ] as const;

  it('gives every localized lesson field an English variant', () => {
    for (const lesson of LESSONS) {
      for (const field of LOCALIZED_FIELDS) {
        const value = lesson[field] as
          { sq: unknown; en?: unknown } | undefined;
        if (!value) continue;
        expect(value.en, `${lesson.slug.sq}.${field} has no en`).toBeDefined();
      }
    }
  });

  it('gives every topic an English title and slug list', () => {
    for (const topic of TOPICS) {
      expect(topic.title.en, `${topic.id} title`).toBeDefined();
      expect(topic.slugs.en, `${topic.id} slugs`).toBeDefined();
      expect(topic.slugs.en).toHaveLength(topic.slugs.sq.length);
    }
    expect(START_HERE.en).toBeDefined();
  });

  it('keeps structure parity between the two locales', () => {
    for (const lesson of LESSONS) {
      const slug = lesson.slug.sq;
      if (lesson.body?.en) {
        expect(lesson.body.en, `${slug} body sections`).toHaveLength(
          lesson.body.sq.length,
        );
        lesson.body.en.forEach((section, index) => {
          expect(
            section.paragraphs,
            `${slug} body[${String(index)}] paragraphs`,
          ).toHaveLength(lesson.body?.sq[index]?.paragraphs.length ?? -1);
        });
      }
      if (lesson.quiz?.en) {
        expect(lesson.quiz.en.answer, `${slug} quiz answer`).toBe(
          lesson.quiz.sq.answer,
        );
        expect(lesson.quiz.en.options, `${slug} quiz options`).toHaveLength(
          lesson.quiz.sq.options.length,
        );
      }
      if (lesson.keyTerms?.en) {
        expect(
          lesson.keyTerms.en.map((term) => term.slug),
          `${slug} key term ids`,
        ).toEqual(lesson.keyTerms.sq.map((term) => term.slug));
      }
      if (lesson.upNextSlugs?.en) {
        expect(lesson.upNextSlugs.en, `${slug} upNext count`).toHaveLength(
          lesson.upNextSlugs.sq.length,
        );
      }
    }
  });

  it('keeps English slugs unique', () => {
    const slugs = getLessonSlugs('en');
    expect(new Set(slugs).size).toBe(slugs.length);
  });
});

describe.each(locales)('getLearnStats (%s)', (locale) => {
  it('reports the real counts, not authored ones', () => {
    const stats = getLearnStats(locale);

    expect(stats.lessonCount).toBe(LESSONS.length);
    expect(stats.glossarySize).toBe(getGlossary(locale).length);
    expect(stats.averageMinutes).toBeGreaterThan(0);
  });
});

describe.each(locales)('glossary (%s)', (locale) => {
  it('has no duplicate slugs', () => {
    const slugs = getGlossary(locale).map((term) => term.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it('points every term at a lesson that exists', () => {
    const known = new Set(getLessonSlugs(locale));
    for (const term of getGlossary(locale)) {
      if (!term.lessonSlug) continue;
      expect(known.has(term.lessonSlug), term.slug).toBe(true);
    }
  });
});
