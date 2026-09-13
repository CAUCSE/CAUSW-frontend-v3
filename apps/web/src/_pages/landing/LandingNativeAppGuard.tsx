'use client';

import { useEffect } from 'react';

import { useRouter } from 'next/navigation';

import { isMobile } from '@/shared/utils';

/**
 * 구버전 앱을 랜딩 페이지에서 로그인 화면으로 되돌린다.
 *
 * proxy는 UA의 `CAUSWCapacitor`로 앱을 판별하는데, 이 값은 capacitor.config가
 * 반영된 빌드부터 전송된다. 이미 배포된 구버전 앱은 UA에 아무것도 싣지 않으므로
 * 서버에서는 웹 방문자와 구분할 수 없다. Capacitor 런타임은 앱 빌드 버전과 무관하게
 * WebView에 주입되므로, 클라이언트에서 한 번 더 막는다.
 *
 * TODO: v3.1 적용을 위한 임시 조치. 이후에는 제거한다.
 */
export const LandingNativeAppGuard = () => {
  const router = useRouter();

  useEffect(() => {
    if (isMobile) {
      router.replace('/auth/sign-in');
    }
  }, [router]);

  return null;
};
