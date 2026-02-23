import { TokenManager } from '@/shared/storage';
import { isServer } from '@/shared/utils';

import { BaseApiClient } from '../../instances';

export const setRequestInterceptors = (apiClient: BaseApiClient) => {
  apiClient.internalClient.interceptors.request.register(async (config) => {
    const headers: Record<string, string> = {};
    let nextOptions: NextFetchRequestConfig = {};

    // 토큰 주입
    const accessToken = await TokenManager.getAccessToken();
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
