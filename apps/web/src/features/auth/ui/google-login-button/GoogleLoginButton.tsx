'use client';

import type { ComponentProps } from 'react';

import { Flex, GoogleLogo, mergeStyles } from '@causw/cds';

import { useNativeSocialLoginMutation } from '@/features/auth';

import { BASE_URL, ENVIRONMENT } from '@/shared/config';
import { requestNativeSocialLogin } from '@/shared/lib/capacitor';
import { toast } from '@/shared/model';
import { extractErrorMessage, isMobile } from '@/shared/utils';

type GoogleLoginButtonProps = ComponentProps<'button'>;

export const GoogleLoginButton = ({
  className,
  onClick,
  ...props
}: GoogleLoginButtonProps) => {
  const nativeSocialLoginMutation = useNativeSocialLoginMutation();

  const handleLogin: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    onClick?.(e);

    if (e.defaultPrevented) return;
    if (isMobile) {
      const handleMobileLogin = async () => {
        const loadingToastId = String(toast.loading('google 로그인 중...'));
        let idToken: string;

        try {
          const tokens = await requestNativeSocialLogin('google');
          if (!tokens.idToken) {
            throw new Error('Google id token을 가져오지 못했습니다.');
          }
          idToken = tokens.idToken;
        } catch (error) {
          toast.dismiss(loadingToastId);
          toast.error(
            extractErrorMessage(
              error,
              '소셜 로그인에 실패했습니다. 다시 시도해 주세요.',
            ),
          );
          return;
        }

        nativeSocialLoginMutation.mutate(
          {
            provider: 'google',
            idToken,
          },
          {
            onSettled: () => {
              toast.dismiss(loadingToastId);
            },
          },
        );
      };

      handleMobileLogin();
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
