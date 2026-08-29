'use client';

import { useTranslations } from 'next-intl';
import { useConsent } from '@/lib/consent/consentContext';

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
