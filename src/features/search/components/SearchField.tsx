import { useLocale, useTranslations } from 'next-intl';
import type { Locale } from '@/i18n/config';
import { getPathname } from '@/i18n/navigation';
import { QUERY_PARAM } from '../searchParams';

/**
 * The search box.
 *
 * A plain GET form rather than a client component: submitting navigates to
 * `/search?q=…`, which is a real URL the reader can bookmark, share and go
 * back to. It also works with JavaScript off and needs no hydration — the
 * whole results page is server-rendered.
 *
 * The action goes through `getPathname` rather than a literal `/search`, so a
 * second locale would prefix it correctly instead of silently sending readers
 * to the Albanian page.
 */
export function SearchField({ query }: { query: string }) {
  const t = useTranslations('search');
  const locale = useLocale() as Locale;

  return (
    <form
      action={getPathname({ href: '/search', locale })}
      role="search"
      className="flex max-w-md gap-2.5"
    >
      <label className="flex-1">
        <span className="sr-only">{t('label')}</span>
        <input
          type="search"
          name={QUERY_PARAM}
          defaultValue={query}
          placeholder={t('placeholder')}
          autoComplete="off"
          className="border-line-strong bg-surface text-ink placeholder:text-ink-ghost focus:border-accent w-full rounded-sm border px-4 py-2.5 text-[15px] outline-none"
        />
      </label>
      <button
        type="submit"
        className="border-accent bg-accent rounded-sm border px-5 py-2.5 text-[15px] font-medium text-white"
      >
        {t('submit')}
      </button>
    </form>
  );
}
