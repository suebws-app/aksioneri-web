import type { ReactElement } from 'react';
import {
  render,
  type RenderOptions,
  type RenderResult,
} from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import messages from '../../messages/sq.json';
import { defaultLocale } from '@/i18n/config';

export function renderWithIntl(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
): RenderResult {
  return render(ui, {
    wrapper: ({ children }) => (
      <NextIntlClientProvider
        locale={defaultLocale}
        messages={messages}
        timeZone="UTC"
      >
        {children}
      </NextIntlClientProvider>
    ),
    ...options,
  });
}
