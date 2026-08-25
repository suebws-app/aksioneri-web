import { useTranslations } from 'next-intl';
import { SiteFooter } from '@/components/SiteFooter';
import { SiteHeader } from '@/components/SiteHeader';
import { NavSearch } from '@/features/search';
import { Link } from '@/i18n/navigation';
import { SearchField } from './components/SearchField';
import type { SearchEntry, SearchKind } from './searchTypes';

export interface SearchPageProps {
  /** What the reader typed, already trimmed. Empty before a first search. */
  query: string;
  results: SearchEntry[];
}

/**
 * The order groups appear in, regardless of how well anything scored.
 *
 * Ranking decides what is best *within* a section; this decides which section
 * a reader meets first. Teaching material comes before the wire because a
 * search for "inflacion" is far more often "explain this" than "what happened
 * today" — and today's story is one tab away on `/news`.
 */
const GROUPS: SearchKind[] = [
  'page',
  'lesson',
  'term',
  'market',
  'article',
  'event',
];

export function SearchPage({ query, results }: SearchPageProps) {
  const t = useTranslations('search');

  const grouped = GROUPS.map((kind) => ({
    kind,
    entries: results.filter((entry) => entry.kind === kind),
  })).filter((group) => group.entries.length > 0);

  const hasSearched = query.length > 0;

  return (
    <div className="bg-paper flex min-h-screen flex-col">
      <SiteHeader
        searchSlot={<NavSearch />}
        mobileSearchSlot={<NavSearch variant="mobile" />}
      />

      <main className="flex-1">
        <section className="border-line bg-surface-muted border-b">
          <div className="page-container py-11">
            <h1 className="text-ink mb-3 font-serif text-[44px] leading-[1.1] font-medium tracking-[-0.022em]">
              {t('heading')}
            </h1>
            <p className="text-ink-body mb-7 max-w-[620px] text-lg leading-relaxed">
              {t('intro')}
            </p>
            <SearchField query={query} />
          </div>
        </section>

        <div className="page-container py-11">
          {!hasSearched ? (
            <p className="text-ink-faint text-[15px]">{t('prompt')}</p>
          ) : results.length === 0 ? (
            <div className="max-w-[620px]">
              <p className="text-ink mb-2 text-[17px]">
                {t('empty', { query })}
              </p>
              <p className="text-ink-faint text-[15px]">{t('emptyHint')}</p>
            </div>
          ) : (
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
          )}
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
