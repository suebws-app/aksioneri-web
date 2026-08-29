import { useFormatter, useTranslations } from 'next-intl';
import { SiteFooter } from '@/components/SiteFooter';
import { SiteHeader } from '@/components/SiteHeader';
import { NavSearch } from '@/features/search';
import type { StaticPageContent } from './siteTypes';

export interface StaticPageProps {
  page: StaticPageContent;
}

export function StaticPage({ page }: StaticPageProps) {
  const t = useTranslations('pages');
  const format = useFormatter();

  return (
    <div className="bg-paper flex min-h-screen flex-col">
      <SiteHeader
        searchSlot={<NavSearch />}
        mobileSearchSlot={<NavSearch variant="mobile" />}
      />

      <main id="main-content" className="flex-1">
        <section className="border-line bg-surface-muted border-b">
          <div className="page-container py-11">
            <h1 className="text-ink mb-3 font-serif text-[44px] leading-[1.1] font-medium tracking-[-0.022em] text-pretty">
              {page.title}
            </h1>
            <p className="text-ink-body max-w-[620px] text-lg leading-relaxed">
              {page.intro}
            </p>
            {page.updatedAt ? (
              <p className="text-ink-faint mt-5 text-[13px]">
                {t('updated', {
                  date: format.dateTime(new Date(page.updatedAt), {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  }),
                })}
              </p>
            ) : null}
          </div>
        </section>

        <div className="page-container py-11">
          <article className="max-w-[680px]">
            {page.email ? (
              <a
                href={`mailto:${page.email}`}
                className="border-line bg-surface hover:border-ink-faint mb-9 block rounded-sm border px-6 py-5 transition-colors"
              >
                <span className="text-ink-faint block text-[11px] font-semibold tracking-[0.12em] uppercase">
                  {t('emailLabel')}
                </span>
                <span className="text-accent mt-1.5 block font-serif text-[22px]">
                  {page.email}
                </span>
              </a>
            ) : null}

            {page.sections.map((section) => (
              <section key={section.heading} className="mb-9 last:mb-0">
                <h2 className="text-ink mb-3.5 font-serif text-[25px] font-medium">
                  {section.heading}
                </h2>
                {section.paragraphs.map((paragraph, index) => (
                  <p
                    key={index}
                    className="text-ink-secondary mb-4 text-[17px] leading-[1.7]"
                  >
                    {paragraph}
                  </p>
                ))}
                {section.list ? (
                  <ul className="text-ink-secondary mb-4 list-disc space-y-2 pl-6 text-[17px] leading-[1.7] marker:text-[color:var(--ink-faint)]">
                    {section.list.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                ) : null}
                {section.paragraphsAfterList?.map((paragraph, index) => (
                  <p
                    key={`after-${index}`}
                    className="text-ink-secondary mb-4 text-[17px] leading-[1.7] last:mb-0"
                  >
                    {paragraph}
                  </p>
                ))}
              </section>
            ))}
          </article>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
