'use client';

import type { ComponentProps } from 'react';

import { Flex, GoogleLogo, mergeStyles } from '@causw/cds';

import { useNativeSocialLoginFlowMutation } from '@/features/auth';

import { BASE_URL, ENVIRONMENT } from '@/shared/config';
import { isMobile } from '@/shared/utils';

type GoogleLoginButtonProps = ComponentProps<'button'>;

export const GoogleLoginButton = ({
  className,
  onClick,
  ...props
}: GoogleLoginButtonProps) => {
  const nativeSocialLoginFlowMutation = useNativeSocialLoginFlowMutation();

  const handleLogin: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    onClick?.(e);

    if (e.defaultPrevented) return;
    if (isMobile) {
      nativeSocialLoginFlowMutation.mutate({
        provider: 'google',
      });
      return;
    }

    const oauthUrl = new URL(`${BASE_URL}/oauth2/authorization/google`);
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
        'typo-body-15-semibold h-[54px] w-full cursor-pointer rounded-md border border-gray-200 bg-white px-6 text-gray-800 transition-all duration-200 hover:enabled:opacity-80 active:enabled:opacity-80 disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
    >
      <Flex gap="sm" align="center" justify="center" className="w-full">
        <GoogleLogo size={16} />
        <span>Google로 시작하기</span>
      </Flex>
    </button>
  );
};
