import type { Locale } from '@/i18n/config';

export type LessonLevel = 'beginner' | 'intermediate' | 'advanced';

export interface Lesson {
  id: string;
  slug: string;
  title: string;
  summary: string;
  readingMinutes: number;
  level: LessonLevel;
  body?: { heading: string; paragraphs: string[] }[];

  inOneSentence?: string;
  workedExample?: { title: string; body: string }[];
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
  noMaths?: boolean;
  track?: { topicTitle: string; position: number; total: number };
  relatedSymbols?: string[];
  upNextSlugs?: string[];
}

export interface LessonTopic {
  id: string;
  title: string;
  lessonCount: number;
  lessons: Lesson[];
}

export interface LessonQuiz {
  question: string;
  options: string[];
  answer: number;
  explanation: string;
}

export interface GlossaryTerm {
  slug: string;
  term: string;
  definition: string;
  aliases?: string[];
  lessonSlug?: string;
}

export interface LearnStats {
  lessonCount: number;
  averageMinutes: number;
  glossarySize: number;
}

export type Localized<T> = Record<Locale, T>;
