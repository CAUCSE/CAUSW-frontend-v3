'use client';

import type { ComponentProps } from 'react';

import { AppleLogo, Flex, mergeStyles } from '@causw/cds';
type AppleLoginButtonProps = ComponentProps<'button'>;

export const AppleLoginButton = ({
  className,
  ...props
}: AppleLoginButtonProps) => {
  return (
    <button
      type="button"
      {...props}
      className={mergeStyles(
        'typo-body-15-semibold h-[54px] w-full cursor-pointer rounded-md bg-[#000000] px-6 text-white transition-all duration-200 hover:enabled:opacity-80 active:enabled:opacity-80 disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
    >
      <Flex gap="sm" align="center" justify="center" className="w-full">
        <AppleLogo size={16} />
        <span>Apple로 시작하기</span>
      </Flex>
    </button>
  );
};
