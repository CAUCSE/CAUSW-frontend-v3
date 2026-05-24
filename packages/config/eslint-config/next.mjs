import fsdPlugin from '@yh-kim/eslint-plugin-fsd';
import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import prettier from 'eslint-config-prettier/flat';
import checkFile from 'eslint-plugin-check-file';
import importPlugin from 'eslint-plugin-import';

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  fsdPlugin.configs['flat/recommended'],
  prettier,
  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts']),
  {
    plugins: {
      import: importPlugin,
      'check-file': checkFile,
    },
    rules: {
      'no-console': 'error',
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports',
          fixStyle: 'inline-type-imports',
        },
      ],
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
          ],
          pathGroups: [
            {
              pattern: 'react',
              group: 'external',
              position: 'before',
            },
            {
              pattern: 'react-*',
              group: 'external',
              position: 'before',
            },
            {
              pattern: 'next',
              group: 'external',
              position: 'before',
            },
            {
              pattern: 'next/**',
              group: 'external',
              position: 'before',
            },
            // 모노레포 패키지
            {
              pattern: '@causw/**',
              group: 'external',
              position: 'after',
            },
            // FSD 레이어 순서
            {
              pattern: '@/app/**',
              group: 'internal',
              position: 'after',
            },
            {
              pattern: '@/pages/**',
              group: 'internal',
              position: 'after',
            },
            {
              pattern: '@/_pages/**',
              group: 'internal',
              position: 'after',
            },
            {
              pattern: '@/widgets/**',
              group: 'internal',
              position: 'after',
            },
            {
              pattern: '@/features/**',
              group: 'internal',
              position: 'after',
            },
            {
              pattern: '@/entities/**',
              group: 'internal',
              position: 'after',
            },
            {
              pattern: '@/shared/**',
              group: 'internal',
              position: 'after',
            },
          ],
          pathGroupsExcludedImportTypes: ['react', 'next'],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
      'check-file/folder-naming-convention': [
        'error',
        {
          'src/app/**/': 'NEXT_JS_APP_ROUTER_CASE',
          'src/!(app)/**/': 'KEBAB_CASE',
        },
        {
          ignoreWords: ['_pages'],
        },
      ],
    },
  },
  // App Router page 규칙
  {
    files: ['**/src/app/**/page.{js,jsx,ts,tsx}'],
    rules: {
      'no-restricted-syntax': [
        'error',
        {
          selector: 'ExportDefaultDeclaration > ArrowFunctionExpression',
          message:
            'App Router page must default export a component named "Page".',
        },
        {
          selector: 'ExportDefaultDeclaration > FunctionExpression',
          message:
            'App Router page must default export a component named "Page".',
        },
        {
          selector:
            'ExportDefaultDeclaration > FunctionDeclaration[id.name!="Page"]',
          message:
            'App Router page must default export a component named "Page".',
        },
        {
          selector: 'ExportDefaultDeclaration > Identifier[name!="Page"]',
          message:
            'App Router page must default export a component named "Page".',
        },
        {
          selector: 'ExportDefaultDeclaration > CallExpression',
          message:
            'App Router page must default export a component named "Page".',
        },
        {
          selector:
            'ExportDefaultDeclaration > ClassDeclaration[id.name!="Page"]',
          message:
            'App Router page must default export a component named "Page".',
        },
        {
          selector: 'ExportDefaultDeclaration > ClassExpression',
          message:
            'App Router page must default export a component named "Page".',
        },
      ],
    },
  },
  {
    files: ['**/\\(\\.\\)feed/**'],
    rules: {
      'check-file/folder-naming-convention': 'off',
    },
  },
]);

export default eslintConfig;
