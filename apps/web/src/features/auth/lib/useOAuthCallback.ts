'use client';

import { useEffect, useState } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

type UseOAuthCallbackOptions = {
  /**
   * code를 받았을 때 실행할 콜백.
   * 이 함수 안에서 백엔드로 code를 전달하거나 토큰 교환 등을 처리하세요.
   */
  onSuccess: (code: string) => void | Promise<void>;
  /** 처리 실패 시 실행할 콜백 (선택) */
  onError?: (error: unknown) => void;
  /**
   * 처리 완료 후 URL에서 code 파라미터를 제거할지 여부 (기본: true).
   * true로 설정하면 새로고침 시 중복 처리를 방지합니다.
   */
  removeCodeFromUrl?: boolean;
};

type UseOAuthCallbackReturn = {
  /**
   * ?code=가 URL에 존재해 처리 중인 상태.
   * true이면 페이지에서 로딩 오버레이를 표시하세요.
   */
  isPending: boolean;
};

/**
 * 현재 페이지 URL의 `?code=` 쿼리 파라미터를 감지하여 OAuth 콜백을 처리하는 hook.
 */
export function useOAuthCallback({
  onSuccess,
  onError,
  removeCodeFromUrl = true,
}: UseOAuthCallbackOptions): UseOAuthCallbackReturn {
  const searchParams = useSearchParams();
  const router = useRouter();

  const code = searchParams.get('code');
  const [isPending, setIsPending] = useState(!!code);

  useEffect(() => {
    if (!code) return;

    const handle = async () => {
      try {
        await onSuccess(code);
      } catch (err) {
        onError?.(err);
        setIsPending(false);
      } finally {
        if (removeCodeFromUrl) {
          const url = new URL(window.location.href);
          url.searchParams.delete('code');
          url.searchParams.delete('state');
          router.replace(url.pathname + url.search);
        }
      }
    };

    handle();
    // onSuccess/onError는 의도적으로 deps에서 제외 (마운트 시 한 번만 실행)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { isPending };
}
