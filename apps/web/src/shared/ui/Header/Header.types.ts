import type { ComponentPropsWithoutRef } from 'react';

import type { VariantProps } from 'tailwind-variants';

import { header } from './Header.styles';

export type HeaderVariants = VariantProps<typeof header>;

export interface HeaderProps
  extends ComponentPropsWithoutRef<'header'>, HeaderVariants {
  title?: string;

  showBackButton?: boolean;
  onBackClick?: () => void;
}
