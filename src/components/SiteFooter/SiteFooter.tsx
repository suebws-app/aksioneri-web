import { useTranslations } from 'next-intl';
import { BrandMark } from '@/components/BrandMark';
import { CookieRevoke } from '@/components/CookieConsent';
import { FOOTER_GROUPS } from '@/config/nav';
import { Link } from '@/i18n/navigation';
import { LanguageSelector } from './LanguageSelector';

export function SiteFooter() {
  const tNav = useTranslations('nav');
  const tFooter = useTranslations('footer');

  const labelFor = (namespace: 'nav' | 'footer', key: string): string =>
    namespace === 'nav' ? tNav(key) : tFooter(key);

  return (
    <footer className="bg-surface-inverse">
      <div className="page-container pt-11 pb-10">
        <div className="border-line-inverse flex flex-col gap-10 border-b pb-9 md:flex-row md:items-start md:justify-between md:gap-16">
          <BrandMark
            size="footer"
            ariaLabel={tNav('brand')}
            className="text-ink-inverse"
          />

          <nav
            aria-label={tFooter('label')}
            className="grid flex-1 gap-8 sm:grid-cols-2 md:max-w-2xl md:grid-cols-4"
          >
            {FOOTER_GROUPS.map((group) => (
              <div key={group.headingKey}>
                <h2 className="text-ink-inverse mb-3 text-[11px] font-semibold tracking-[0.12em] uppercase">
                  {tFooter(`groups.${group.headingKey}`)}
                </h2>
                <ul className="text-ink-inverse-muted flex flex-col gap-2 text-sm">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="hover:text-ink-inverse">
                        {labelFor(link.namespace, link.labelKey)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        {/* Required disclaimer: the site publishes market data and explainers,
            not advice. It stays visible on every page that shows figures. */}
        <p className="text-ink-inverse-faint mt-5 max-w-[76ch] text-[12.5px] leading-relaxed">
          {tFooter('disclaimer')}
        </p>

        <div className="border-line-inverse mt-6 flex flex-col gap-3 border-t pt-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <LanguageSelector />
            <CookieRevoke />
          </div>
          <p className="text-ink-inverse-faint text-[12.5px]">
            {tFooter('copyright', {
              year: new Date().getFullYear(),
              brand: tNav('brand'),
            })}
          </p>
        </div>
      </div>
    </footer>
  );
}
