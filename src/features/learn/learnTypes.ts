import type { Locale } from '@/i18n/config';

export type LessonLevel = 'beginner' | 'intermediate' | 'advanced';

export interface Lesson {
  id: string;
  slug: string;
  title: string;
  summary: string;
  readingMinutes: number;
  level: LessonLevel;
  /** Body sections, for the lesson page. */
  body?: { heading: string; paragraphs: string[] }[];

  /** Everything below is present only on fully-written lessons. */
  /** The one-line summary in the blue callout. */
  inOneSentence?: string;
  /** Numbered walk-through card. */
  workedExample?: { title: string; body: string }[];
  /** Comparison table; `tone` colours the cost column. */
  comparison?: {
    heading: string;
    columns: [string, string, string];
    rows: {
      label: string;
      value: string;
      cost: string;
      tone?: 'positive' | 'negative' | 'neutral';
    }[];
  };
  keyTerms?: GlossaryTerm[];
  quiz?: LessonQuiz;
  /**
   * Shows the "no maths required" badge. Authored per lesson rather than
   * assumed: it used to render on every lesson, including the P/E ratio and
   * fees lessons, which are entirely arithmetic.
   */
  noMaths?: boolean;
  /** Position within its topic, for the breadcrumb and progress bar. */
  track?: { topicTitle: string; position: number; total: number };
  /** Instruments that illustrate the lesson. */
  relatedSymbols?: string[];
  /** Lessons suggested next. */
  upNextSlugs?: string[];
}

/** A named group of lessons, e.g. "The basics". */
export interface LessonTopic {
  id: string;
  title: string;
  /** Derived from the lessons listed — never authored separately. */
  lessonCount: number;
  lessons: Lesson[];
}

/** A self-check with one right answer. */
export interface LessonQuiz {
  question: string;
  options: string[];
  /** Index into `options`. */
  answer: number;
  /** Shown once answered — why that option is the right one, in one line. */
  explanation: string;
}

/**
 * One-line definition in the jargon buster and the glossary.
 *
 * `slug` is both the URL fragment on the glossary page and the key the
 * article auto-linker matches on, so it has to be stable once published.
 */
export interface GlossaryTerm {
  slug: string;
  term: string;
  definition: string;
  /**
   * Other spellings and inflections to match in article text — plurals,
   * abbreviations, the Albanian and English forms of the same idea.
   */
  aliases?: string[];
  /** The lesson that explains it properly, when one does. */
  lessonSlug?: string;
}

export interface LearnStats {
  lessonCount: number;
  averageMinutes: number;
  /** Total glossary size, for the "see all N terms" link. */
  glossarySize: number;
}

export type Localized<T> = Record<Locale, T>;
