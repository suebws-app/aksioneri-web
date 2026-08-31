'use server';

import { searchArticles } from '@/features/news';
import { defaultLocale, isLocale, type Locale } from '@/i18n/config';
import { searchInstruments, type InstrumentSearchHit } from '@/lib/api/markets';
import { articleEntry } from './articleEntry';
import { buildSearchIndex } from './buildSearchIndex';
import { MIN_QUERY_LENGTH } from './rankResults';
import type { SearchEntry } from './searchTypes';

const SUBTITLE_LIMIT = 120;

const trim = (value: string | undefined): string | undefined => {
  if (!value) return undefined;
  return value.length > SUBTITLE_LIMIT
    ? `${value.slice(0, SUBTITLE_LIMIT).trimEnd()}…`
    : value;
};

export async function loadSearchIndex(
  requested: Locale,
): Promise<SearchEntry[]> {
  const locale = isLocale(requested) ? requested : defaultLocale;
  const entries = await buildSearchIndex(locale);

  return entries.map((entry) => ({
    ...entry,
    subtitle: trim(entry.subtitle),
    context: trim(entry.context),
  }));
}

function instrumentEntry(hit: InstrumentSearchHit): SearchEntry | null {
  if (!hit.symbol) return null;
  const parts = [hit.symbol, hit.exchange, hit.type]
    .filter(Boolean)
    .join(' · ');
  return {
    kind: 'market',
    title: hit.name || hit.symbol,
    subtitle: trim(parts || undefined),
    context: hit.symbol,
    href: `/markets/${encodeURIComponent(hit.symbol)}`,
    keywords: [hit.symbol, hit.symbol.toUpperCase(), hit.symbol.toLowerCase()],
  };
}

function normalizeName(name: string): string {
  return name
    .toLowerCase()
    .replace(/[.,'"()]/g, '')
    .replace(/\s+(class\s+[a-c]|adr|adrs|shs|shares|ord|new)$/i, '')
    .replace(
      /\s+(inc|corp|corporation|co|company|ltd|limited|plc|sa|nv|ag|ab|holdings?|group|se|nse)\.?$/i,
      '',
    )
    .replace(/\s+/g, ' ')
    .trim();
}

function isServableListing(hit: InstrumentSearchHit): boolean {
  return !hit.symbol.includes('.');
}

function dedupeInstruments(
  hits: readonly InstrumentSearchHit[],
): InstrumentSearchHit[] {
  const bySignature = new Map<string, InstrumentSearchHit>();
  for (const hit of hits) {
    if (!hit.name && !hit.symbol) continue;
    if (!isServableListing(hit)) continue;
    const signature = normalizeName(hit.name || hit.symbol);
    const existing = bySignature.get(signature);
    if (!existing || hit.symbol.length < existing.symbol.length) {
      bySignature.set(signature, hit);
    }
  }
  return Array.from(bySignature.values());
}

export async function searchWire(
  requested: Locale,
  query: string,
): Promise<SearchEntry[]> {
  const trimmed = query.trim();
  if (trimmed.length < MIN_QUERY_LENGTH) return [];

  const locale = isLocale(requested) ? requested : defaultLocale;

  const [articles, instruments] = await Promise.all([
    searchArticles(locale, trimmed),
    searchInstruments(trimmed, 12).catch(() => [] as InstrumentSearchHit[]),
  ]);

  const articleEntries = articles.flatMap((article) => {
    const entry = articleEntry(article);
    return entry ? [{ ...entry, subtitle: trim(entry.subtitle) }] : [];
  });

  const instrumentEntries = dedupeInstruments(instruments)
    .slice(0, 6)
    .flatMap((hit) => {
      const entry = instrumentEntry(hit);
      return entry ? [entry] : [];
    });

  return [...instrumentEntries, ...articleEntries];
}
