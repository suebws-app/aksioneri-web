import { getTranslations } from 'next-intl/server';
import { getCalendarWeek } from '@/features/calendar';
import { getGlossary, getLessons, getTopics } from '@/features/learn';
import { getArticles } from '@/features/news';
import type { Locale } from '@/i18n/config';
import { getQuotes } from '@/lib/api/markets';
import { articleEntry } from './articleEntry';
import type { SearchEntry } from './searchTypes';

export async function buildSearchIndex(locale: Locale): Promise<SearchEntry[]> {
  const [tNav, tLearn] = await Promise.all([
    getTranslations({ locale, namespace: 'nav' }),
    getTranslations({ locale, namespace: 'learn' }),
  ]);

  const [articles, quotes] = await Promise.all([
    getArticles(locale),
    getQuotes(),
  ]);
  const lessons = getLessons(locale);
  const glossary = getGlossary(locale);

  const topicBySlug = new Map<string, string>();
  for (const topic of getTopics(locale)) {
    for (const lesson of topic.lessons)
      topicBySlug.set(lesson.slug, topic.title);
  }

  const lessonEntries: SearchEntry[] = lessons.map((lesson) => ({
    kind: 'lesson',
    title: lesson.title,
    subtitle: lesson.summary,
    context: topicBySlug.get(lesson.slug),
    href: `/learn/${lesson.slug}`,
    keywords: (lesson.keyTerms ?? []).map((term) => term.term),
  }));

  const termEntries: SearchEntry[] = glossary.map((term) => ({
    kind: 'term',
    title: term.term,
    subtitle: term.definition,
    href: `/learn/glossary#${term.slug}`,
    keywords: term.aliases ?? [],
  }));

  const articleEntries: SearchEntry[] = articles.flatMap(
    (article) => articleEntry(article) ?? [],
  );

  const week = await getCalendarWeek(locale);
  const eventEntries: SearchEntry[] = week.days.flatMap((day) =>
    day.events.map((event) => ({
      kind: 'event' as const,
      title: event.title,
      context: `${day.date} · ${event.time}`,
      href: `/calendar/${event.slug}`,
      keywords: [event.region],
    })),
  );

  const marketEntries: SearchEntry[] = quotes.map((quote) => {
    const condensed = quote.name.toLowerCase().replace(/[^a-z0-9]/g, '');

    return {
      kind: 'market' as const,
      title: quote.name,
      href: `/markets/${quote.symbol}`,
      keywords: [
        quote.symbol,
        quote.symbol.replace(/-/g, ' '),
        quote.symbol.replace(/-/g, ''),
        condensed,
      ],
    };
  });

  const pageEntries: SearchEntry[] = [
    { kind: 'page', title: tNav('markets'), href: '/markets' },
    { kind: 'page', title: tNav('news'), href: '/news' },
    { kind: 'page', title: tNav('learn'), href: '/learn' },
    {
      kind: 'page',
      title: tLearn('glossary.heading'),
      href: '/learn/glossary',
      keywords: ['fjalor', 'terma', 'glossary'],
    },
    { kind: 'page', title: tNav('calendar'), href: '/calendar' },
  ];

  return [
    ...pageEntries,
    ...lessonEntries,
    ...termEntries,
    ...marketEntries,
    ...articleEntries,
    ...eventEntries,
  ];
}
