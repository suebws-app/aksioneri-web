import 'server-only';
import { sendTransactionalEmail } from './brevo';

/**
 * Transactional auth emails, wired into better-auth in
 * `src/lib/auth/better-auth.ts` (`sendResetPassword` /
 * `sendVerificationEmail`).
 *
 * Copy lives here, not in the i18n catalogues: emails render server-side at
 * send time, outside the next-intl provider tree, and ship in the product's
 * primary language (Kosovo Albanian) regardless of the viewer's UI locale.
 */

interface AuthEmailInput {
  to: string;
  url: string;
}

const escapeHtml = (value: string): string =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

/** One heading, one line of context, one button, one fallback link. */
const renderHtml = ({
  heading,
  body,
  cta,
  url,
  footer,
}: {
  heading: string;
  body: string;
  cta: string;
  url: string;
  footer: string;
}): string => {
  const safeUrl = escapeHtml(url);
  return `<div style="font-family:Arial,Helvetica,sans-serif;max-width:480px;margin:0 auto;padding:32px 24px;color:#111827;">
  <h1 style="font-size:20px;margin:0 0 16px;">${heading}</h1>
  <p style="font-size:15px;line-height:1.6;margin:0 0 24px;">${body}</p>
  <p style="margin:0 0 24px;">
    <a href="${safeUrl}" style="display:inline-block;background:#111827;color:#ffffff;text-decoration:none;font-size:15px;padding:12px 24px;border-radius:6px;">${cta}</a>
  </p>
  <p style="font-size:13px;line-height:1.6;color:#6b7280;margin:0 0 8px;">Nëse butoni nuk punon, hape këtë link:<br /><a href="${safeUrl}" style="color:#2563eb;word-break:break-all;">${safeUrl}</a></p>
  <p style="font-size:13px;line-height:1.6;color:#6b7280;margin:16px 0 0;">${footer}</p>
</div>`;
};

export async function sendPasswordResetEmail({
  to,
  url,
}: AuthEmailInput): Promise<void> {
  const heading = 'Rivendos fjalëkalimin';
  const body =
    'Ke kërkuar me e rivendosë fjalëkalimin e llogarisë sate në Aksioneri. Kliko butonin më poshtë për me vazhdu.';
  const footer =
    "Nëse s'e ke kërkuar ti këtë, injoroje këtë email — fjalëkalimi yt mbetet siç është.";

  await sendTransactionalEmail({
    to,
    subject: 'Rivendos fjalëkalimin',
    html: renderHtml({
      heading,
      body,
      cta: 'Rivendos fjalëkalimin',
      url,
      footer,
    }),
    text: `${heading}\n\n${body}\n\n${url}\n\n${footer}`,
  });
}

export async function sendVerificationEmail({
  to,
  url,
}: AuthEmailInput): Promise<void> {
  const heading = 'Verifiko email-in';
  const body =
    'Mirë se erdhe në Aksioneri! Kliko butonin më poshtë për me e verifiku email-in tënd.';
  const footer = "Nëse s'je regjistruar ti në Aksioneri, injoroje këtë email.";

  await sendTransactionalEmail({
    to,
    subject: 'Verifiko email-in',
    html: renderHtml({
      heading,
      body,
      cta: 'Verifiko email-in',
      url,
      footer,
    }),
    text: `${heading}\n\n${body}\n\n${url}\n\n${footer}`,
  });
}
