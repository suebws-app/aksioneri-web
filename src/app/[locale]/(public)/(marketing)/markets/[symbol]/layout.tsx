import type { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { Breadcrumb } from '@/components/Breadcrumb';
import { SiteFooter } from '@/components/SiteFooter';
import { SiteHeader } from '@/components/SiteHeader';
import { CompanyHeader } from '@/features/markets/components/CompanyHeader';
import { CompanyNavigation } from '@/features/markets/components/CompanyNavigation';
import {
  categoryToMarketTab,
  resolveTickerSlug,
} from '@/features/markets/marketsUniverse';
import { NavSearch } from '@/features/search';
import { getAssetDetail } from '@/lib/api/markets';

interface LayoutProps {
  children: ReactNode;
  params: Promise<{ locale: string; symbol: string }>;
}

export default async function CompanyLayout({ children, params }: LayoutProps) {
  const { locale, symbol } = await params;
  const asset = await getAssetDetail(resolveTickerSlug(symbol));
  if (!asset) notFound();

  const t = await getTranslations({ locale, namespace: 'markets' });
  const tCategories = await getTranslations({
    locale,
    namespace: 'markets.categories',
  });

  return (
    <div className="bg-paper flex min-h-screen flex-col">
      <SiteHeader
        searchSlot={<NavSearch />}
        mobileSearchSlot={<NavSearch variant="mobile" />}
      />

      <main id="main-content" className="flex-1">
        <Breadcrumb
          label={t('breadcrumbRoot')}
          items={[
            { label: t('breadcrumbRoot'), href: '/markets' },
            {
              label: tCategories(asset.category),
              href: categoryHref(asset.category),
            },
            { label: asset.name },
          ]}
        />

        <CompanyHeader asset={asset} />
        <CompanyNavigation symbol={asset.symbol} category={asset.category} />

        {children}
      </main>

      <div className="mt-13">
        <SiteFooter />
      </div>
    </div>
  );
}

function categoryHref(category: string): string {
  const tab = categoryToMarketTab(category);
  return tab === 'overview' ? '/markets' : `/markets?tab=${tab}`;
}
