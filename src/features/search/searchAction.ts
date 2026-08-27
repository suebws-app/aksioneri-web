'use server';

import { searchArticles } from '@/features/news';
import { defaultLocale, isLocale, type Locale } from '@/i18n/config';
import { articleEntry } from './articleEntry';
import { buildSearchIndex } from './buildSearchIndex';
import { MIN_QUERY_LENGTH } from './rankResults';
import type { SearchEntry } from './searchTypes';

/**
 * How much of a summary or definition travels to the browser.
 *
 * The index is only used to *find* things — the page it links to has the full
 * text. Definitions and standfirsts are the bulk of the payload, so they are
 * cut to a line's worth. Matching still happens against the trimmed string, so
 * what the reader sees is what was searched.
 */
const SUBTITLE_LIMIT = 120;

const trim = (value: string | undefined): string | undefined => {
  if (!value) return undefined;
  return value.length > SUBTITLE_LIMIT
    ? `${value.slice(0, SUBTITLE_LIMIT).trimEnd()}…`
    : value;
};

/**
 * The search index, for the nav's inline search.
 *
 * A server action rather than a prop on `SiteHeader`: the header renders on
 * every page, and pushing a few hundred entries into every RSC payload would
 * make every page heavier to serve a box most visits never open. The client
 * calls this once, the first time someone opens search, and filters locally
 * from then on — so typing costs no round trips.
 *
 * It is also why this is not a route handler: `fetch` is confined to
 * `lib/api/client.ts` by convention, and an action needs no second call site.
 *
 * The locale is a parameter rather than a `getLocale()` call: next-intl
 * resolves it from the `[locale]` root param (see `i18n/request.ts`), and root
 * params are unavailable inside a Server Action — reading them there throws,
 * which answered every open with a 500 and left the reader with the failure
 * message. The caller is a client component that already knows the locale.
 */
export async function loadSearchIndex(
  requested: Locale,
): Promise<SearchEntry[]> {
  // The argument crosses the wire, so it is checked rather than trusted.
  const locale = isLocale(requested) ? requested : defaultLocale;
  const entries = await buildSearchIndex(locale);

  return entries.map((entry) => ({
    ...entry,
    subtitle: trim(entry.subtitle),
    context: trim(entry.context),
  }));
}

/**
 * Stories matching a query, from the whole archive.
 *
 * The index the dropdown filters against holds only the newest twenty stories
 * — enough to answer "what's on the wire", useless for "that piece about
 * Nvidia last month". This asks the API's search endpoint, which reads the
 * archive and matches the Albanian translation as well as the source text.
 *
 * Called per query rather than once per session, so it is deliberately small:
 * a dozen results, headlines and standfirsts only.
 *
 * Takes the locale for the same reason `loadSearchIndex` does.
 */
export async function searchWire(
  requested: Locale,
  query: string,
): Promise<SearchEntry[]> {
  const trimmed = query.trim();
  if (trimmed.length < MIN_QUERY_LENGTH) return [];

  const locale = isLocale(requested) ? requested : defaultLocale;
  const articles = await searchArticles(locale, trimmed);

  return articles.flatMap((article) => {
    const entry = articleEntry(article);
    return entry ? [{ ...entry, subtitle: trim(entry.subtitle) }] : [];
  });
}
