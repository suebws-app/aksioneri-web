'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { Suspense, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/Button';
import { Field } from '@/components/Field';
import { Link, useRouter } from '@/i18n/navigation';
import { POST_SIGN_IN_ROUTE } from '@/lib/auth/constants';
import { signIn } from '@/lib/auth/client';
import { signInSchema, type SignInValues } from './authSchema';

/**
 * Only same-site, absolute-path callbacks are honoured. Anything else —
 * `https://evil.example`, `//evil.example` (protocol-relative), a
 * relative path — falls back to the default landing route, so a crafted
 * sign-in link cannot bounce a freshly authenticated reader off-site.
 */
function safeCallbackUrl(raw: string | null): string {
  if (raw && raw.startsWith('/') && !raw.startsWith('//')) return raw;
  return POST_SIGN_IN_ROUTE;
}

const INPUT_CLASS =
  'border-line-strong bg-surface text-ink placeholder:text-ink-ghost focus:border-accent min-h-11 w-full rounded-sm border px-3.5 py-2.5 text-[15px] outline-none';

/**
 * `useSearchParams()` suspends during static rendering, so the form lives
 * in a child under a Suspense boundary — the page shell can render
 * statically and the callback-aware form fills in on the client.
 */
export function SignInPage() {
  return (
    <Suspense fallback={null}>
      <SignInForm />
    </Suspense>
  );
}

function SignInForm() {
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

    router.push(safeCallbackUrl(searchParams.get('callbackUrl')));
  });

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="flex w-full max-w-sm flex-col gap-4"
    >
      <h1 className="text-2xl font-semibold">{t('signIn.heading')}</h1>

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
            autoComplete="current-password"
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
        {isSubmitting ? t('signIn.submitting') : t('signIn.submit')}
      </Button>

      <p className="text-sm">
        {t('signIn.noAccount')}{' '}
        <Link href="/sign-up" className="underline">
          {t('signIn.createAccount')}
        </Link>
      </p>
    </form>
  );
}
