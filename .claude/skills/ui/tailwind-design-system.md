---
name: tailwind-design-system
description: Use this skill when styling anything, adding a design token, or building a component with style variants in Tailwind CSS v4
type: skill
---

# Tailwind Design System (v4)

## When to Use

- Styling any component
- Adding a colour, spacing value, or font
- A component needs size or intent variants

## Core Principles

- **Tailwind v4 has no `tailwind.config.ts`.** Tokens are declared with `@theme`
  in `src/app/globals.css`. Creating a config file does nothing.
- Every colour, radius and font comes from a token. A raw hex in a class
  (`bg-[#0a0a0a]`) is invisible to a future theme change.
- `cn()` from `@/lib/utils/cn` merges classes and resolves Tailwind conflicts, so
  a caller's `className` can override a component default.
- `cva` for variants. Manual string concatenation produces conflicting classes
  whose winner depends on stylesheet order.
- Dark mode through CSS variables that swap under `prefers-color-scheme`, not by
  duplicating every class with a `dark:` prefix.

## Code Templates

### Tokens

```css
/* src/app/globals.css */
@import 'tailwindcss';

:root {
  --background: #ffffff;
  --foreground: #171717;
  --accent: #b45309;
}

@media (prefers-color-scheme: dark) {
  :root {
    --background: #0a0a0a;
    --foreground: #ededed;
    --accent: #f59e0b;
  }
}

/* `@theme inline` is what turns a variable into a utility: this is what makes
   `bg-background` and `text-accent` exist. */
@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-accent: var(--accent);
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
}
```

Because both themes resolve through the same variable, `bg-background` is
correct in light and dark without a single `dark:` class.

### A component with variants

```typescript
const buttonVariants = cva(
  // Base: everything every variant shares, including focus and disabled states.
  'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-60',
  {
    variants: {
      intent: {
        primary: 'bg-foreground text-background hover:bg-foreground/90',
        outline: 'border border-foreground/20 hover:bg-foreground/5',
        ghost: 'hover:bg-foreground/5',
      },
      size: {
        sm: 'h-8 px-3 text-sm',
        md: 'h-10 px-4',
        lg: 'h-12 px-6 text-lg',
      },
    },
    defaultVariants: { intent: 'primary', size: 'md' },
  },
);

export interface ButtonProps
  extends ComponentProps<'button'>,
    VariantProps<typeof buttonVariants> {}

export function Button({ intent, size, className, ...props }: ButtonProps) {
  // cn() last, so a caller's className wins over the variant default.
  return <button className={cn(buttonVariants({ intent, size }), className)} {...props} />;
}
```

### Accessibility that costs nothing

- Keep a visible focus ring — `focus-visible:outline-2`, never `outline-none`
  without a replacement.
- Body text needs 4.5:1 contrast; `text-foreground/50` on a light background
  usually fails.
- Interactive targets are at least 44×44px on touch.
- `text-balance` on headings, `text-pretty` on paragraphs — better line breaks
  for free.

## Anti-Patterns

| Don't                                                 | Do                            |
| ----------------------------------------------------- | ----------------------------- |
| Creating `tailwind.config.ts`                         | `@theme` in `globals.css`     |
| `bg-[#0a0a0a]`                                        | `bg-background`               |
| ``className={`btn ${isActive ? 'btn-active' : ''}`}`` | `cva` variants                |
| `className={'p-2 ' + className}`                      | `cn('p-2', className)`        |
| `dark:` on every element                              | Swap the CSS variables        |
| `outline-none` on a focusable element                 | Style `focus-visible` instead |
| Arbitrary values everywhere                           | Add a token                   |
