import type { ComponentProps } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils/cn';

/**
 * The site's button.
 *
 * Until now every button was styled inline — the search submit, the calendar
 * day tabs, the quiz options — and they had drifted into three different
 * paddings and two different corner radii. The calculators add enough of them
 * that the drift would become the house style, so the variants live here.
 *
 * `class-variance-authority` has been a dependency since the project was set
 * up and the design-system skill prescribes it; this is the first component to
 * use it. Note the tokens: the skill's own example reaches for `bg-foreground`,
 * which no longer exists in `globals.css`. Use the real ones.
 */
const button = cva(
  // Everything every variant shares, focus and disabled states included. The
  // outline is never removed — it is the only thing a keyboard user has.
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
        // 44px tall: the touch-target floor the design-system skill sets, and
        // the reason `sm` is not smaller than this.
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
      // Defaulting to `button`: an unset `type` inside a form is `submit`,
      // which has silently submitted forms in every codebase that forgot it.
      type={type}
      className={cn(button({ intent, size, block }), className)}
      {...props}
    />
  );
}
