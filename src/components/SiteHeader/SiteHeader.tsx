import type { ReactNode } from 'react';
import { useTranslations } from 'next-intl';
import { BrandMark } from '@/components/BrandMark';
import { HREF, PRIMARY_SECTIONS, type SiteSection } from '@/config/nav';
import { Link } from '@/i18n/navigation';
import { MobileNav } from './MobileNav';

export type { SiteSection };

interface SiteHeaderProps {
  active?: SiteSection;
  searchSlot?: ReactNode;
  mobileSearchSlot?: ReactNode;
}

export function SiteHeader({
  active,
  searchSlot,
  mobileSearchSlot,
}: SiteHeaderProps) {
  const t = useTranslations('nav');

  return (
    <header className="border-line bg-paper sticky top-0 z-50 border-b md:static">
      <div className="page-container flex items-center justify-between gap-6 py-5">
        <Link href="/" aria-label={t('brand')} className="text-ink">
          <BrandMark size="header" ariaLabel={t('brand')} />
        </Link>

        <nav aria-label={t('primaryLabel')} className="hidden md:block">
          <ul className="text-ink-muted flex items-center gap-5 text-[15px] sm:gap-7.5">
            {PRIMARY_SECTIONS.map((section) => {
              const isActive = section === active;

              if (isActive) {
                return (
                  <li key={section}>
                    <span
                      aria-current="page"
                      className="border-accent text-ink border-b-2 pb-0.75 font-medium"
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

            {searchSlot ? (
              <li className="hidden lg:block">{searchSlot}</li>
            ) : null}
            {mobileSearchSlot ? (
              <li className="lg:hidden">{mobileSearchSlot}</li>
            ) : null}
          </ul>
        </nav>

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
