import type { Locale } from '@/i18n/config';
import { GLOSSARY, LESSONS, START_HERE, TOPICS } from './content';
import { readingMinutesFor } from './content/readingMinutes';
import type { SeedLesson } from './content/types';
import type {
  GlossaryTerm,
  LearnStats,
  Lesson,
  LessonTopic,
} from './learnTypes';

/**
 * The read API for Learning Center content.
 *
 * Content itself lives in `content/`, one file per topic. This module only
 * resolves it into the flat, single-locale shapes the pages consume.
 */

const findSeed = (slug: string): SeedLesson => {
  const lesson = LESSONS.find((entry) => entry.slug === slug);
  if (!lesson) throw new Error(`Unknown lesson slug: ${slug}`);
  return lesson;
};

const resolve = (lesson: SeedLesson, locale: Locale): Lesson => {
  const topic = TOPICS.find((entry) => entry.id === lesson.topicId);
  // Position within the topic drives the breadcrumb and the progress bar. A
  // lesson missing from its topic's `slugs` lands at 0 and loses both, which
  // is what used to happen to every "Start here" lesson.
  const position = topic ? topic.slugs.indexOf(lesson.slug) + 1 : 0;

  return {
    id: lesson.id,
    slug: lesson.slug,
    title: lesson.title[locale],
    summary: lesson.summary[locale],
    readingMinutes: readingMinutesFor(lesson, locale),
    level: lesson.level,
    ...(lesson.body ? { body: lesson.body[locale] } : {}),
    ...(lesson.inOneSentence
      ? { inOneSentence: lesson.inOneSentence[locale] }
      : {}),
    ...(lesson.workedExample
      ? { workedExample: lesson.workedExample[locale] }
      : {}),
    ...(lesson.comparison ? { comparison: lesson.comparison[locale] } : {}),
    ...(lesson.keyTerms ? { keyTerms: lesson.keyTerms[locale] } : {}),
    ...(lesson.quiz ? { quiz: lesson.quiz[locale] } : {}),
    ...(lesson.noMaths ? { noMaths: true } : {}),
    ...(topic && position > 0
      ? {
          track: {
            topicTitle: topic.title[locale],
            position,
            // Lessons a reader can actually open, not an aspirational total.
            total: topic.slugs.length,
          },
        }
      : {}),
    ...(lesson.relatedSymbols ? { relatedSymbols: lesson.relatedSymbols } : {}),
    ...(lesson.upNextSlugs ? { upNextSlugs: lesson.upNextSlugs } : {}),
  };
};

export const getLessons = (locale: Locale): Lesson[] =>
  LESSONS.map((lesson) => resolve(lesson, locale));

export const getFeaturedLessons = (locale: Locale): Lesson[] =>
  START_HERE.map((slug) => resolve(findSeed(slug), locale));

export const getLessonBySlug = (
  locale: Locale,
  slug: string,
): Lesson | null => {
  const lesson = LESSONS.find((entry) => entry.slug === slug);
  return lesson ? resolve(lesson, locale) : null;
};

/** Every lesson has a page, so every slug is a valid route. */
export const getLessonSlugs = (): string[] =>
  LESSONS.map((lesson) => lesson.slug);

export const getTopics = (locale: Locale): LessonTopic[] =>
  TOPICS.map((topic) => ({
    id: topic.id,
    title: topic.title[locale],
    lessonCount: topic.slugs.length,
    lessons: topic.slugs.map((slug) => resolve(findSeed(slug), locale)),
  }));

export const getGlossary = (locale: Locale): GlossaryTerm[] => GLOSSARY[locale];

/**
 * Computed, never authored. These three numbers are the page's headline claim,
 * and they used to be the literals 48 / 5 / 120 against 16 lessons and four
 * glossary terms.
 */
export const getLearnStats = (): LearnStats => ({
  lessonCount: LESSONS.length,
  averageMinutes: Math.round(
    LESSONS.reduce(
      (total, lesson) => total + readingMinutesFor(lesson, 'sq'),
      0,
    ) / LESSONS.length,
  ),
  glossarySize: GLOSSARY.sq.length,
});
