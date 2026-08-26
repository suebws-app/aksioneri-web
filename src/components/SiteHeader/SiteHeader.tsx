import type { ReactNode } from 'react';
import { useTranslations } from 'next-intl';
import { BrandMark } from '@/components/BrandMark';
import { HREF, PRIMARY_SECTIONS, type SiteSection } from '@/config/nav';
import { Link } from '@/i18n/navigation';
import { MobileNav } from './MobileNav';

export type { SiteSection };

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
    <header className="border-line bg-paper sticky top-0 z-50 border-b md:static">
      <div className="page-container flex items-center justify-between gap-6 py-5">
        <Link href="/" aria-label={t('brand')} className="text-ink">
          <BrandMark size="header" ariaLabel={t('brand')} />
        </Link>

        {/* Five links plus a search box need room neither a phone nor a
            small tablet has: at 640px the row wants ~560px and the column
            gives ~552px. Below `md` they move into `MobileNav`. */}
        <nav aria-label={t('primaryLabel')} className="hidden md:block">
          <ul className="text-ink-muted flex items-center gap-5 text-[15px] sm:gap-7.5">
            {PRIMARY_SECTIONS.map((section) => {
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
        <div className="flex items-center gap-0.5 md:hidden">
          {mobileSearchSlot}
          <MobileNav
            items={PRIMARY_SECTIONS.map((section) => ({
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
