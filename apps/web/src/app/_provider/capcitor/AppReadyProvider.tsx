'use client';

import { type PropsWithChildren, useEffect } from 'react';

import { useSelectedLayoutSegments } from 'next/navigation';

import { notifyAppReady } from '@/shared/lib';

export function AppReadyProvider({ children }: PropsWithChildren) {
  // 구버전 Android WebView는 URL이 '/'로 남아 pathname 대신 렌더링된 라우트로 판별
  const routeSegmentPath = useSelectedLayoutSegments().join('/');

  useEffect(() => {
    // 로그인 화면은 useRestoreMobileAuth에서 전송
    if (routeSegmentPath === 'auth/sign-in') return;

    notifyAppReady();
  }, [routeSegmentPath]);

  return <>{children}</>;
}
