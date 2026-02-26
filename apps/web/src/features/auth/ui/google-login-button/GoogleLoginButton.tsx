'use client';

import type { ComponentProps } from 'react';

import { useRouter } from 'next/navigation';

import { Flex, GoogleLogo, mergeStyles } from '@causw/cds';

import { googleNativeLogin } from '@/features/auth/api';

import { toast } from '@/shared/model';
import { extractErrorMessage, isMobile } from '@/shared/utils';
import { requestNativeSocialLogin } from '@/shared/utils/auth';

type GoogleLoginButtonProps = ComponentProps<'button'> & {
  clientId?: string;
  redirectUri?: string;
  state?: string;
  scope?: string;
};

export const GoogleLoginButton = ({
  className,
  onClick,
  clientId,
  redirectUri,
  state,
  scope = 'openid email profile',
  ...props
}: GoogleLoginButtonProps) => {
  const router = useRouter();

  const handleLogin: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    onClick?.(e);

    if (e.defaultPrevented) return;
    if (isMobile) {
      const handleMobileLogin = async () => {
        const loadingToastId = String(toast.loading('google 로그인 중...'));
        try {
          const nativeAccessToken = await requestNativeSocialLogin('google');
          await googleNativeLogin({ accessToken: nativeAccessToken });
          toast.dismiss(loadingToastId);
          toast.success('로그인되었습니다.');
          router.replace('/home');
        } catch (error) {
          toast.dismiss(loadingToastId);
          toast.error(
            extractErrorMessage(error, '소셜 로그인에 실패했습니다. 다시 시도해 주세요.'),
          );
          router.replace('/auth/sign-in');
        }
      };

      handleMobileLogin();
      return;
    }

    if (!clientId || !redirectUri) return;

    const resolvedRedirectUri = redirectUri.startsWith('/')
      ? `${window.location.origin}${redirectUri}`
      : redirectUri;

    const url = new URL('https://accounts.google.com/o/oauth2/v2/auth');
    url.searchParams.set('client_id', clientId);
    url.searchParams.set('redirect_uri', resolvedRedirectUri);
    url.searchParams.set('response_type', 'code');
    url.searchParams.set('scope', scope);
    url.searchParams.set('prompt', 'consent');
    url.searchParams.set('access_type', 'offline');
    if (state) url.searchParams.set('state', state);

    window.location.href = url.toString();
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
