import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils/cn';

/**
 * shadcn/ui Button — variants map to the site's design tokens. `asChild`
 * support (which needs `@radix-ui/react-slot`) is intentionally omitted;
 * add it if a caller needs `<Button asChild><Link /></Button>`.
 */
const buttonVariants = cva(
  'inline-flex items-center  cursor-pointer justify-center gap-2 whitespace-nowrap rounded-sm text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/30 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-ink text-paper hover:bg-ink/90',
        outline:
          'border-line-strong text-ink hover:bg-surface-tint border bg-transparent',
        ghost: 'text-ink hover:bg-surface-tint',
        subtle: 'bg-surface-tint text-ink hover:bg-surface-tint/80',
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 rounded-[3px] px-3 text-xs',
        lg: 'h-10 px-6',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  ),
);
Button.displayName = 'Button';

export { Button, buttonVariants };
