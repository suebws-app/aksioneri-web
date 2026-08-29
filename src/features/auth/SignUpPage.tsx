'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/Button';
import { Field } from '@/components/Field';
import { Link, useRouter } from '@/i18n/navigation';
import { POST_SIGN_IN_ROUTE } from '@/lib/auth/constants';
import { signUp } from '@/lib/auth/client';
import { signUpSchema, type SignUpValues } from './authSchema';

const INPUT_CLASS =
  'border-line-strong bg-surface text-ink placeholder:text-ink-ghost focus:border-accent min-h-11 w-full rounded-sm border px-3.5 py-2.5 text-[15px] outline-none';

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
      name: values.fullName,
    });

    if (error) {
      setFormError(t('errors.signUpFailed'));
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

      <Field
        name="fullName"
        label={t('fields.fullName')}
        error={errors.fullName?.message}
      >
        {({ id, describedBy, invalid }) => (
          <input
            {...register('fullName')}
            id={id}
            autoComplete="name"
            aria-invalid={invalid}
            aria-describedby={describedBy}
            className={INPUT_CLASS}
          />
        )}
      </Field>

      <Field
        name="email"
        label={t('fields.email')}
        error={errors.email?.message}
      >
        {({ id, describedBy, invalid }) => (
          <input
            {...register('email')}
            id={id}
            type="email"
            autoComplete="email"
            aria-invalid={invalid}
            aria-describedby={describedBy}
            className={INPUT_CLASS}
          />
        )}
      </Field>

      <Field
        name="password"
        label={t('fields.password')}
        error={errors.password?.message}
      >
        {({ id, describedBy, invalid }) => (
          <input
            {...register('password')}
            id={id}
            type="password"
            autoComplete="new-password"
            aria-invalid={invalid}
            aria-describedby={describedBy}
            className={INPUT_CLASS}
          />
        )}
      </Field>

      {formError ? (
        <p role="alert" className="text-negative text-sm">
          {formError}
        </p>
      ) : null}

      <Button type="submit" disabled={isSubmitting} block>
        {isSubmitting ? t('signUp.submitting') : t('signUp.submit')}
      </Button>

      <p className="text-sm">
        {t('signUp.haveAccount')}{' '}
        <Link href="/sign-in" className="underline">
          {t('signUp.signIn')}
        </Link>
      </p>
    </form>
  );
}
