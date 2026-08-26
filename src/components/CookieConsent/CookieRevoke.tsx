'use client';

import { useTranslations } from 'next-intl';
import { useConsent } from '@/lib/consent/consentContext';

/**
 * "Menaxho cookies" link that resets consent so the banner reappears.
 *
 * Legally required by Kosovo Law 06/L-082, Article 6 — withdrawing
 * consent must be as easy as giving it. Wiring a footer link to
 * `useConsent().reset()` matches the two-click accept flow.
 *
 * Renders nothing when the reader has never chosen — the banner is
 * already visible in that state, so a second entry point is noise.
 */
export function CookieRevoke() {
  const { status, reset } = useConsent();
  const t = useTranslations('cookies');

  if (status === 'unset') return null;

  return (
    <button
      type="button"
      onClick={reset}
      className="text-ink-inverse-muted hover:text-ink-inverse cursor-pointer text-[12.5px] underline underline-offset-2"
    >
      {t('manage')}
    </button>
  );
}
