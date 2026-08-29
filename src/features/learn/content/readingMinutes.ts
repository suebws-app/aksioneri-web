import type { Locale } from '@/i18n/config';
import type { SeedLesson } from './types';

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

  if (lesson.comparison) {
    words += lesson.comparison[locale].rows.length * 8;
  }

  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}
