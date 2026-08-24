import { useTranslations } from 'next-intl';
import { SiteFooter } from '@/components/SiteFooter';
import { SiteHeader } from '@/components/SiteHeader';
import { Link } from '@/i18n/navigation';
import type { GlossaryTerm } from './learnTypes';
import { GlossarySearch } from './components/GlossarySearch';

/**
 * The full glossary.
 *
 * Every term carries `id={slug}`, which is what makes
 * `/learn/glossary#basis-point` land on the right definition — and what the
 * article auto-linker points at. Those fragments are a public contract once
 * published, so slugs must not be renamed casually.
 */
export interface GlossaryPageProps {
  terms: GlossaryTerm[];
}

export function GlossaryPage({ terms }: GlossaryPageProps) {
  const t = useTranslations('learn');

  return (
    <div className="bg-paper flex min-h-screen flex-col">
      <SiteHeader active="learn" />

      <main className="flex-1">
        <section className="border-line bg-surface-muted border-b">
          <div className="mx-auto max-w-[1280px] px-6 py-11 sm:px-11">
            <nav aria-label={t('heading')} className="mb-4">
              <Link
                href="/learn"
                className="text-ink-faint hover:text-accent text-[13px]"
              >
                {t('backTo')} {t('heading')}
              </Link>
            </nav>
            <h1 className="text-ink mb-3 font-serif text-[44px] leading-[1.1] font-medium tracking-[-0.022em]">
              {t('glossary.heading')}
            </h1>
            <p className="text-ink-body max-w-[620px] text-lg leading-relaxed">
              {t('glossary.body', { count: terms.length })}
            </p>
          </div>
        </section>

        <GlossarySearch terms={terms} />
      </main>

      <SiteFooter />
    </div>
  );
}
