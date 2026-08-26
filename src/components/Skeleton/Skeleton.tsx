import type { ComponentProps } from 'react';
import { cn } from '@/lib/utils/cn';

/**
 * The neutral placeholder block every `loading.tsx` in the marketing tree
 * composes. Uses `--surface-tint` so a shimmer sits at the same warm-paper
 * altitude as a real row and never reads as a generic gray box.
 */
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
