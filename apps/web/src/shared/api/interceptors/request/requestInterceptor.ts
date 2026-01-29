import { ApiClient } from '@causw/api-client';

import { getServerATK } from '@/shared/storage/auth';
import { getClientATK } from '@/shared/storage/auth/auth-storage';
import { isClient, isServer } from '@/shared/utils';

export const setRequestInterceptors = (apiClient: ApiClient) => {
  apiClient.interceptors.request.register(async (config) => {
    const headers: Record<string, string> = {};
    let nextOptions: NextFetchRequestConfig = {};

    // TODO: 모바일 환경분기 추가 (Capacitor SecurityStorage 접근)

    if (isClient) {
      headers.Authorization = `Bearer ${getClientATK()}`;
    } else if (isServer) {
      headers.Authorization = `Bearer ${await getServerATK()}`;
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
