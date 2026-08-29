import { useTranslations } from 'next-intl';
import type { ReactNode } from 'react';
import { SiteFooter } from '@/components/SiteFooter';
import { SiteHeader } from '@/components/SiteHeader';
import { NavSearch } from '@/features/search';
import { SearchField } from './components/SearchField';

interface SearchPageProps {
  query: string;
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

      <main id="main-content" className="flex-1">
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
