import type { GlossaryTerm, LessonLevel, Localized } from '../learnTypes';

export interface SeedLesson {
  id: string;
  slug: Localized<string>;
  topicId: string;
  title: Localized<string>;
  summary: Localized<string>;
  level: LessonLevel;
  inOneSentence?: Localized<string>;
  body?: Localized<{ heading: string; paragraphs: string[] }[]>;
  workedExample?: Localized<{ title: string; body: string }[]>;
  comparison?: Localized<{
    heading: string;
    columns: [string, string, string];
    rows: {
      label: string;
      value: string;
      cost: string;
      tone?: 'positive' | 'negative' | 'neutral';
    }[];
  }>;
  keyTerms?: Localized<GlossaryTerm[]>;
  quiz?: Localized<{
    question: string;
    options: string[];
    answer: number;
    explanation: string;
  }>;
  noMaths?: boolean;
  relatedSymbols?: string[];
  upNextSlugs?: Localized<string[]>;
}

export interface SeedTopic {
  id: string;
  title: Localized<string>;
  slugs: Localized<string[]>;
}
