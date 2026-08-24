import { expect, test } from '@playwright/test';

test.describe('authentication', () => {
  test('redirects an anonymous visitor away from a private route', async ({
    page,
  }) => {
    await page.goto('/dashboard');

    await expect(page).toHaveURL(/\/sign-in/);
    // The destination is preserved so sign-in can return the user to it.
    expect(page.url()).toContain('callbackUrl');
  });

  test('a new user can sign up and reach the dashboard', async ({ page }) => {
    // Unique per run: the development database persists between runs.
    const email = `e2e-${Date.now()}@aksioneri.test`;

    await page.goto('/sign-up');
    await page.getByLabel(/emri i plotë/i).fill('E2E User');
    await page.getByLabel(/email/i).fill(email);
    await page.getByLabel(/fjalëkalimi/i).fill('testpassword123');
    await page.getByRole('button', { name: /krijo llogari/i }).click();

    await expect(page).toHaveURL(/\/dashboard/);
    await expect(page.getByText(email)).toBeVisible();
  });
});
