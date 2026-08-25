import type { ReactNode } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

const SECTIONS = ['markets', 'news', 'learn', 'calendar'] as const;

export type SiteSection = (typeof SECTIONS)[number];

/** Markets is the homepage; the rest sit at their own path. */
const HREF: Record<SiteSection, string> = {
  markets: '/',
  news: '/news',
  learn: '/learn',
  calendar: '/calendar',
};

interface SiteHeaderProps {
  /** The section to mark as current. */
  active?: SiteSection;
  /**
   * The search control, rendered at the end of the nav.
   *
   * A slot rather than an import: search reads lesson, glossary, wire and
   * calendar data, and a shared component that reached into features would
   * invert the dependency (enforced by `boundaries/dependencies`). Pages pass
   * `<NavSearch />` from `@/features/search`.
   */
  searchSlot?: ReactNode;
}

export function SiteHeader({ active, searchSlot }: SiteHeaderProps) {
  const t = useTranslations('nav');

  return (
    <header className="border-line border-b">
      <div className="page-container flex items-center justify-between gap-6 py-5">
        <Link
          href="/"
          className="text-ink font-serif text-[25px] font-semibold tracking-[-0.015em]"
        >
          {t('brand')}
        </Link>

        <nav aria-label={t('primaryLabel')}>
          <ul className="text-ink-muted flex items-center gap-5 text-[15px] sm:gap-7.5">
            {SECTIONS.map((section) => {
              const isActive = section === active;

              if (isActive) {
                return (
                  <li key={section}>
                    <span
                      aria-current="page"
                      className="border-accent text-ink border-b-2 pb-[3px] font-medium"
                    >
                      {t(section)}
                    </span>
                  </li>
                );
              }

              return (
                <li key={section}>
                  <Link href={HREF[section]} className="hover:text-accent">
                    {t(section)}
                  </Link>
                </li>
              );
            })}

            {searchSlot ? <li>{searchSlot}</li> : null}
          </ul>
        </nav>
      </div>
    </header>
  );
}
