import type { ComponentProps } from 'react';
import { cn } from '@/lib/utils/cn';

/**
 * The bordered surface the design uses for every grouped block — the "in
 * numbers" strip, the primer panel, a result card, a calculator tile.
 *
 * The class string `border-line bg-surface rounded-sm border` appears verbatim
 * in six places already; the calculators would have added a dozen more. This
 * is that string with a name, nothing else. No header/body/footer slots: the
 * existing call sites all lay their own contents out, and a prop for every
 * arrangement is how a Card becomes unusable.
 */
export interface CardProps extends ComponentProps<'div'> {
  /** Removes the padding, for a card whose child manages its own edges. */
  flush?: boolean;
}

export function Card({ flush = false, className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'border-line bg-surface rounded-sm border',
        flush ? '' : 'p-5 sm:p-6.5',
        className,
      )}
      {...props}
    />
  );
}
