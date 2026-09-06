'use client';

import type { ComponentProps } from 'react';

import { Flex, KakaoTalkBlackLogo, mergeStyles, Text } from '@causw/cds';
type KakaoLoginButtonProps = ComponentProps<'button'>;

export const KakaoLoginButton = ({
  className,
  ...props
}: KakaoLoginButtonProps) => {
  return (
    <button
      type="button"
      {...props}
      className={mergeStyles(
        'w-full cursor-pointer rounded-[10px] bg-[#FEE500] py-3.5 transition-all duration-200 hover:enabled:opacity-80 active:enabled:opacity-80 disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
    >
      <Flex gap="sm" align="center" justify="center" className="w-full">
        <KakaoTalkBlackLogo size={16} />
        <Text typography="body-14-medium" textColor="black">
          카카오로 시작하기
        </Text>
      </Flex>
    </button>
  );
};
