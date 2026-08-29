'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/navigation';
import { useConsent } from '@/lib/consent/consentContext';

/**
 * Cookie consent banner. Shows only when the reader has never chosen —
 * accepting or declining hides it forever (until they clear the store).
 *
 * Visual design:
 *   - Inverted surface so it lifts off the paper page underneath.
 *   - Accent-coloured top rule as the attention cue rather than a full
 *     coloured background, which would read as an ad.
 *   - `animate-consent-in` slides it up from below on first paint;
 *     `prefers-reduced-motion` disables the movement.
 *
 * `role="region"` + `aria-labelledby`/`aria-describedby` gives screen
 * readers a titled, findable landmark for what they are being asked.
 * Deliberately not `role="dialog"`: the banner is non-modal — focus is
 * not trapped and nothing is blocked — and a dialog role promises modal
 * semantics the banner does not deliver. The banner stays optional at
 * the bottom of the page; blocking navigation would be worse UX than
 * blocking analytics.
 */
export function CookieConsent() {
  const { status, accept, decline } = useConsent();
  const t = useTranslations('cookies');
  const [delayed, setDelayed] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => setDelayed(true), 2000);
    return () => clearTimeout(id);
  }, []);

  if (status !== 'unset' || !delayed) return null;

  return (
    <div
      role="region"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-body"
      className="border-ink-inverse-muted bg-surface-inverse text-ink-inverse animate-consent-in fixed inset-x-0 bottom-0 z-50 border-t shadow-2xl"
    >
      <div className="page-container flex flex-col gap-5 py-6 sm:py-7 md:flex-row md:items-center md:justify-between md:gap-8">
        <div className="max-w-[68ch]">
          <h2
            id="cookie-consent-title"
            className="text-ink-inverse mb-1.5 text-[16px] font-semibold"
          >
            {t('title')}
          </h2>
          <p
            id="cookie-consent-body"
            className="text-ink-inverse-muted text-[13.5px] leading-relaxed"
          >
            {t('body')}{' '}
            <Link
              href="/privacy"
              className="text-ink-inverse font-medium underline underline-offset-4 hover:no-underline"
            >
              {t('learnMore')}
            </Link>
          </p>
        </div>
        <div className="flex shrink-0 gap-3">
          <Button
            variant="outline"
            size="lg"
            onClick={decline}
            className="border-ink-inverse-muted text-ink-inverse hover:bg-ink-inverse/10 border-2 px-6 text-[14px] font-medium"
          >
            {t('decline')}
          </Button>
          <Button
            size="lg"
            onClick={accept}
            className="bg-paper text-ink hover:bg-paper/90 px-6 text-[14px] font-semibold"
          >
            {t('accept')}
          </Button>
        </div>
      </div>
    </div>
  );
}
