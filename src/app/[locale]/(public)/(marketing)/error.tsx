'use client';

import { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { SiteFooter } from '@/components/SiteFooter';
import { SiteHeader } from '@/components/SiteHeader';
import { NavSearch } from '@/features/search';
import { Link } from '@/i18n/navigation';

export default function MarketingError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations('errorBoundary');

  useEffect(() => {
    void (async () => {
      try {
        const Sentry = await import('@sentry/browser');
        Sentry.captureException(error);
      } catch {}
    })();
  }, [error]);

  return (
    <div className="bg-paper flex min-h-screen flex-col">
      <SiteHeader
        searchSlot={<NavSearch />}
        mobileSearchSlot={<NavSearch variant="mobile" />}
      />

      <main id="main-content" className="flex flex-1 items-center">
        <div className="page-container py-20 text-center">
          <p className="text-ink-faint font-mono text-6xl tracking-widest">
            500
          </p>
          <h1 className="text-ink mt-3 font-serif text-4xl leading-tight font-medium text-balance">
            {t('heading')}
          </h1>
          <p className="text-ink-body mx-auto mt-4 max-w-120">{t('body')}</p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={reset}
              className="bg-accent text-ink-inverse hover:bg-accent/90 inline-flex items-center rounded-sm px-5 py-2.5 text-sm font-medium tracking-wide"
            >
              {t('retry')}
            </button>
            <Link
              href="/"
              className="text-accent inline-block font-medium underline underline-offset-4"
            >
              {t('backHome')}
            </Link>
          </div>

          {error.digest ? (
            <p className="text-ink-faint mt-6 font-mono text-xs">
              {t('digest', { digest: error.digest })}
            </p>
          ) : null}
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
