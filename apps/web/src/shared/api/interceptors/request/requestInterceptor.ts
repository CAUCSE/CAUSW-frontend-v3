import { useAuthStore, AuthError } from '@/shared/model';
import { TokenManager } from '@/shared/storage';
import { isServer } from '@/shared/utils';
import { isPublicEndpoint } from '@/shared/utils/auth';

import { type BaseApiClient } from '../../instances';

export const setRequestInterceptors = (apiClient: BaseApiClient) => {
  apiClient.internalClient.interceptors.request.register(async (config) => {
    const headers: Record<string, string> = {};
    let nextOptions: NextFetchRequestConfig = {};

    const refreshToken = await TokenManager.getRefreshToken();
    const accessToken = await TokenManager.getAccessToken();

    const isPublic = isPublicEndpoint(config.url, config.options.method);
    if (isPublic) {
      return config;
    } else if (!refreshToken && !accessToken) {
      const newError = new AuthError(
        'token-expired',
        '토큰이 만료되었습니다. 다시 로그인해주세요.',
      );
      useAuthStore.getState().setAuthError(newError);
      throw newError;
    } else {
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
