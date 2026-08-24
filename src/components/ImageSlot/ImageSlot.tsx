import { cn } from '@/lib/utils/cn';

/**
 * Stands in for editorial imagery that does not exist yet.
 *
 * The design uses an `<image-slot>` custom element from the Claude Design
 * canvas; this is its production equivalent. It renders a neutral block at the
 * right dimensions so layout is correct, and is meant to be replaced by
 * `next/image` once the CMS supplies real files.
 *
 * Decorative by definition — a placeholder describes nothing, so it is hidden
 * from assistive technology rather than given invented alt text.
 */
interface ImageSlotProps {
  /** Tailwind aspect ratio, e.g. `aspect-[3/2]`. Omit when height is fixed. */
  className?: string;
  /** Shown only in development, to make the intended content obvious. */
  label?: string;
}

export function ImageSlot({ className, label }: ImageSlotProps) {
  return (
    <div
      aria-hidden
      className={cn(
        'border-line flex items-center justify-center overflow-hidden rounded-sm border bg-[#EFECE4]',
        className,
      )}
    >
      {label ? (
        <span className="text-ink-ghost px-3 text-center font-mono text-[11px] tracking-wide">
          {label}
        </span>
      ) : null}
    </div>
  );
}
