import { ApiClient } from '@causw/api-client';

import { getServerATK } from '@/shared/storage/auth';
import { getClientATK } from '@/shared/storage/auth/auth-storage';
import { isClient, isServer } from '@/shared/utils';

export const setRequestInterceptors = (apiClient: ApiClient) => {
  apiClient.interceptors.request.register(async (config) => {
    let accessToken = '';
    if (isClient) {
      accessToken = getClientATK();
    } else if (isServer) {
      accessToken = await getServerATK();
    }
    // TODO: 모바일 환경분기 추가 (Capacitor SecurityStorage 접근)

    config.options.headers = {
      ...config.options.headers,
      Authorization: `Bearer ${accessToken}`,
    };

    return config;
  });
};
