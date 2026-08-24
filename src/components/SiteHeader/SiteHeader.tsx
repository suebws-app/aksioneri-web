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
}

export function SiteHeader({ active }: SiteHeaderProps) {
  const t = useTranslations('nav');

  return (
    <header className="border-line border-b">
      <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-6 px-6 py-5 sm:px-11">
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

            <li>
              {/* Search has no route yet; shown as the design does, inactive. */}
              <span className="text-ink-subtle flex items-center gap-[7px]">
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  aria-hidden
                >
                  <circle cx="7" cy="7" r="4.6" />
                  <path d="M10.4 10.4L14 14" />
                </svg>
                {t('search')}
              </span>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
