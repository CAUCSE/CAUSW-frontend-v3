'use client';

import { useEffect, useState } from 'react';

import { KAKAO_JS_KEY, KAKAO_SDK_URL } from '@/shared/storage';

declare global {
  interface Window {
    Kakao: typeof Kakao;
  }
}

/**
 * 카카오 JS SDK를 동적으로 로드하고 초기화하는 hook.
 *
 * - SDK 스크립트가 이미 삽입된 경우 중복 삽입을 방지합니다.
 * - `NEXT_PUBLIC_KAKAO_JS_KEY` 환경 변수가 필요합니다.
 */
export function useKakaoSDK() {
  const initialError = KAKAO_JS_KEY
    ? null
    : new Error(
        '[KakaoSDK] NEXT_PUBLIC_KAKAO_JS_KEY 환경 변수가 설정되지 않았습니다.',
      );
  const initialIsReady =
    typeof window !== 'undefined' && window.Kakao?.isInitialized?.();
  const [isReady, setIsReady] = useState(initialIsReady);
  const [error, setError] = useState<Error | null>(initialError);

  useEffect(() => {
    const jsKey = KAKAO_JS_KEY;

    if (!jsKey) {
      return;
    }

    // SDK가 이미 초기화된 경우 바로 ready 처리
    if (window.Kakao?.isInitialized?.()) return;

    const existingScript = document.getElementById('kakao-sdk-script');

    const initSDK = () => {
      if (!window.Kakao.isInitialized()) {
        window.Kakao.init(jsKey);
      }
      setIsReady(true);
    };

    if (existingScript) {
      // 스크립트가 이미 DOM에 있으나 아직 로드 중일 수 있으므로 이벤트 대응
      if (window.Kakao) {
        queueMicrotask(initSDK);
      } else {
        existingScript.addEventListener('load', initSDK);
      }
      return () => {
        existingScript.removeEventListener('load', initSDK);
      };
    }

    // 스크립트 동적 삽입
    const script = document.createElement('script');
    script.id = 'kakao-sdk-script';
    script.src = KAKAO_SDK_URL;
    script.crossOrigin = 'anonymous';
    script.async = true;

    script.addEventListener('load', initSDK);
    script.addEventListener('error', () => {
      setError(
        new Error('[KakaoSDK] 카카오 SDK 스크립트 로드에 실패했습니다.'),
      );
    });

    document.head.appendChild(script);

    return () => {
      script.removeEventListener('load', initSDK);
    };
  }, []);

  return { isReady, error };
}
