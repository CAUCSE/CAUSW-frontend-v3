import { tv } from 'tailwind-variants';

export const actionHeader = tv({
  base: ['z-sticky', 'flex items-center gap-2', 'px-5 py-4', 'w-full mx-auto'],

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

export const actionHeaderVariantKeys = actionHeader.variantKeys;
