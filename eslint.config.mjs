import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import boundaries from 'eslint-plugin-boundaries';

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts']),
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports', fixStyle: 'separate-type-imports' },
      ],
      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: 'next/link',
              message:
                'Import Link from @/i18n/navigation so the locale prefix is preserved.',
            },
            {
              name: 'next/navigation',
              importNames: ['redirect', 'usePathname', 'useRouter'],
              message:
                'Import these from @/i18n/navigation so the locale prefix is preserved.',
            },
          ],
        },
      ],
    },
  },
  {
    files: ['src/app/not-found.tsx', 'src/app/global-error.tsx'],
    rules: { 'no-restricted-imports': 'off' },
  },
  {
    files: ['src/features/calculators/engine/**/*.ts'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['@/*', 'react', 'react-*', 'next', 'next/*', 'next-intl', 'zod', '../*'],
              message:
                'The calculator engine must stay portable: import only from within engine/.',
            },
          ],
        },
      ],
    },
  },
  {
    files: ['src/**/*.{ts,tsx}'],
    plugins: { boundaries },
    settings: {
      'boundaries/include': ['src/**/*.{ts,tsx}'],
      'import/resolver': { typescript: { project: './tsconfig.json' } },
      'boundaries/files-single-match': true,
      'boundaries/files': [
        { category: 'app', pattern: 'src/app/**/*.{ts,tsx}' },
        { category: 'feature', pattern: 'src/features/**/*.{ts,tsx}' },
        { category: 'component', pattern: 'src/components/**/*.{ts,tsx}' },
        { category: 'api', pattern: 'src/lib/api/**/*.ts' },
        { category: 'query', pattern: 'src/lib/query/**/*.ts' },
        { category: 'lib', pattern: 'src/lib/{auth,seo,utils}/**/*.{ts,tsx}' },
        { category: 'i18n', pattern: 'src/i18n/**/*.ts' },
      ],
    },
    rules: {
      'boundaries/dependencies': [
        'error',
        {
          default: 'allow',
          policies: [
            {
              from: { file: { categories: 'component' } },
              disallow: { to: { file: { categories: 'feature' } } },
              message:
                'Shared components cannot import features. Pass data in as props instead.',
            },
            {
              from: {
                file: { categories: { anyOf: ['component', 'feature', 'app'] } },
              },
              disallow: { to: { module: { source: 'server-only' } } },
              message:
                'Import server-only modules through lib/, not directly in UI code.',
            },
            {
              from: { file: { categories: 'api' } },
              disallow: {
                to: {
                  file: { categories: { anyOf: ['feature', 'component', 'app'] } },
                },
              },
              message: 'The API layer must not depend on UI code.',
            },
          ],
        },
      ],
    },
  },
]);

export default eslintConfig;
