import eslintConfig from '@causw/eslint-config/next';

export default [
  ...eslintConfig,
  // lint-staged는 저장소 루트에서 실행되므로, 앱별 Next.js 루트를 명시한다.
  {
    files: ['apps/web/**/*.{js,jsx,ts,tsx}'],
    settings: {
      next: {
        rootDir: 'apps/web/',
      },
    },
  },
  // Next.js가 요구하는 실제 공개 경로명이다. App Router 명명 규칙 검사는 제외한다.
  {
    files: ['apps/web/src/app/.well-known/**'],
    rules: {
      'check-file/folder-naming-convention': 'off',
    },
  },
];
