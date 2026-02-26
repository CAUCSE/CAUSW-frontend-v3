'use client';

import type { ComponentProps } from 'react';

import { useRouter } from 'next/navigation';

import { Flex, KakaoTalkBlackLogo, mergeStyles } from '@causw/cds';

import { kakaoNativeLogin } from '@/features/auth/api';

import { toast } from '@/shared/model';
import { extractErrorMessage, isMobile } from '@/shared/utils';
import { requestNativeSocialLogin } from '@/shared/utils/auth';

import { useKakaoSDK } from '../../lib/useKakaoSDK';

type KakaoLoginButtonProps = ComponentProps<'button'> & {
  /**
   * 카카오 로그인 성공 후 리다이렉트될 URI.
   *
   * - 전용 콜백 페이지가 없어도 됩니다.
   * - 생략하면 현재 페이지 URL을 사용합니다.
   *   → 현재 페이지의 useEffect 등에서 `?code=` 쿼리 파라미터를 읽어 처리하세요.
   * - 카카오 개발자 콘솔에 등록된 URI와 정확히 일치해야 합니다.
   */
  redirectUri?: string;
};

export const KakaoLoginButton = ({
  className,
  onClick,
  redirectUri,
  ...props
}: KakaoLoginButtonProps) => {
  const { isReady } = useKakaoSDK();
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
            extractErrorMessage(error, '소셜 로그인에 실패했습니다. 다시 시도해 주세요.'),
          );
          router.replace('/auth/sign-in');
        }
      };

      handleMobileLogin();
      return;
    }

    if (!isReady || !window.Kakao?.Auth) return;

    const resolvedRedirectUri = redirectUri
      ? redirectUri.startsWith('/')
        ? `${window.location.origin}${redirectUri}`
        : redirectUri
      : window.location.href.split('?')[0];

    window.Kakao.Auth.authorize({
      // redirectUri를 생략하면 현재 페이지로 돌아오고,
      // 페이지 마운트 시 URL의 ?code= 파라미터로 처리합니다.
      redirectUri: resolvedRedirectUri,
    });
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
