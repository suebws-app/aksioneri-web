'use server';

import { getLocale } from 'next-intl/server';
import type { Locale } from '@/i18n/config';
import { buildSearchIndex } from './buildSearchIndex';
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
 */
export async function loadSearchIndex(): Promise<SearchEntry[]> {
  const locale = (await getLocale()) as Locale;
  const entries = await buildSearchIndex(locale);

  return entries.map((entry) => ({
    ...entry,
    subtitle: trim(entry.subtitle),
    context: trim(entry.context),
  }));
}
