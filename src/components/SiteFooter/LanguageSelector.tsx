'use client';

import { useId } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { locales, type Locale } from '@/i18n/config';
import { usePathname, useRouter } from '@/i18n/navigation';

const LOCALE_META: Record<Locale, { label: string; flag: string }> = {
  sq: { label: 'Shqip', flag: '🇦🇱' },
  en: { label: 'English', flag: '🇬🇧' },
};

export function LanguageSelector() {
  const t = useTranslations('footer');
  const activeLocale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const triggerId = useId();

  return (
    <div className="flex items-center gap-2.5">
      <label
        htmlFor={triggerId}
        className="text-ink-inverse-faint text-[11px] font-semibold tracking-[0.12em] uppercase"
      >
        {t('language')}
      </label>
      <Select
        value={activeLocale}
        onValueChange={(next) => {
          if (next === activeLocale) return;
          router.replace(pathname, { locale: next as Locale });
        }}
      >
        <SelectTrigger
          id={triggerId}
          className="text-ink-inverse border-line-inverse hover:border-ink-inverse focus:border-ink-inverse focus:ring-ink-inverse/20 h-8 w-40 bg-transparent text-[13px]"
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {locales.map((locale) => {
            const meta = LOCALE_META[locale];
            return (
              <SelectItem key={locale} value={locale} className="text-[13px]">
                <span className="mr-1.5">{meta.flag}</span>
                {meta.label}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
}
