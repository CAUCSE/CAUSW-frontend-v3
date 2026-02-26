'use client';

import { useEffect, useState } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import { KakaoBadge, KakaoErrorView } from '@/widgets/auth';

import { useKakaoCallback } from '@/features/auth';
import { useKakaoLoginMutation } from '@/features/auth/model/mutations';

import { toast } from '@/shared/model';
import { extractErrorMessage } from '@/shared/utils';

// ─── Page Component ───────────────────────────────────────────────────────────
export const KakaoCallbackPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { mutateAsync: loginWithKakaoCode } = useKakaoLoginMutation({
    onError: () => {}, // onError는 아래 useKakaoCallback에서 처리
  });

  // URL에 code가 없으면 로그인 선택 화면으로 즉시 리다이렉트
  const code = searchParams.get('code');
  useEffect(() => {
    if (!code) {
      router.replace('/auth/sign-in');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useKakaoCallback({
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
        throw err;
      }
    },
    onError: (err) => {
      setErrorMessage(
        extractErrorMessage(
          err,
          '카카오 로그인에 실패했습니다. 다시 시도해 주세요.',
        ),
      );
    },
    removeCodeFromUrl: false,
  });

  // 오류 발생 시
  if (errorMessage) {
    return (
      <KakaoErrorView
        message={errorMessage}
        onRetry={() => router.replace('/auth/sign-in')}
      />
    );
  }

  // 로딩 중: 토스트가 메시지 담당, 화면엔 카카오 배지 + 안내 문구 노출
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-4">
      <KakaoBadge />
      <p className="typo-body-14-medium text-gray-400">잠시만 기다려 주세요</p>
    </div>
  );
};
