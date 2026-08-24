import { useTranslations } from 'next-intl';

/**
 * The blue-ruled explainer note that turns a headline into something a
 * non-specialist can act on. Optional per story, and gated on the homepage by
 * the design's `showWhyItMatters` prop.
 */
export function WhyItMatters({ children }: { children: string }) {
  const t = useTranslations('news');

  return (
    <aside className="border-accent bg-surface-tint rounded-r-sm border-l-2 py-3.5 pr-4.5 pl-5">
      <h3 className="text-accent mb-2 text-[11px] font-semibold tracking-[0.12em] uppercase">
        {t('whyItMatters')}
      </h3>
      <p className="text-ink-secondary max-w-[56ch] text-base leading-relaxed">
        {children}
      </p>
    </aside>
  );
}
