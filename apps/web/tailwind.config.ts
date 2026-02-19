import { Config } from 'tailwindcss';

import { causwPreset } from '@causw/cds';

export default {
  presets: [causwPreset],
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    '../../packages/design-system/cds/node_modules/@causw/core/dist/**/*.{js,mjs}',
    '../../packages/design-system/cds/node_modules/@causw/tokens/dist/**/*.{js,mjs}',
    '../../packages/design-system/cds/node_modules/@causw/icons/dist/**/*.{js,mjs,cjs}',
  ],
  theme: {
    extend: {
      screens: {
        tablet: '768px',
        laptop: '1024px',
        desktop: '1200px',
      },
      maxWidth: {
        desktop: '1200px',
        laptop: '1024px',
      },
    },
  },
} satisfies Config;
