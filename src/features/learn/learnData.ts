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

const findSeed = (locale: Locale, slug: string): SeedLesson | null =>
  LESSONS.find((entry) => entry.slug[locale] === slug) ?? null;

const resolve = (lesson: SeedLesson, locale: Locale): Lesson => {
  const topic = TOPICS.find((entry) => entry.id === lesson.topicId);
  const slug = lesson.slug[locale];
  const position = topic ? topic.slugs[locale].indexOf(slug) + 1 : 0;

  return {
    id: lesson.id,
    slug,
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
            total: topic.slugs[locale].length,
          },
        }
      : {}),
    ...(lesson.relatedSymbols ? { relatedSymbols: lesson.relatedSymbols } : {}),
    ...(lesson.upNextSlugs ? { upNextSlugs: lesson.upNextSlugs[locale] } : {}),
  };
};

export const getLessons = (locale: Locale): Lesson[] =>
  LESSONS.map((lesson) => resolve(lesson, locale));

export const getFeaturedLessons = (locale: Locale): Lesson[] =>
  START_HERE[locale]
    .map((slug) => findSeed(locale, slug))
    .filter((entry): entry is SeedLesson => entry !== null)
    .map((entry) => resolve(entry, locale));

export const getLessonBySlug = (
  locale: Locale,
  slug: string,
): Lesson | null => {
  const lesson = findSeed(locale, slug);
  return lesson ? resolve(lesson, locale) : null;
};

export const getLessonSlugs = (locale: Locale): string[] =>
  LESSONS.map((lesson) => lesson.slug[locale]);

export const getTopics = (locale: Locale): LessonTopic[] =>
  TOPICS.map((topic) => ({
    id: topic.id,
    title: topic.title[locale],
    lessonCount: topic.slugs[locale].length,
    lessons: topic.slugs[locale]
      .map((slug) => findSeed(locale, slug))
      .filter((entry): entry is SeedLesson => entry !== null)
      .map((entry) => resolve(entry, locale)),
  }));

export const getGlossary = (locale: Locale): GlossaryTerm[] => GLOSSARY[locale];

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
