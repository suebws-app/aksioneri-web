import { cn } from '@/lib/utils/cn';

interface ImageSlotProps {
  className?: string;
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
