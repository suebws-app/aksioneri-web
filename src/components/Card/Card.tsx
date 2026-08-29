import type { ComponentProps } from 'react';
import { cn } from '@/lib/utils/cn';

export interface CardProps extends ComponentProps<'div'> {
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
