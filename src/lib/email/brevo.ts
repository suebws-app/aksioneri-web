import 'server-only';
import { serverEnv as env } from '@/lib/utils/env.server';

const BREVO_SMTP_EMAIL_URL = 'https://api.brevo.com/v3/smtp/email';

export interface TransactionalEmail {
  to: string;
  subject: string;
  html: string;
  text: string;
}

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
