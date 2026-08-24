---
name: react-hook-form-patterns
description: Use this skill when building a form, validating input, or submitting data with React Hook Form and Zod
type: skill
---

# Forms with React Hook Form and Zod

## When to Use

- Any form
- Client-side validation
- Submitting to the API and showing server errors

## Core Principles

- React Hook Form plus `zodResolver`. The schema is the single definition of the
  shape and its rules.
- **Schemas are functions that take the translator**, so messages are localised.
  A hardcoded English message shows English to an Albanian reader.
- Client validation is a convenience, never a guarantee — the API validates
  again with its own Zod schema. Keep the two in agreement (a client that allows
  a 6-character password when better-auth requires 8 produces a confusing
  server rejection).
- Server errors go to a **form-level** error, not a field, unless the API
  identifies the field.
- Every input has a label, `aria-invalid` when in error, and the error text tied
  to it with `role="alert"`.

## Code Templates

### Schema

```typescript
// src/features/auth/authSchema.ts
type Translate = (
  key: string,
  values?: Record<string, string | number>,
) => string;

export const signUpSchema = (t: Translate) =>
  z.object({
    fullName: z
      .string()
      .trim()
      .min(2, { message: t('errors.fullName') }),
    email: z.email({ message: t('errors.email') }),
    // Must match better-auth's minPasswordLength or the server rejects what
    // the client accepted.
    password: z
      .string()
      .min(8, { message: t('errors.passwordLength', { min: 8 }) }),
  });

export type SignUpValues = z.infer<ReturnType<typeof signUpSchema>>;
```

### Form

```typescript
'use client';

export function SignUpForm() {
  const t = useTranslations('auth');
  const [formError, setFormError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpValues>({ resolver: zodResolver(signUpSchema(t)) });

  const onSubmit = handleSubmit(async (values) => {
    setFormError(null);
    const { error } = await signUp.email({ ...values, name: values.fullName });
    if (error) {
      setFormError(t('errors.signUpFailed'));
      return;
    }
    router.push('/dashboard');
  });

  // noValidate: the browser's own messages are unstyled and unlocalised.
  return (
    <form onSubmit={onSubmit} noValidate>
      <label>
        <span>{t('fields.email')}</span>
        <input {...register('email')} type="email" autoComplete="email" aria-invalid={Boolean(errors.email)} />
        {errors.email ? <span role="alert">{errors.email.message}</span> : null}
      </label>

      {formError ? <p role="alert">{formError}</p> : null}

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? t('signUp.submitting') : t('signUp.submit')}
      </button>
    </form>
  );
}
```

`disabled={isSubmitting}` is the double-submit guard. Without it an impatient
double-click sends two requests.

### Field-level server errors

```typescript
if (error instanceof ApiError && error.code === 'VALIDATION_ERROR') {
  const fields = error.details.fields as Record<string, string> | undefined;
  for (const [field, message] of Object.entries(fields ?? {})) {
    setError(field as keyof SignUpValues, { message });
  }
}
```

### Cross-field rules

```typescript
z.object({ password: z.string().min(8), confirm: z.string() }).refine(
  (v) => v.password === v.confirm,
  {
    message: t('errors.passwordMismatch'),
    path: ['confirm'], // attaches the error to the field the user can fix
  },
);
```

### `autoComplete` values that matter

`email`, `current-password`, `new-password`, `name`, `tel`, `street-address`,
`postal-code`. Getting `new-password` vs `current-password` right is what lets
password managers offer to generate and save credentials.

## Anti-Patterns

| Don't                                        | Do                                  |
| -------------------------------------------- | ----------------------------------- |
| `z.string().min(8, 'Too short')`             | Pass `t` into the schema            |
| A `useState` per field                       | `register`                          |
| Submitting without `disabled={isSubmitting}` | Guard the double submit             |
| `<input>` with no label                      | Label with `htmlFor`, or wrap it    |
| Displaying the raw API message               | Map the error code to a key         |
| Client rules looser than the server's        | Keep them in agreement              |
| Omitting `noValidate`                        | Own the validation and its messages |
