import type { ComponentProps } from 'react';
import { cn } from '@/lib/utils/cn';

export type SkeletonProps = ComponentProps<'div'>;

export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      aria-hidden
      className={cn('bg-surface-tint animate-pulse rounded-sm', className)}
      {...props}
    />
  );
}
