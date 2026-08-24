'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useRouter } from '@/i18n/navigation';
import { signIn } from '@/lib/auth/client';
import { signInSchema, type SignInValues } from './authSchema';

export function SignInPage() {
  const t = useTranslations('auth');
  const router = useRouter();
  const searchParams = useSearchParams();
  const [formError, setFormError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInValues>({ resolver: zodResolver(signInSchema(t)) });

  const onSubmit = handleSubmit(async (values) => {
    setFormError(null);

    const { error } = await signIn.email({
      email: values.email,
      password: values.password,
    });

    if (error) {
      // Deliberately generic: saying which of the two was wrong tells an
      // attacker whether the address exists.
      setFormError(t('errors.invalidCredentials'));
      return;
    }

    router.push(searchParams.get('callbackUrl') ?? '/dashboard');
  });

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="flex w-full max-w-sm flex-col gap-4"
    >
      <h1 className="text-2xl font-semibold">{t('signIn.heading')}</h1>

      <label className="flex flex-col gap-1">
        <span className="text-sm">{t('fields.email')}</span>
        <input
          {...register('email')}
          type="email"
          autoComplete="email"
          aria-invalid={Boolean(errors.email)}
          className="border-foreground/20 rounded-md border px-3 py-2"
        />
        {errors.email ? (
          <span role="alert" className="text-sm text-red-600">
            {errors.email.message}
          </span>
        ) : null}
      </label>

      <label className="flex flex-col gap-1">
        <span className="text-sm">{t('fields.password')}</span>
        <input
          {...register('password')}
          type="password"
          autoComplete="current-password"
          aria-invalid={Boolean(errors.password)}
          className="border-foreground/20 rounded-md border px-3 py-2"
        />
        {errors.password ? (
          <span role="alert" className="text-sm text-red-600">
            {errors.password.message}
          </span>
        ) : null}
      </label>

      {formError ? (
        <p role="alert" className="text-sm text-red-600">
          {formError}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-foreground text-background rounded-md px-4 py-2 disabled:opacity-60"
      >
        {isSubmitting ? t('signIn.submitting') : t('signIn.submit')}
      </button>

      <p className="text-sm">
        {t('signIn.noAccount')}{' '}
        <Link href="/sign-up" className="underline">
          {t('signIn.createAccount')}
        </Link>
      </p>
    </form>
  );
}
