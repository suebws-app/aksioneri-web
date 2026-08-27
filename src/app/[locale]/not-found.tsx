import { useTranslations } from 'next-intl';
import { SiteFooter } from '@/components/SiteFooter';
import { SiteHeader } from '@/components/SiteHeader';
import { NavSearch } from '@/features/search';
import { Link } from '@/i18n/navigation';

/**
 * Localized 404, rendered inside the locale shell (header, fonts, consent)
 * whenever `notFound()` fires — including the `[...rest]` catch-all that
 * absorbs every URL the router cannot match.
 */
export default function NotFound() {
  const t = useTranslations('notFound');

  return (
    <div className="bg-paper flex min-h-screen flex-col">
      <SiteHeader
        searchSlot={<NavSearch />}
        mobileSearchSlot={<NavSearch variant="mobile" />}
      />

      <main id="main-content" className="flex flex-1 items-center">
        <div className="page-container py-20 text-center">
          <p className="text-ink-faint font-mono text-6xl tracking-widest">
            404
          </p>
          <h1 className="text-ink mt-3 font-serif text-4xl leading-tight font-medium text-balance">
            {t('heading')}
          </h1>
          <p className="text-ink-body mx-auto mt-4 max-w-120">{t('body')}</p>
          <Link
            href="/"
            className="text-accent mt-8 inline-block font-medium underline underline-offset-4"
          >
            {t('backHome')}
          </Link>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
