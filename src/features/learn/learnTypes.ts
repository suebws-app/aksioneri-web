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
  /** Self-check. Answers are not revealed — no grading exists yet. */
  quiz?: { question: string; options: string[] };
  /** Position within its topic, for the breadcrumb and progress bar. */
  track?: { topicTitle: string; position: number; total: number };
  /** Instruments that illustrate the lesson. */
  relatedSymbols?: string[];
  /** Lessons suggested next. */
  upNextSlugs?: string[];
  /** A current story where the lesson's vocabulary appears. */
  relatedArticleSlug?: string;
}

/** A named group of lessons, e.g. "The basics". */
export interface LessonTopic {
  id: string;
  title: string;
  /** Total lessons in the topic, which may exceed the ones listed. */
  lessonCount: number;
  lessons: Lesson[];
}

/** One-line definition in the jargon buster. */
export interface GlossaryTerm {
  term: string;
  definition: string;
}

export interface LearnStats {
  lessonCount: number;
  averageMinutes: number;
  /** Total glossary size, for the "see all N terms" link. */
  glossarySize: number;
}

export type Localized<T> = Record<Locale, T>;
