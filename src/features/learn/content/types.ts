import type { GlossaryTerm, LessonLevel, Localized } from '../learnTypes';

/**
 * The authoring shape for lesson content.
 *
 * Every reader-facing string is `Localized<T>` — both languages sit side by
 * side in one object rather than in parallel files, so a lesson cannot be
 * written in one language and silently missed in the other.
 *
 * Note there is no `readingMinutes`. It is counted from the words actually
 * written, in `readingMinutes.ts`. Authoring it by hand is how the section
 * came to advertise 4-8 minute lessons over 94 words of prose.
 */
export interface SeedLesson {
  id: string;
  /**
   * URL slug, per locale — the router uses whichever slug matches the current
   * locale. `id` stays stable and English so cross-references and any
   * slug-keyed storage do not shift when a translation is edited.
   */
  slug: Localized<string>;
  /** Topic the lesson belongs to. Must match a `SeedTopic.id`. */
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
  /** Only set where the lesson genuinely involves no arithmetic. */
  noMaths?: boolean;
  relatedSymbols?: string[];
  upNextSlugs?: Localized<string[]>;
}

/**
 * A topic and the order its lessons are read in.
 *
 * There is no authored count: the page's "N lessons" label is `slugs.length`.
 * Every lesson must appear in exactly one topic's `slugs`, or it gets a page
 * with no breadcrumb and no progress bar, and nothing links to it.
 */
export interface SeedTopic {
  id: string;
  title: Localized<string>;
  /** Reading order — a per-locale list of that locale's lesson slugs. */
  slugs: Localized<string[]>;
}
