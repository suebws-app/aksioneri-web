import { useTranslations } from 'next-intl';
import { SiteFooter } from '@/components/SiteFooter';
import { SiteHeader } from '@/components/SiteHeader';
import { NavSearch } from '@/features/search';
import { Link } from '@/i18n/navigation';

export default function ArticleNotFound() {
  const t = useTranslations('news.articleNotFound');

  return (
    <div className="bg-paper flex min-h-screen flex-col">
      <SiteHeader
        active="news"
        searchSlot={<NavSearch />}
        mobileSearchSlot={<NavSearch variant="mobile" />}
      />

      <main id="main-content" className="flex-1">
        <div className="page-container py-16">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-ink-faint font-mono text-6xl tracking-widest">
              404
            </p>
            <h1 className="text-ink mt-3 font-serif text-3xl leading-tight font-medium text-balance">
              {t('heading')}
            </h1>
            <p className="text-ink-body mx-auto mt-4 max-w-120">{t('body')}</p>

            <div className="mt-8">
              <Link
                href="/news"
                className="text-accent inline-block font-medium underline underline-offset-4"
              >
                {t('backToNews')}
              </Link>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
