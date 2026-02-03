import { tv } from 'tailwind-variants';

export const header = tv({
  base: [
    'z-50',
    'flex items-center gap-2',
    'px-5 py-4',
    'w-full max-w-[480px] mx-auto',
  ],

  variants: {
    sticky: {
      true: 'sticky top-0',
      false: 'relative',
    },

    background: {
      transparent: 'bg-transparent',
      white: 'bg-white',
      gray: 'bg-gray-50',
    },
  },

  defaultVariants: {
    sticky: true,
    background: 'transparent',
  },
});

export const headerKeys = header.variantKeys;
