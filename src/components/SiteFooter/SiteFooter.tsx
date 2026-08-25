import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

const SECTIONS = ['markets', 'news', 'learn', 'calendar'] as const;

/**
 * Legal and company pages do not exist yet, so they render as plain text. The
 * design uses the same convention for its own unbuilt links, and a footer full
 * of 404s is worse than an obviously inactive label.
 */
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
          <span className="text-ink-inverse font-serif text-[21px]">
            {t('brand')}
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
                  <span>{tFooter(key)}</span>
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
