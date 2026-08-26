import type { ReactElement } from 'react';
import {
  render,
  type RenderOptions,
  type RenderResult,
} from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import messages from '../../messages/sq.json';
import { defaultLocale } from '@/i18n/config';

/**
 * Render a component with the real translation catalogue.
 *
 * The repo's ten existing tests are all pure-logic; this is the first
 * component-testing support it has had, even though `@testing-library/react`
 * has been installed since setup. The calculators need it: the interesting
 * behaviour — a validation message appearing, a result updating, the
 * "no market data" state — lives in components, not in functions.
 *
 * **The real `messages/sq.json`, not a stub.** Any component calling
 * `useTranslations` throws without a provider, and a stub catalogue would let
 * a test pass against a key that does not exist in the shipped file. Using the
 * real one means a missing key fails a test, which is the point.
 */
export function renderWithIntl(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
): RenderResult {
  return render(ui, {
    wrapper: ({ children }) => (
      <NextIntlClientProvider
        locale={defaultLocale}
        messages={messages}
        // next-intl warns about a missing timezone in tests otherwise, and a
        // fixed one keeps any date-dependent assertion deterministic.
        timeZone="UTC"
      >
        {children}
      </NextIntlClientProvider>
    ),
    ...options,
  });
}
