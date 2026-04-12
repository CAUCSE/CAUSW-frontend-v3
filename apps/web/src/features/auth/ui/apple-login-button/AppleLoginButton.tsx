'use client';

import type { ComponentProps } from 'react';

import { AppleLogo, Flex, mergeStyles } from '@causw/cds';

import { useNativeSocialLoginFlowMutation } from '@/features/auth';

import { BASE_URL, ENVIRONMENT } from '@/shared/config';
import { isMobile } from '@/shared/utils';

type AppleLoginButtonProps = ComponentProps<'button'>;

export const AppleLoginButton = ({
  className,
  onClick,
  ...props
}: AppleLoginButtonProps) => {
  const nativeSocialLoginFlowMutation = useNativeSocialLoginFlowMutation();

  const handleLogin: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    onClick?.(e);

    if (e.defaultPrevented) return;
    if (isMobile) {
      nativeSocialLoginFlowMutation.mutate({
        provider: 'apple',
      });
      return;
    }

    const oauthUrl = new URL(`${BASE_URL}/oauth2/authorization/apple`);
    if (ENVIRONMENT === 'local') {
      oauthUrl.searchParams.set('env', 'local');
    }
    if (ENVIRONMENT === 'development') {
      oauthUrl.searchParams.set('env', 'dev');
    }
    window.location.href = oauthUrl.toString();
  };

  return (
    <button
      type="button"
      {...props}
      onClick={handleLogin}
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
