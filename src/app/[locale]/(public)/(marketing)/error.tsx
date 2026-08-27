'use client';

import { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { SiteFooter } from '@/components/SiteFooter';
import { SiteHeader } from '@/components/SiteHeader';
import { NavSearch } from '@/features/search';
import { Link } from '@/i18n/navigation';

/**
 * Segment error boundary for the marketing tree. Any error thrown while
 * rendering a page under `(marketing)` bubbles here rather than to
 * `global-error.tsx`, so the parent layout — fonts, providers, cookie consent
 * — stays mounted. A transient API blip becomes a retry, not a whiteout.
 *
 * Client component by contract: Next.js only renders `error.tsx` on the
 * client, and only client-side hooks can call `reset()`.
 */
export default function MarketingError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations('errorBoundary');

  // Best-effort forward to Sentry when it has been initialised by the consent
  // flow. Sentry is dynamically imported behind cookie consent, so it may or
  // may not be present here — guard against both.
  useEffect(() => {
    void (async () => {
      try {
        const Sentry = await import('@sentry/browser');
        Sentry.captureException(error);
      } catch {
        // Sentry not loaded (no consent, no DSN, or blocked by CSP) — the
        // point is telemetry, not resilience. Silent fallthrough.
      }
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

          {/* The digest is the only safe identifier to show — it is a hash
              Next.js generates for server errors, so a reader can quote it
              when reporting the incident, without exposing anything from
              `error.message`. */}
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
