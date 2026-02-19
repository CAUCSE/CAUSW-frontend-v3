import { useAuthStore } from '@/shared/model';
import { TokenManager } from '@/shared/storage/auth';
import { isServer } from '@/shared/utils';

import { BaseApiClient } from '../../instances';

export const setRequestInterceptors = (apiClient: BaseApiClient) => {
  apiClient.internalClient.interceptors.request.register(async (config) => {
    const headers: Record<string, string> = {};
    let nextOptions: NextFetchRequestConfig = {};

    const refreshToken = await TokenManager.getRefreshToken();
    const accessToken = await TokenManager.getAccessToken();

    if (!refreshToken && !accessToken) {
      useAuthStore.getState().setAuthError({
        code: 'token-expired',
        message: '토큰이 만료되었습니다. 다시 로그인해주세요.',
      });
      // TODO: 인증 관련 에러 클래스 만들어서 throw (layout 단에서는 sentry report X)
      throw new Error('토큰이 만료되었습니다. 다시 로그인해주세요.');
    }

    // 토큰 주입
    if (accessToken) {
      headers.Authorization = `Bearer ${accessToken}`;
    }

    // 서버 사이드 캐싱
    if (isServer) {
      if (
        config.options.method === 'GET' &&
        config.options.next?.revalidate === undefined
      ) {
        nextOptions = { revalidate: 300 };
      }
    }

    // 토큰 관련 헤더 추가
    config.options.headers = {
      ...config.options.headers,
      ...headers,
    };

    // next 관련 옵션 추가
    config.options.next = {
      ...config.options.next,
      ...nextOptions,
    };

    return config;
  });
};
