import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { NextIntlClientProvider } from 'next-intl';
import type { ReactElement } from 'react';
import { describe, expect, it, vi } from 'vitest';
import messages from '../../../../messages/sq.json';
import { SignInPage } from '../SignInPage';

vi.mock('@/i18n/navigation', () => ({
  Link: ({ children }: { children: React.ReactNode }) => <a>{children}</a>,
  useRouter: () => ({ push: vi.fn() }),
}));

vi.mock('next/navigation', () => ({
  useSearchParams: () => new URLSearchParams(),
}));

const signInEmail = vi.fn();
vi.mock('@/lib/auth/client', () => ({
  signIn: { email: (...args: unknown[]) => signInEmail(...args) },
}));

const renderWithIntl = (ui: ReactElement) =>
  render(
    <NextIntlClientProvider locale="sq" messages={messages}>
      {ui}
    </NextIntlClientProvider>,
  );

describe('SignInPage', () => {
  it('rejects a malformed email before calling the auth client', async () => {
    const user = userEvent.setup();
    renderWithIntl(<SignInPage />);

    await user.type(screen.getByLabelText(/email/i), 'not-an-email');
    await user.type(screen.getByLabelText(/fjalëkalimi/i), 'somepassword');
    await user.click(screen.getByRole('button', { name: /kyçu/i }));

    expect(await screen.findByRole('alert')).toBeInTheDocument();
    expect(signInEmail).not.toHaveBeenCalled();
  });

  it('shows one generic message when credentials are rejected', async () => {
    // Never reveal which of the two was wrong — that confirms whether an
    // address is registered.
    signInEmail.mockResolvedValueOnce({ error: { status: 401 } });

    const user = userEvent.setup();
    renderWithIntl(<SignInPage />);

    await user.type(screen.getByLabelText(/email/i), 'user@example.com');
    await user.type(screen.getByLabelText(/fjalëkalimi/i), 'wrongpassword');
    await user.click(screen.getByRole('button', { name: /kyçu/i }));

    expect(await screen.findByRole('alert')).toHaveTextContent(
      messages.auth.errors.invalidCredentials,
    );
  });
});
