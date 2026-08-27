import { z } from 'zod';
import { clientEnv } from '@/lib/utils/env.client';

/**
 * Schemas take a translator so validation messages are localised. Never
 * hardcode a message string here — it would render in Albanian to an English
 * reader.
 */
type Translate = (
  key: string,
  values?: Record<string, string | number>,
) => string;

export const signInSchema = (t: Translate) =>
  z.object({
    email: z.email({ message: t('errors.email') }),
    password: z.string().min(1, { message: t('errors.passwordRequired') }),
  });

export const signUpSchema = (t: Translate) =>
  z.object({
    fullName: z
      .string()
      .trim()
      .min(2, { message: t('errors.fullName') }),
    email: z.email({ message: t('errors.email') }),
    password: z
      .string()
      // Must match the server's MIN_PASSWORD_LENGTH (better-auth's
      // `minPasswordLength`), or the server rejects a password the client
      // accepted. One env var, set identically on both sides.
      .min(clientEnv.NEXT_PUBLIC_MIN_PASSWORD_LENGTH, {
        message: t('errors.passwordLength', {
          min: clientEnv.NEXT_PUBLIC_MIN_PASSWORD_LENGTH,
        }),
      }),
  });

export type SignInValues = z.infer<ReturnType<typeof signInSchema>>;
export type SignUpValues = z.infer<ReturnType<typeof signUpSchema>>;
