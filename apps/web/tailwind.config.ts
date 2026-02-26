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
      backgroundImage: {
        'blue-gradient': 'linear-gradient(to bottom, #98CDFF 0%, #3786FF 100%)',
      },
      screens: {
        tablet: '768px',
        desktop: '1200px',
      },
      maxWidth: {
        desktop: '1200px',
        laptop: '900px',
      },
    },
  },
} satisfies Config;
