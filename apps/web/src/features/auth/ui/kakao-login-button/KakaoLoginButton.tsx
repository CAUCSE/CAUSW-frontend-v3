'use client';

import type { ComponentProps } from 'react';

import { useRouter } from 'next/navigation';

import { Flex, KakaoTalkBlackLogo, mergeStyles } from '@causw/cds';

import { kakaoNativeLogin } from '@/features/auth/api';

import { BASE_URL, isLocal } from '@/shared/config';
import { requestNativeSocialLogin } from '@/shared/lib/capacitor';
import { toast } from '@/shared/model';
import { extractErrorMessage, isMobile } from '@/shared/utils';

type KakaoLoginButtonProps = ComponentProps<'button'>;

export const KakaoLoginButton = ({
  className,
  onClick,
  ...props
}: KakaoLoginButtonProps) => {
  const router = useRouter();

  const handleLogin: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    onClick?.(e);

    if (e.defaultPrevented) return;
    if (isMobile) {
      const handleMobileLogin = async () => {
        const loadingToastId = String(toast.loading('kakao 로그인 중...'));
        try {
          const nativeAccessToken = await requestNativeSocialLogin('kakao');
          await kakaoNativeLogin({ accessToken: nativeAccessToken });
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

    const oauthUrl = new URL(`${BASE_URL}/oauth2/authorization/kakao`);
    if (isLocal) {
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
