import type { Locale } from '@/i18n/config';
import { pickLocalized } from '../learnTypes';
import type { SeedLesson } from './types';

const WORDS_PER_MINUTE = 200;

const countWords = (text: string): number =>
  text.trim().split(/\s+/).filter(Boolean).length;

export function readingMinutesFor(lesson: SeedLesson, locale: Locale): number {
  const sections = lesson.body ? pickLocalized(lesson.body, locale) : [];

  let words = countWords(pickLocalized(lesson.summary, locale));
  if (lesson.inOneSentence) {
    words += countWords(pickLocalized(lesson.inOneSentence, locale));
  }

  for (const section of sections) {
    words += countWords(section.heading);
    for (const paragraph of section.paragraphs) words += countWords(paragraph);
  }

  if (lesson.workedExample) {
    for (const step of pickLocalized(lesson.workedExample, locale)) {
      words += countWords(step.title) + countWords(step.body);
    }
  }

  if (lesson.keyTerms) {
    for (const entry of pickLocalized(lesson.keyTerms, locale)) {
      words += countWords(entry.definition);
    }
  }

  if (lesson.comparison) {
    words += pickLocalized(lesson.comparison, locale).rows.length * 8;
  }

  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}
