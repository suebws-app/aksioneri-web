'use client';

import { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export default function AssetError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations('markets.assetError');

  useEffect(() => {
    void (async () => {
      try {
        const Sentry = await import('@sentry/browser');
        Sentry.captureException(error);
      } catch {}
    })();
  }, [error]);

  return (
    <div className="page-container py-16 text-center">
      <p className="text-ink-faint font-mono text-6xl tracking-widest">500</p>
      <h1 className="text-ink mt-3 font-serif text-3xl leading-tight font-medium text-balance">
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
          href="/markets"
          className="text-accent inline-block font-medium underline underline-offset-4"
        >
          {t('backToMarkets')}
        </Link>
      </div>

      {error.digest ? (
        <p className="text-ink-faint mt-6 font-mono text-xs">
          {t('digest', { digest: error.digest })}
        </p>
      ) : null}
    </div>
  );
}
