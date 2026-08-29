import { getTranslations } from 'next-intl/server';
import { searchArticles } from '@/features/news';
import type { Locale } from '@/i18n/config';
import { Link } from '@/i18n/navigation';
import { articleEntry } from './articleEntry';
import { buildSearchIndex } from './buildSearchIndex';
import { rankResults } from './rankResults';
import type { SearchKind } from './searchTypes';

const GROUPS: SearchKind[] = [
  'page',
  'lesson',
  'term',
  'market',
  'article',
  'event',
];

interface SearchResultsProps {
  locale: Locale;
  query: string;
}

export async function SearchResults({ locale, query }: SearchResultsProps) {
  const t = await getTranslations({ locale, namespace: 'search' });

  if (query.length === 0) {
    return <p className="text-ink-faint text-[15px]">{t('prompt')}</p>;
  }

  const [index, wire] = await Promise.all([
    buildSearchIndex(locale),
    searchArticles(locale, query),
  ]);

  const known = new Set(index.map((entry) => entry.href));
  const fromWire = wire
    .flatMap((article) => articleEntry(article) ?? [])
    .filter((entry) => !known.has(entry.href));

  const results = rankResults([...index, ...fromWire], query);

  if (results.length === 0) {
    return (
      <div className="max-w-155">
        <p className="text-ink mb-2 text-[17px]">{t('empty', { query })}</p>
        <p className="text-ink-faint text-[15px]">{t('emptyHint')}</p>
      </div>
    );
  }

  const grouped = GROUPS.map((kind) => ({
    kind,
    entries: results.filter((entry) => entry.kind === kind),
  })).filter((group) => group.entries.length > 0);

  return (
    <>
      <p className="text-ink-faint mb-8 text-[13px]">
        {t('count', { count: results.length, query })}
      </p>

      <div className="flex flex-col gap-10">
        {grouped.map((group) => (
          <section key={group.kind}>
            <h2 className="text-ink-faint mb-4 text-[11px] font-semibold tracking-[0.12em] uppercase">
              {t(`kinds.${group.kind}`)}
            </h2>
            <ul className="border-line bg-surface divide-line-soft divide-y rounded-sm border">
              {group.entries.map((entry) => (
                <li key={`${entry.kind}-${entry.href}`}>
                  <Link
                    href={entry.href}
                    className="hover:bg-paper block px-5 py-4"
                  >
                    <span className="text-ink block text-[16.5px]">
                      {entry.title}
                    </span>
                    {(entry.subtitle ?? entry.context) ? (
                      <span className="text-ink-faint mt-1 block text-[14px] leading-relaxed">
                        {entry.subtitle ?? entry.context}
                      </span>
                    ) : null}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </>
  );
}
