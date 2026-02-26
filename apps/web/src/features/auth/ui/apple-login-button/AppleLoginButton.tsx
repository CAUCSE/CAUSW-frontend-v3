'use client';

import type { ComponentProps } from 'react';

import { useRouter } from 'next/navigation';

import { AppleLogo, Flex, mergeStyles } from '@causw/cds';

import { appleNativeLogin } from '@/features/auth/api';

import { toast } from '@/shared/model';
import { extractErrorMessage, isMobile } from '@/shared/utils';
import { requestNativeSocialLogin } from '@/shared/utils/auth';

type AppleLoginButtonProps = ComponentProps<'button'> & {
  serviceId?: string;
  redirectUri?: string;
  state?: string;
};

export const AppleLoginButton = ({
  className,
  onClick,
  serviceId,
  redirectUri,
  state,
  ...props
}: AppleLoginButtonProps) => {
  const router = useRouter();

  const handleLogin: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    onClick?.(e);

    if (e.defaultPrevented) return;
    if (isMobile) {
      const handleMobileLogin = async () => {
        const loadingToastId = String(toast.loading('apple 로그인 중...'));
        try {
          const nativeAccessToken = await requestNativeSocialLogin('apple');
          await appleNativeLogin({ accessToken: nativeAccessToken });
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

    if (!serviceId || !redirectUri) return;

    const resolvedRedirectUri = redirectUri.startsWith('/')
      ? `${window.location.origin}${redirectUri}`
      : redirectUri;

    const url = new URL('https://appleid.apple.com/auth/authorize');
    url.searchParams.set('client_id', serviceId);
    url.searchParams.set('redirect_uri', resolvedRedirectUri);
    url.searchParams.set('response_type', 'code');
    url.searchParams.set('response_mode', 'form_post');
    url.searchParams.set('scope', 'name email');
    if (state) url.searchParams.set('state', state);

    window.location.href = url.toString();
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
