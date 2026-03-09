'use client';

import type { ComponentProps } from 'react';

import { useRouter } from 'next/navigation';

import { AppleLogo, Flex, mergeStyles } from '@causw/cds';

import { appleNativeLogin } from '@/features/auth/api';

import { BASE_URL } from '@/shared/config';
import { requestNativeSocialLogin } from '@/shared/lib/capacitor';
import { toast } from '@/shared/model';
import { extractErrorMessage, isDevelopment, isMobile } from '@/shared/utils';

type AppleLoginButtonProps = ComponentProps<'button'>;

export const AppleLoginButton = ({
  className,
  onClick,
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
            extractErrorMessage(
              error,
              '소셜 로그인에 실패했습니다. 다시 시도해 주세요.',
            ),
          );
          router.replace('/auth/sign-in');
        }
      };

      handleMobileLogin();
      return;
    }

    const oauthUrl = new URL(`${BASE_URL}/oauth2/authorization/apple`);
    if (isDevelopment) {
      oauthUrl.searchParams.set('env', 'local');
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
