import type { Locale } from '@/i18n/config';
import type { SeedLesson } from './types';

/**
 * Reading time, counted rather than claimed.
 *
 * Every lesson used to carry an authored `readingMinutes` between 4 and 8. The
 * bodies behind those numbers averaged 94 words — about twenty seconds each,
 * with one lesson advertising eight minutes over eighty-seven words. Counting
 * the words removes the whole class of problem: the label cannot drift from
 * the prose, because it is derived from it.
 */

/** Adult reading speed for prose that requires a little thought. */
const WORDS_PER_MINUTE = 200;

const countWords = (text: string): number =>
  text.trim().split(/\s+/).filter(Boolean).length;

export function readingMinutesFor(lesson: SeedLesson, locale: Locale): number {
  const sections = lesson.body?.[locale] ?? [];

  let words = countWords(lesson.summary[locale]);
  if (lesson.inOneSentence) words += countWords(lesson.inOneSentence[locale]);

  for (const section of sections) {
    words += countWords(section.heading);
    for (const paragraph of section.paragraphs) words += countWords(paragraph);
  }

  for (const step of lesson.workedExample?.[locale] ?? []) {
    words += countWords(step.title) + countWords(step.body);
  }

  for (const entry of lesson.keyTerms?.[locale] ?? []) {
    words += countWords(entry.definition);
  }

  // A table is read, not skimmed, but far faster than the same area of prose.
  if (lesson.comparison) {
    words += lesson.comparison[locale].rows.length * 8;
  }

  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}
