import { useTranslations } from 'next-intl';

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
