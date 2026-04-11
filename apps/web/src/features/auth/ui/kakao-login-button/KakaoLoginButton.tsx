'use client';

import type { ComponentProps } from 'react';

import { Flex, KakaoTalkBlackLogo, mergeStyles } from '@causw/cds';

import { useNativeSocialLoginMutation } from '@/features/auth';

import { BASE_URL, ENVIRONMENT } from '@/shared/config';
import { requestNativeSocialLogin } from '@/shared/lib/capacitor';
import { toast } from '@/shared/model';
import { extractErrorMessage, isMobile } from '@/shared/utils';

type KakaoLoginButtonProps = ComponentProps<'button'>;

export const KakaoLoginButton = ({
  className,
  onClick,
  ...props
}: KakaoLoginButtonProps) => {
  const nativeSocialLoginMutation = useNativeSocialLoginMutation();

  const handleLogin: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    onClick?.(e);

    if (e.defaultPrevented) return;
    if (isMobile) {
      const handleMobileLogin = async () => {
        const loadingToastId = String(toast.loading('kakao 로그인 중...'));
        let accessToken: string;

        try {
          const tokens = await requestNativeSocialLogin('kakao');
          if (!tokens.accessToken) {
            throw new Error('카카오 액세스 토큰을 가져오지 못했습니다.');
          }
          accessToken = tokens.accessToken;
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
            provider: 'kakao',
            accessToken,
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

    const oauthUrl = new URL(`${BASE_URL}/oauth2/authorization/kakao`);
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
