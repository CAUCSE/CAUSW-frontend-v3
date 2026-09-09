'use client';

import type { ComponentProps } from 'react';

import { Flex, GoogleLogo, mergeStyles, Text } from '@causw/cds';
type GoogleLoginButtonProps = ComponentProps<'button'>;

export const GoogleLoginButton = ({
  className,
  ...props
}: GoogleLoginButtonProps) => {
  return (
    <button
      type="button"
      {...props}
      className={mergeStyles(
        'h-12 w-full cursor-pointer rounded-[10px] border border-gray-200 bg-white py-3.5 text-gray-800 transition-all duration-200 hover:enabled:opacity-80 active:enabled:opacity-80 disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
    >
      <Flex gap="sm" align="center" justify="center" className="w-full">
        <GoogleLogo size={16} />
        <Text typography="body-14-medium" textColor="gray-800">
          Google로 시작하기
        </Text>
      </Flex>
    </button>
  );
};
