import type { ReactNode } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { MobileNav } from './MobileNav';

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
  /**
   * The same search, in the shape the phone header needs: an icon that opens a
   * full-width sheet. Separate node rather than one slot reused, because the
   * two render differently — see `NavSearchVariant`.
   */
  mobileSearchSlot?: ReactNode;
}

export function SiteHeader({
  active,
  searchSlot,
  mobileSearchSlot,
}: SiteHeaderProps) {
  const t = useTranslations('nav');

  return (
    // Sticky and above the drawer below `sm`: the phone nav slides in
    // underneath, and the wordmark and close button have to stay reachable.
    // Static from `sm` up, where the design has no sticky header.
    <header className="border-line bg-paper sticky top-0 z-50 border-b sm:static">
      <div className="page-container flex items-center justify-between gap-6 py-5">
        <Link
          href="/"
          aria-label={t('brand')}
          className="text-ink flex items-end font-sans text-[25px] leading-none font-semibold tracking-[-0.035em]"
        >
          <span>aks</span>
          {/* The dot on the "i" becomes the same up-tick marker the site prints
              beside every rising number — the entire brand mark in one glyph. */}
          <svg
            width="0.275em"
            height="1em"
            viewBox="0 0 27.5 100"
            aria-hidden
            className="mx-[0.02em] mb-[0.13em]"
          >
            <path d="M13.75 25 23.75 43 3.75 43Z" fill="var(--positive)" />
            <rect
              x="8.75"
              y="46.5"
              width="10"
              height="53.5"
              fill="currentColor"
            />
          </svg>
          <span>oneri</span>
        </Link>

        {/* Four links plus a search box need room the phone does not have;
            below `sm` they move into `MobileNav`. */}
        <nav aria-label={t('primaryLabel')} className="hidden sm:block">
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

        {/* Search sits beside the menu button rather than inside it: it is
            the control a reader reaches for directly. */}
        <div className="flex items-center gap-0.5 sm:hidden">
          {mobileSearchSlot}
          <MobileNav
            items={SECTIONS.map((section) => ({
              href: HREF[section],
              label: t(section),
              current: section === active,
            }))}
          />
        </div>
      </div>
    </header>
  );
}
