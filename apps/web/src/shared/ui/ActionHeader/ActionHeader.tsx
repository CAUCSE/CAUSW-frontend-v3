'use client';

import { splitVariantProps } from '@causw/cds';

import { actionHeader, actionHeaderVariantKeys } from './ActionHeader.styles';
import type { ActionHeaderProps } from './ActionHeader.types';

export function ActionHeader(props: ActionHeaderProps) {
  const { leftSlot, centerSlot, rightSlot, ...rest } = props;

  const [variantProps, actionHeaderProps] = splitVariantProps(
    rest,
    actionHeaderVariantKeys,
  );

  return (
    <header
      {...actionHeaderProps}
      className={`${actionHeader(variantProps)} flex items-center justify-between`}
    >
      {/* LEFT */}
      <div className="flex items-center gap-2">{leftSlot}</div>

      {/* CENTER */}
      <div className="flex flex-1 justify-center">{centerSlot}</div>

      {/* RIGHT */}
      <div className="flex items-center gap-2">{rightSlot}</div>
    </header>
  );
}
