interface BrandMarkProps {
  size?: 'header' | 'footer';
  ariaLabel: string;
  className?: string;
}

const SIZE_CLASSES: Record<'header' | 'footer', string> = {
  header: 'text-[40px]',
  footer: 'text-[32px]',
};

export function BrandMark({
  size = 'header',
  ariaLabel,
  className,
}: BrandMarkProps) {
  return (
    <span
      aria-label={ariaLabel}
      className={[
        'flex items-end font-sans leading-none font-semibold tracking-[-0.035em]',
        SIZE_CLASSES[size],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <span>aks</span>
      <svg
        width="0.275em"
        height="1em"
        viewBox="0 0 27.5 100"
        aria-hidden
        className="mx-[0.02em] mb-[0.13em]"
      >
        <path d="M13.75 25 23.75 43 3.75 43Z" fill="var(--positive)" />
        <rect x="8.75" y="46.5" width="10" height="53.5" fill="currentColor" />
      </svg>
      <span>oneri</span>
    </span>
  );
}
