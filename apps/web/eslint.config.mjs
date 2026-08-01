import eslintConfig from '@causw/eslint-config/next';

export default [
  ...eslintConfig,
  {
    files: ['src/app/.well-known/**'],
    rules: {
      'check-file/folder-naming-convention': 'off',
    },
  },
];
