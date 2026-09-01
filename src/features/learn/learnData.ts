import { locales, type Locale } from '@/i18n/config';
import { GLOSSARY, LESSONS, START_HERE, TOPICS } from './content';
import { readingMinutesFor } from './content/readingMinutes';
import type { SeedLesson } from './content/types';
import {
  pickLocalized,
  type GlossaryTerm,
  type LearnStats,
  type Lesson,
  type LessonTopic,
} from './learnTypes';

const findSeed = (locale: Locale, slug: string): SeedLesson | null =>
  LESSONS.find((entry) => pickLocalized(entry.slug, locale) === slug) ?? null;

const resolve = (lesson: SeedLesson, locale: Locale): Lesson => {
  const topic = TOPICS.find((entry) => entry.id === lesson.topicId);
  const slug = pickLocalized(lesson.slug, locale);
  const topicSlugs = topic ? pickLocalized(topic.slugs, locale) : [];
  const position = topic ? topicSlugs.indexOf(slug) + 1 : 0;

  return {
    id: lesson.id,
    slug,
    title: pickLocalized(lesson.title, locale),
    summary: pickLocalized(lesson.summary, locale),
    readingMinutes: readingMinutesFor(lesson, locale),
    level: lesson.level,
    ...(lesson.body ? { body: pickLocalized(lesson.body, locale) } : {}),
    ...(lesson.inOneSentence
      ? { inOneSentence: pickLocalized(lesson.inOneSentence, locale) }
      : {}),
    ...(lesson.workedExample
      ? { workedExample: pickLocalized(lesson.workedExample, locale) }
      : {}),
    ...(lesson.comparison
      ? { comparison: pickLocalized(lesson.comparison, locale) }
      : {}),
    ...(lesson.keyTerms
      ? { keyTerms: pickLocalized(lesson.keyTerms, locale) }
      : {}),
    ...(lesson.quiz ? { quiz: pickLocalized(lesson.quiz, locale) } : {}),
    ...(lesson.noMaths ? { noMaths: true } : {}),
    ...(topic && position > 0
      ? {
          track: {
            topicTitle: pickLocalized(topic.title, locale),
            position,
            total: topicSlugs.length,
          },
        }
      : {}),
    ...(lesson.relatedSymbols ? { relatedSymbols: lesson.relatedSymbols } : {}),
    ...(lesson.upNextSlugs
      ? { upNextSlugs: pickLocalized(lesson.upNextSlugs, locale) }
      : {}),
  };
};

export const getLessons = (locale: Locale): Lesson[] =>
  LESSONS.map((lesson) => resolve(lesson, locale));

export const getFeaturedLessons = (locale: Locale): Lesson[] =>
  pickLocalized(START_HERE, locale)
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
  LESSONS.map((lesson) => pickLocalized(lesson.slug, locale));

export const getLessonSlugAlternates = (
  locale: Locale,
  slug: string,
): Partial<Record<Locale, string>> | null => {
  const seed = findSeed(locale, slug);
  if (!seed) return null;
  return Object.fromEntries(
    locales.map((entry) => [entry, pickLocalized(seed.slug, entry)]),
  );
};

export const getTopics = (locale: Locale): LessonTopic[] =>
  TOPICS.map((topic) => {
    const slugs = pickLocalized(topic.slugs, locale);
    return {
      id: topic.id,
      title: pickLocalized(topic.title, locale),
      lessonCount: slugs.length,
      lessons: slugs
        .map((slug) => findSeed(locale, slug))
        .filter((entry): entry is SeedLesson => entry !== null)
        .map((entry) => resolve(entry, locale)),
    };
  });

export const getGlossary = (locale: Locale): GlossaryTerm[] =>
  pickLocalized(GLOSSARY, locale);

export const getLearnStats = (locale: Locale): LearnStats => ({
  lessonCount: LESSONS.length,
  averageMinutes: Math.round(
    LESSONS.reduce(
      (total, lesson) => total + readingMinutesFor(lesson, locale),
      0,
    ) / LESSONS.length,
  ),
  glossarySize: pickLocalized(GLOSSARY, locale).length,
});
