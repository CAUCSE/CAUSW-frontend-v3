'use client';

import type { ComponentProps } from 'react';

import { Flex, KakaoTalkBlackLogo, mergeStyles } from '@causw/cds';

import {
  getSocialOauthUrl,
  useNativeSocialLoginFlowMutation,
} from '@/features/auth';

import { isMobile } from '@/shared/utils';
type KakaoLoginButtonProps = ComponentProps<'button'>;

export const KakaoLoginButton = ({
  className,
  onClick,
  ...props
}: KakaoLoginButtonProps) => {
  const nativeSocialLoginFlowMutation = useNativeSocialLoginFlowMutation();

  const handleLogin: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    onClick?.(e);

    if (e.defaultPrevented) return;
    if (isMobile) {
      nativeSocialLoginFlowMutation.mutate({
        provider: 'kakao',
      });
      return;
    }

    window.location.href = getSocialOauthUrl('kakao');
  };

  return (
    <button
      type="button"
      {...props}
      onClick={handleLogin}
      className={mergeStyles(
        'typo-body-15-semibold h-[54px] w-full cursor-pointer rounded-md bg-[#FEE500] px-6 text-[#000000] transition-all duration-200 hover:enabled:opacity-80 active:enabled:opacity-80 disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
    >
      <Flex gap="sm" align="center" justify="center" className="w-full">
        <KakaoTalkBlackLogo size={16} />
        <span>Kakao로 시작하기</span>
      </Flex>
    </button>
  );
};
