'use client';

import { useId } from 'react';
import { useLocale } from 'next-intl';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { locales, type Locale } from '@/i18n/config';
import { usePathname, useRouter } from '@/i18n/navigation';

/**
 * Human-facing name + flag for every locale the design might ever ship.
 * The list of *available* locales lives in `@/i18n/config`; anything
 * declared here that isn't in `locales` renders as a disabled option
 * with a "së shpejti" hint.
 *
 * Flag choice: the Kosovo flag for `sq` (audience-matched), the UK flag
 * for `en` (language marker rather than country).
 */
const LOCALE_META: Record<string, { label: string; flag: string }> = {
  sq: { label: 'Shqip', flag: '🇦🇱' },
  en: { label: 'English', flag: '🇬🇧' },
};

const PLANNED_LOCALES = ['sq', 'en'] as const;

export function LanguageSelector() {
  const activeLocale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const triggerId = useId();
  const available = new Set(locales as readonly string[]);

  return (
    <div className="flex items-center gap-2.5">
      <label
        htmlFor={triggerId}
        className="text-ink-inverse-faint text-[11px] font-semibold tracking-[0.12em] uppercase"
      >
        Gjuha
      </label>
      <Select
        value={activeLocale}
        onValueChange={(next) => {
          if (!available.has(next) || next === activeLocale) return;
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
          {PLANNED_LOCALES.map((locale) => {
            const meta = LOCALE_META[locale];
            if (!meta) return null;
            const isAvailable = available.has(locale);
            return (
              <SelectItem
                key={locale}
                value={locale}
                disabled={!isAvailable}
                className="text-[13px]"
              >
                <span className="mr-1.5">{meta.flag}</span>
                {meta.label}
                {isAvailable ? (
                  ''
                ) : (
                  <span className="text-ink-faint ml-1 text-[11px]">
                    (së shpejti)
                  </span>
                )}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
}
