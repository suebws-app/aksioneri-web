import 'server-only';
import { sendTransactionalEmail } from './brevo';

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

const renderHtml = ({
  heading,
  body,
  bodyEn,
  cta,
  url,
  footer,
  footerEn,
}: {
  heading: string;
  body: string;
  bodyEn: string;
  cta: string;
  url: string;
  footer: string;
  footerEn: string;
}): string => {
  const safeUrl = escapeHtml(url);
  return `<div style="font-family:Arial,Helvetica,sans-serif;max-width:480px;margin:0 auto;padding:32px 24px;color:#111827;">
  <h1 style="font-size:20px;margin:0 0 16px;">${heading}</h1>
  <p style="font-size:15px;line-height:1.6;margin:0 0 8px;">${body}</p>
  <p style="font-size:13px;line-height:1.6;color:#6b7280;margin:0 0 24px;">${bodyEn}</p>
  <p style="margin:0 0 24px;">
    <a href="${safeUrl}" style="display:inline-block;background:#111827;color:#ffffff;text-decoration:none;font-size:15px;padding:12px 24px;border-radius:6px;">${cta}</a>
  </p>
  <p style="font-size:13px;line-height:1.6;color:#6b7280;margin:0 0 8px;">Nëse butoni nuk punon, hape këtë link / If the button does not work, open this link:<br /><a href="${safeUrl}" style="color:#2563eb;word-break:break-all;">${safeUrl}</a></p>
  <p style="font-size:13px;line-height:1.6;color:#6b7280;margin:16px 0 0;">${footer}<br />${footerEn}</p>
</div>`;
};

export async function sendPasswordResetEmail({
  to,
  url,
}: AuthEmailInput): Promise<void> {
  const heading = 'Rivendos fjalëkalimin';
  const body =
    'Ke kërkuar me e rivendosë fjalëkalimin e llogarisë sate në Aksioneri. Kliko butonin më poshtë për me vazhdu.';
  const bodyEn =
    'You asked to reset the password for your Aksioneri account. Click the button below to continue.';
  const footer =
    "Nëse s'e ke kërkuar ti këtë, injoroje këtë email — fjalëkalimi yt mbetet siç është.";
  const footerEn =
    'If you did not request this, ignore this email — your password stays as it is.';

  await sendTransactionalEmail({
    to,
    subject: 'Rivendos fjalëkalimin / Reset your password',
    html: renderHtml({
      heading,
      body,
      bodyEn,
      cta: 'Rivendos fjalëkalimin',
      url,
      footer,
      footerEn,
    }),
    text: `${heading}\n\n${body}\n${bodyEn}\n\n${url}\n\n${footer}\n${footerEn}`,
  });
}

export async function sendVerificationEmail({
  to,
  url,
}: AuthEmailInput): Promise<void> {
  const heading = 'Verifiko email-in';
  const body =
    'Mirë se erdhe në Aksioneri! Kliko butonin më poshtë për me e verifiku email-in tënd.';
  const bodyEn =
    'Welcome to Aksioneri! Click the button below to verify your email address.';
  const footer = "Nëse s'je regjistruar ti në Aksioneri, injoroje këtë email.";
  const footerEn = 'If you did not sign up for Aksioneri, ignore this email.';

  await sendTransactionalEmail({
    to,
    subject: 'Verifiko email-in / Verify your email',
    html: renderHtml({
      heading,
      body,
      bodyEn,
      cta: 'Verifiko email-in',
      url,
      footer,
      footerEn,
    }),
    text: `${heading}\n\n${body}\n${bodyEn}\n\n${url}\n\n${footer}\n${footerEn}`,
  });
}
