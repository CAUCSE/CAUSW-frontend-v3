'use client';

import type { ComponentProps } from 'react';

import { AppleLogo, Flex, mergeStyles, Text } from '@causw/cds';
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
        'w-full cursor-pointer rounded-[10px] bg-[#000000] py-3.5 transition-all duration-200 hover:enabled:opacity-80 active:enabled:opacity-80 disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
    >
      <Flex gap="sm" align="center" justify="center" className="w-full">
        <AppleLogo size={16} />
        <Text typography="body-14-medium" textColor="white">
          Apple로 시작하기
        </Text>
      </Flex>
    </button>
  );
};
