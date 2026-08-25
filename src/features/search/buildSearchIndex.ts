import { getTranslations } from 'next-intl/server';
import { getCalendarWeek } from '@/features/calendar';
import { getGlossary, getLessons, getTopics } from '@/features/learn';
import { getArticles } from '@/features/news';
import type { Locale } from '@/i18n/config';
import { getQuote } from '@/features/markets';
import { SUPPORTED_SYMBOLS } from '@/lib/api/markets';
import { articleEntry } from './articleEntry';
import type { SearchEntry } from './searchTypes';

/**
 * Everything the site can find, flattened into one list.
 *
 * Built per request on the server. Three of the four sections are local
 * constants — lessons, the glossary and the calendar are seeded modules, so
 * assembling them costs nothing and needs no network. Only the wire is
 * fetched, and it fails soft: `getArticles` returns `[]` when the API is cold,
 * which costs the reader the news group rather than the whole page.
 *
 * Order matters. `rankResults` keeps source order when scores tie, so the
 * sections are concatenated in the order a reader most likely wants them:
 * lessons and definitions (evergreen, the reason the site exists) before the
 * wire and the calendar (perishable).
 */
export async function buildSearchIndex(locale: Locale): Promise<SearchEntry[]> {
  const [tNav, tLearn] = await Promise.all([
    getTranslations({ locale, namespace: 'nav' }),
    getTranslations({ locale, namespace: 'learn' }),
  ]);

  const [lessons, glossary, articles] = [
    getLessons(locale),
    getGlossary(locale),
    await getArticles(locale),
  ];

  // A lesson's topic is only known from the topic tree, not the lesson itself.
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
    // Key terms are what make a lesson findable by the thing it teaches
    // rather than by the title someone gave it.
    keywords: (lesson.keyTerms ?? []).map((term) => term.term),
  }));

  const termEntries: SearchEntry[] = glossary.map((term) => ({
    kind: 'term',
    title: term.term,
    subtitle: term.definition,
    // The glossary is one page with an anchor per term; a term that has a
    // lesson still links to the glossary, where the lesson is linked in turn.
    href: `/learn/glossary#${term.slug}`,
    keywords: term.aliases ?? [],
  }));

  const articleEntries: SearchEntry[] = articles.flatMap(
    (article) => articleEntry(article) ?? [],
  );

  const week = getCalendarWeek(locale);
  const eventEntries: SearchEntry[] = week.days.flatMap((day) =>
    day.events.map((event) => ({
      kind: 'event' as const,
      title: event.title,
      context: `${day.date} · ${event.time}`,
      href: `/calendar/${event.slug}`,
      keywords: [event.region],
    })),
  );

  const marketEntries: SearchEntry[] = SUPPORTED_SYMBOLS.flatMap((symbol) => {
    const quote = getQuote(locale, symbol);
    if (!quote) return [];

    // Readers type a ticker every way it is written: `sp-500`, `s&p 500`,
    // `sp500`. The condensed forms are the ones the punctuation would
    // otherwise hide.
    const condensed = quote.name.toLowerCase().replace(/[^a-z0-9]/g, '');

    return [
      {
        kind: 'market' as const,
        title: quote.name,
        href: `/markets/${symbol}`,
        keywords: [
          symbol,
          symbol.replace(/-/g, ' '),
          symbol.replace(/-/g, ''),
          condensed,
        ],
      },
    ];
  });

  /**
   * The site's own sections.
   *
   * First in the list, so a reader searching for a destination gets the
   * destination before the articles that mention it — ties keep index order.
   */
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
