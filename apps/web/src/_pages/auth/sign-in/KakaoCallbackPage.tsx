'use client';

import { useEffect } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import { KakaoTalkBlackLogo } from '@causw/cds';

import { useKakaoLoginMutation, useOAuthCallback } from '@/features/auth';

import { toast } from '@/shared/model';
import { extractErrorMessage } from '@/shared/utils';

// ─── Page Component ───────────────────────────────────────────────────────────
export const KakaoCallbackPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { mutateAsync: loginWithKakaoCode } = useKakaoLoginMutation({
    onError: () => {},
  });

  // URL에 code가 없으면 로그인 선택 화면으로 즉시 리다이렉트
  const code = searchParams.get('code');
  useEffect(() => {
    if (!code) {
      router.replace('/auth/sign-in');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useOAuthCallback({
    onSuccess: async (kakaoCode) => {
      const toastId = String(toast.loading('카카오 로그인 중...'));

      try {
        // TODO: 백엔드 연결 후 accessToken 저장 로직 추가
        await loginWithKakaoCode({ code: kakaoCode });

        toast.dismiss(toastId);
        toast.success('로그인되었습니다.');
        router.replace('/home');
      } catch (err) {
        toast.dismiss(toastId);
        toast.error(
          extractErrorMessage(
            err,
            '카카오 로그인에 실패했습니다. 다시 시도해 주세요.',
          ),
        );
        router.replace('/auth/sign-in');
      }
    },
    onError: (err) => {
      toast.error(
        extractErrorMessage(
          err,
          '카카오 로그인에 실패했습니다. 다시 시도해 주세요.',
        ),
      );
      router.replace('/auth/sign-in');
    },
    removeCodeFromUrl: true,
  });

  // 로딩 중: 토스트가 메시지 담당, 화면엔 카카오 배지 + 안내 문구 노출
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-4">
      <div className="flex h-[72px] w-[72px] items-center justify-center rounded-[24px] bg-[#FEE500] shadow-md">
        <KakaoTalkBlackLogo size={32} />
      </div>
      <p className="typo-body-14-medium text-gray-400">잠시만 기다려 주세요</p>
    </div>
  );
};
