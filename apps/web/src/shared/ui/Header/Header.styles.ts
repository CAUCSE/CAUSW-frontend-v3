import { tv } from 'tailwind-variants';

export const header = tv({
  base: [
    'z-50',
    'flex items-center gap-2',
    'px-5 py-4',
    'w-full max-w-209 mx-auto',
  ],

  variants: {
    sticky: {
      true: 'sticky top-0',
      false: 'relative',
    },

    background: {
      transparent: 'bg-transparent',
      white: 'bg-white',
    },

    tone: {
      dark: 'text-gray-700',
      light: 'text-white',
    },
  },

  defaultVariants: {
    sticky: true,
    background: 'transparent',
    tone: 'dark',
  },
});

export const headerKeys = header.variantKeys;
