import type { ReactNode, ComponentPropsWithoutRef } from 'react';

import type { VariantProps } from 'tailwind-variants';

import { actionHeader } from './ActionHeader.styles';

export type ActionHeaderVariants = VariantProps<typeof actionHeader>;

export interface ActionHeaderProps
  extends ComponentPropsWithoutRef<'header'>, ActionHeaderVariants {
  /** 좌측 영역 */
  leftSlot?: ReactNode;

  /** 중앙 영역 */
  centerSlot?: ReactNode;

  /** 우측 영역 */
  rightSlot?: ReactNode;
}
