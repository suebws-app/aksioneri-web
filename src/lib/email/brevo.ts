import 'server-only';
import { serverEnv as env } from '@/lib/utils/env.server';

/**
 * Minimal Brevo v3 transactional email client.
 *
 * NOTE on the "fetch is called in exactly one place" rule: that rule scopes to
 * the app's own data layer — `lib/api/client.ts` talks to aksioneri-api and
 * carries session cookies and CSRF headers. Brevo is an external provider with
 * its own auth (an api-key header, no cookies), so routing it through
 * `apiFetch` would be wrong. This file is the deliberate second fetch site,
 * for outbound provider calls only.
 */

const BREVO_SMTP_EMAIL_URL = 'https://api.brevo.com/v3/smtp/email';

export interface TransactionalEmail {
  to: string;
  subject: string;
  html: string;
  text: string;
}

/**
 * Sends one transactional email through Brevo.
 *
 * Dev-safe: when `BREVO_API_KEY` or `EMAIL_FROM` is unset the send is skipped
 * with a structured warning instead of failing, so local sign-up and password
 * reset flows work without a Brevo account. When Brevo is configured but the
 * request fails, this throws — better-auth surfaces the failure rather than
 * pretending the email went out.
 */
export async function sendTransactionalEmail({
  to,
  subject,
  html,
  text,
}: TransactionalEmail): Promise<void> {
  if (!env.BREVO_API_KEY || !env.EMAIL_FROM) {
    console.warn(
      JSON.stringify({
        level: 'warn',
        module: 'lib/email/brevo',
        event: 'email_skipped_unconfigured',
        missing: [
          ...(env.BREVO_API_KEY ? [] : ['BREVO_API_KEY']),
          ...(env.EMAIL_FROM ? [] : ['EMAIL_FROM']),
        ],
        subject,
      }),
    );
    return;
  }

  const response = await fetch(BREVO_SMTP_EMAIL_URL, {
    method: 'POST',
    headers: {
      'api-key': env.BREVO_API_KEY,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      sender: { email: env.EMAIL_FROM, name: env.EMAIL_FROM_NAME },
      to: [{ email: to }],
      subject,
      htmlContent: html,
      textContent: text,
    }),
  });

  if (!response.ok) {
    const body = await response.text().catch(() => '');
    throw new Error(
      `Brevo send failed: ${response.status} ${body.slice(0, 300)}`,
    );
  }
}
