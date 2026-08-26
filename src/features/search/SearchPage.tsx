import { useTranslations } from 'next-intl';
import type { ReactNode } from 'react';
import { SiteFooter } from '@/components/SiteFooter';
import { SiteHeader } from '@/components/SiteHeader';
import { NavSearch } from '@/features/search';
import { SearchField } from './components/SearchField';

interface SearchPageProps {
  /** What the reader typed, already trimmed. Empty before a first search. */
  query: string;
  /**
   * The results block. Kept as a slot so `page.tsx` can wrap it in a
   * `<Suspense>` — only the results shimmer while a new query fetches,
   * the hero and the search field stay put.
   */
  children: ReactNode;
}

export function SearchPage({ query, children }: SearchPageProps) {
  const t = useTranslations('search');

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

        <div className="page-container py-11">{children}</div>
      </main>

      <SiteFooter />
    </div>
  );
}
