import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import {
  getQuotes,
  MARKET_TIMESTAMP,
  MarketsIndexPage,
} from '@/features/markets';
import type { Locale } from '@/i18n/config';
import { buildMetadata } from '@/lib/seo/metadata';

/**
 * Which instruments belong to which group. Symbols not listed here fall into
 * `other`, so adding an instrument never drops it off this page silently.
 */
const GROUPS: { key: string; symbols: string[] }[] = [
  {
    key: 'indices',
    symbols: ['sp-500', 'nasdaq-100', 'dow-jones', 'stoxx-600'],
  },
  { key: 'commodities', symbols: ['gold'] },
  { key: 'crypto', symbols: ['bitcoin'] },
  { key: 'currencies', symbols: ['eur-usd'] },
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'markets' });

  return buildMetadata({
    title: t('indexMetaTitle'),
    description: t('indexMetaDescription'),
    path: '/markets',
    locale,
  });
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const quotes = getQuotes(locale);
  const grouped = GROUPS.map((group) => ({
    key: group.key,
    quotes: quotes.filter((quote) => group.symbols.includes(quote.symbol)),
  })).filter((group) => group.quotes.length > 0);

  // Anything the map above does not claim still has to appear somewhere.
  const claimed = new Set(GROUPS.flatMap((group) => group.symbols));
  const rest = quotes.filter((quote) => !claimed.has(quote.symbol));
  const groups =
    rest.length > 0 ? [...grouped, { key: 'other', quotes: rest }] : grouped;

  return <MarketsIndexPage groups={groups} updatedAt={MARKET_TIMESTAMP} />;
}
