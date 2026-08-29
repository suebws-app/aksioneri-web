import type { ComponentProps } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils/cn';

const button = cva(
  'inline-flex items-center justify-center rounded-sm font-sans font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:pointer-events-none disabled:opacity-55',
  {
    variants: {
      intent: {
        accent: 'border-accent bg-accent border text-white hover:bg-[#0f2c4a]',
        outline:
          'border-line-strong bg-surface text-ink hover:border-accent hover:text-accent border',
        ghost: 'text-ink-muted hover:text-accent bg-transparent',
      },
      size: {
        sm: 'min-h-11 px-3.5 py-2 text-[14px]',
        md: 'min-h-11 px-5 py-2.5 text-[15px]',
      },
      block: { true: 'w-full', false: '' },
    },
    defaultVariants: { intent: 'accent', size: 'md', block: false },
  },
);

export interface ButtonProps
  extends ComponentProps<'button'>, VariantProps<typeof button> {}

export function Button({
  intent,
  size,
  block,
  className,
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(button({ intent, size, block }), className)}
      {...props}
    />
  );
}
