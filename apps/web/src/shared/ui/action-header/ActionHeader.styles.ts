import { tv, type VariantProps } from 'tailwind-variants';

export const actionHeader = tv({
  slots: {
    root: 'sticky top-0 z-50 flex w-full items-center justify-between px-5 py-4 backdrop-blur-md backdrop-saturate-150 transition-colors duration-200',
    backButton:
      'group flex items-center justify-center gap-2 transition-colors cursor-pointer disabled:cursor-not-allowed disabled:opacity-50',
    backButtonIcon: 'transition-colors',
    backButtonText: 'typo-subtitle-16-bold transition-colors',
    actionButton:
      'typo-subtitle-16-bold flex items-center justify-center transition-colors disabled:cursor-not-allowed disabled:opacity-50',
  },

  variants: {
    isSticky: {
      true: {
        root: 'sticky top-0',
      },
      false: {
        root: 'relative',
      },
    },
    background: {
      transparent: {
        root: 'bg-white/40',
      },
      white: {
        root: 'bg-white/80',
      },
      gray: {
        root: 'bg-gray-100/80',
      },
    },
    buttonColor: {
      white: {
        actionButton:
          'enabled:cursor-pointer text-white enabled:hover:text-white/80 enabled:active:text-white/60',
        backButtonIcon:
          'fill-white group-hover:fill-white/80 group-active:fill-white/60 group-disabled:fill-white',
        backButtonText:
          'text-white group-hover:text-white/80 group-active:text-white/60 group-disabled:text-white',
      },
      gray: {
        actionButton:
          'enabled:cursor-pointer text-gray-700 enabled:hover:text-gray-500 enabled:active:text-gray-500',
        backButtonIcon:
          'fill-gray-700 group-hover:fill-gray-500 group-active:fill-gray-500 group-disabled:fill-gray-700',
        backButtonText:
          'text-gray-700 group-hover:text-gray-500 group-active:text-gray-500 group-disabled:text-gray-700',
      },
      blue: {
        actionButton:
          'enabled:cursor-pointer text-blue-700 enabled:hover:text-blue-500 enabled:active:text-blue-500',
        backButtonIcon:
          'fill-blue-700 group-hover:fill-blue-500 group-active:fill-blue-500 group-disabled:fill-blue-700',
        backButtonText:
          'text-blue-700 group-hover:text-blue-500 group-active:text-blue-500 group-disabled:text-blue-700',
      },
    },
  },

  defaultVariants: {
    isSticky: true,
    background: 'gray',
    buttonColor: 'gray',
  },
});

export type ActionHeaderVariants = VariantProps<typeof actionHeader>;
export const actionHeaderVariantKeys = actionHeader.variantKeys;
