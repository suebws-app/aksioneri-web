'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useRouter } from '@/i18n/navigation';
import { POST_SIGN_IN_ROUTE } from '@/lib/auth/constants';
import { signUp } from '@/lib/auth/client';
import { signUpSchema, type SignUpValues } from './authSchema';

export function SignUpPage() {
  const t = useTranslations('auth');
  const router = useRouter();
  const [formError, setFormError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpValues>({ resolver: zodResolver(signUpSchema(t)) });

  const onSubmit = handleSubmit(async (values) => {
    setFormError(null);

    const { error } = await signUp.email({
      email: values.email,
      password: values.password,
      // better-auth's `name` maps to the users.full_name column.
      name: values.fullName,
    });

    if (error) {
      setFormError(
        error.status === 422
          ? t('errors.emailTaken')
          : t('errors.signUpFailed'),
      );
      return;
    }

    router.push(POST_SIGN_IN_ROUTE);
  });

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="flex w-full max-w-sm flex-col gap-4"
    >
      <h1 className="text-2xl font-semibold">{t('signUp.heading')}</h1>

      <label className="flex flex-col gap-1">
        <span className="text-sm">{t('fields.fullName')}</span>
        <input
          {...register('fullName')}
          autoComplete="name"
          aria-invalid={Boolean(errors.fullName)}
          className="border-foreground/20 rounded-md border px-3 py-2"
        />
        {errors.fullName ? (
          <span role="alert" className="text-sm text-red-600">
            {errors.fullName.message}
          </span>
        ) : null}
      </label>

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
          autoComplete="new-password"
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
        {isSubmitting ? t('signUp.submitting') : t('signUp.submit')}
      </button>

      <p className="text-sm">
        {t('signUp.haveAccount')}{' '}
        <Link href="/sign-in" className="underline">
          {t('signUp.signIn')}
        </Link>
      </p>
    </form>
  );
}
