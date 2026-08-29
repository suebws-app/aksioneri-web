import { describe, expect, it } from 'vitest';
import {
  findArticleForLesson,
  findArticlesMentioning,
  findLessonForArticle,
} from '../matchNews';
import type { GlossaryTerm, Lesson } from '../learnTypes';
import type { NewsArticle } from '@/lib/api/news';

const term = (slug: string, name: string, aliases: string[]): GlossaryTerm => ({
  slug,
  term: name,
  definition: `Përkufizimi i ${name}.`,
  aliases,
  lessonSlug: `lesson-${slug}`,
});

const GLOSSARY = [
  term('inflation', 'Inflacion', ['inflacioni', 'inflation']),
  term('dividend', 'Dividend', ['dividendi', 'dividend', 'dividends']),
  term('buyback', 'Riblerje', ['buyback', 'buybacks']),
];

const lesson = (slug: string, termSlugs: string[]): Lesson =>
  ({
    id: slug,
    slug,
    title: slug,
    summary: '',
    readingMinutes: 2,
    level: 'beginner',
    keyTerms: termSlugs.map((s) => ({
      slug: s,
      term: s,
      definition: '',
    })),
  }) as Lesson;

const article = (
  slug: string,
  title: string,
  summary = '',
  body: string[] = [],
): NewsArticle =>
  ({
    id: slug,
    slug,
    category: 'macro',
    title,
    summary,
    minutesAgo: 1,
    readingMinutes: 2,
    publishedAt: '2026-08-24T12:00:00.000Z',
    body,
  }) as NewsArticle;

describe('findArticleForLesson', () => {
  it('matches an English headline against an Albanian lesson', () => {
    const found = findArticleForLesson(
      lesson('inflation-in-one-page', ['inflation']),
      [article('a', 'US inflation cools to 2.4% in August')],
      GLOSSARY,
    );

    expect(found?.slug).toBe('a');
  });

  it('prefers a term in the headline over one in the summary', () => {
    const found = findArticleForLesson(
      lesson('l', ['inflation']),
      [
        article('summary-only', 'Markets drift', 'Traders watch inflation.'),
        article('headline', 'Inflation slows sharply'),
      ],
      GLOSSARY,
    );

    expect(found?.slug).toBe('headline');
  });

  it('returns null when nothing on the wire is about the lesson', () => {
    expect(
      findArticleForLesson(
        lesson('l', ['inflation']),
        [article('a', 'Poland stocks higher at close of trade')],
        GLOSSARY,
      ),
    ).toBeNull();
  });

  it('returns null on an empty wire rather than throwing', () => {
    expect(
      findArticleForLesson(lesson('l', ['inflation']), [], GLOSSARY),
    ).toBeNull();
  });
});

describe('findLessonForArticle', () => {
  it('picks the lesson whose vocabulary appears most often', () => {
    const lessons = [
      lesson('lesson-inflation', []),
      lesson('lesson-dividend', []),
    ];
    const found = findLessonForArticle(
      article('a', 'Dividend season', 'Payouts rise.', [
        'The dividend was raised.',
        'Another dividend followed.',
        'Inflation was mentioned once.',
      ]),
      GLOSSARY,
      lessons,
    );

    expect(found?.slug).toBe('lesson-dividend');
  });

  it('returns null when no glossary term appears', () => {
    expect(
      findLessonForArticle(
        article('a', 'Weather disrupts shipping'),
        GLOSSARY,
        [],
      ),
    ).toBeNull();
  });
});

describe('findArticlesMentioning', () => {
  it('matches on whole words only', () => {
    const found = findArticlesMentioning(
      ['Gold'],
      [
        article('a', 'Goldman Sachs raises target'),
        article('b', 'Gold hits a record high'),
      ],
    );

    expect(found.map((entry) => entry.slug)).toEqual(['b']);
  });

  it('stops at the limit', () => {
    const found = findArticlesMentioning(
      ['Gold'],
      [1, 2, 3, 4, 5].map((n) => article(`a${String(n)}`, 'Gold rises again')),
      2,
    );

    expect(found).toHaveLength(2);
  });
});
