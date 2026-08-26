import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

const SECTIONS = ['markets', 'news', 'learn', 'calendar'] as const;

/** The standing pages, in the order the design lists them. */
const LEGAL = ['about', 'contact', 'privacy', 'terms'] as const;

const HREF: Record<(typeof SECTIONS)[number], string> = {
  markets: '/',
  news: '/news',
  learn: '/learn',
  calendar: '/calendar',
};

export function SiteFooter() {
  const t = useTranslations('nav');
  const tFooter = useTranslations('footer');

  return (
    <footer className="bg-surface-inverse">
      <div className="page-container pt-8.5 pb-10">
        <div className="border-line-inverse flex flex-col gap-5 border-b pb-6 sm:flex-row sm:items-baseline sm:justify-between">
          <span
            aria-label={t('brand')}
            className="text-ink-inverse flex items-end font-sans text-[21px] leading-none font-semibold tracking-[-0.035em]"
          >
            <span>aks</span>
            <svg
              width="0.275em"
              height="1em"
              viewBox="0 0 27.5 100"
              aria-hidden
              className="mx-[0.02em] mb-[0.13em]"
            >
              <path d="M13.75 25 23.75 43 3.75 43Z" fill="#3FA97A" />
              <rect
                x="8.75"
                y="46.5"
                width="10"
                height="53.5"
                fill="currentColor"
              />
            </svg>
            <span>oneri</span>
          </span>

          <nav aria-label={tFooter('label')}>
            <ul className="text-ink-inverse-muted flex flex-wrap gap-x-7 gap-y-2 text-sm">
              {SECTIONS.map((key) => (
                <li key={key}>
                  <Link href={HREF[key]} className="hover:text-ink-inverse">
                    {t(key)}
                  </Link>
                </li>
              ))}
              {LEGAL.map((key) => (
                <li key={key}>
                  <Link href={`/${key}`} className="hover:text-ink-inverse">
                    {tFooter(key)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Required disclaimer: the site publishes market data and explainers,
            not advice. It stays visible on every page that shows figures. */}
        <p className="text-ink-inverse-faint mt-4.5 max-w-[76ch] text-[12.5px] leading-relaxed">
          {tFooter('disclaimer')}
        </p>
      </div>
    </footer>
  );
}
