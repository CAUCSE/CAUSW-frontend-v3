import { Config } from 'tailwindcss';

import { causwPreset } from '@causw/cds';

export default {
  presets: [causwPreset],
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    '../../packages/design-system/cds/node_modules/@causw/components/dist/**/*.{js,mjs}',
    '../../packages/design-system/cds/node_modules/@causw/tokens/dist/**/*.{js,mjs}',
  ],
} satisfies Config;
