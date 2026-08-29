import { z } from 'zod';
import { clientEnv } from '@/lib/utils/env.client';

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
    password: z.string().min(clientEnv.NEXT_PUBLIC_MIN_PASSWORD_LENGTH, {
      message: t('errors.passwordLength', {
        min: clientEnv.NEXT_PUBLIC_MIN_PASSWORD_LENGTH,
      }),
    }),
  });

export type SignInValues = z.infer<ReturnType<typeof signInSchema>>;
export type SignUpValues = z.infer<ReturnType<typeof signUpSchema>>;
