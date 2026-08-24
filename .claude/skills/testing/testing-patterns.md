---
name: testing-patterns
description: Use this skill when writing component tests with Vitest and Testing Library, or end-to-end tests with Playwright
type: skill
---

# Testing Patterns

## When to Use

- Adding a component with logic worth protecting
- Adding a user flow that must not break
- Writing a regression test for a fixed bug

## Core Principles

- **Vitest + Testing Library** for components, **Playwright** for flows.
- Query the way a user finds things: `getByRole`, `getByLabelText`,
  `getByText`. A `data-testid` is a last resort — it tests structure, not
  behaviour.
- **Test behaviour, not implementation.** Assert what the user sees, never that a
  hook was called or a state variable changed.
- Components using translations need the `NextIntlClientProvider` wrapper.
- E2E covers the paths that cost money if broken: sign-up, sign-in, the primary
  conversion flow. Not every page.

## Code Templates

### Component test

```typescript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { NextIntlClientProvider } from 'next-intl';
import messages from '../../../messages/sq.json';

const renderWithIntl = (ui: ReactElement) =>
  render(
    <NextIntlClientProvider locale="sq" messages={messages}>
      {ui}
    </NextIntlClientProvider>,
  );

describe('SignInPage', () => {
  it('shows a validation error for a malformed email', async () => {
    const user = userEvent.setup();
    renderWithIntl(<SignInPage />);

    await user.type(screen.getByLabelText(/email/i), 'not-an-email');
    await user.click(screen.getByRole('button', { name: /kyçu/i }));

    // Asserting on the visible message, not on the schema.
    expect(await screen.findByRole('alert')).toBeInTheDocument();
  });
});
```

### Playwright flow

```typescript
test('a new user can sign up and reach the dashboard', async ({ page }) => {
  // Unique per run: the database persists between runs.
  const email = `test-${Date.now()}@example.com`;

  await page.goto('/sign-up');
  await page.getByLabel(/emri i plotë/i).fill('Test User');
  await page.getByLabel(/email/i).fill(email);
  await page.getByLabel(/fjalëkalimi/i).fill('testpassword123');
  await page.getByRole('button', { name: /krijo llogari/i }).click();

  await expect(page).toHaveURL(/\/dashboard/);
});

test('an anonymous visitor is redirected away from the dashboard', async ({
  page,
}) => {
  await page.goto('/dashboard');
  await expect(page).toHaveURL(/\/sign-in/);
});
```

### Async queries

`findBy*` waits; `getBy*` does not. Use `findBy*` for anything that appears after
an interaction, and never wrap assertions in an arbitrary `waitForTimeout`.

## What to test

| Worth a test                        | Not worth a test              |
| ----------------------------------- | ----------------------------- |
| Validation branches                 | That a component renders      |
| Conditional rendering by auth state | Static markup                 |
| Error and empty states              | Tailwind classes              |
| The sign-up and sign-in flows (e2e) | Every marketing page          |
| A regression for any fixed bug      | Third-party library behaviour |

## Anti-Patterns

| Don't                           | Do                                   |
| ------------------------------- | ------------------------------------ |
| `getByTestId('submit')`         | `getByRole('button', { name: ... })` |
| Asserting a hook was called     | Assert what the user sees            |
| `waitForTimeout(1000)`          | `findBy*` or `expect.poll`           |
| A fixed email in an e2e sign-up | Unique per run                       |
| Snapshotting a whole page       | Assert the specific thing            |
| Mocking your own components     | Render the real thing                |
