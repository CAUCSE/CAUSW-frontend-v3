import { ApiResponse, isApiError } from '@causw/api-client';

import { noATKCode } from '@/shared/constants/auth/errorCode';
import { TokenManager } from '@/shared/storage/auth';
import {
  isAccessTokenError,
  parseCustomErrorCode,
} from '@/shared/utils/auth/errorHandler';

import { BaseApiClient } from '../../instances';

export const setResponseInterceptors = (apiWrapper: BaseApiClient) => {
  const { internalClient } = apiWrapper;

  internalClient.interceptors.response.register(
    (response: ApiResponse) => {
      return response;
    },

    async (error) => {
      console.log('res interceptor 진입');
      if (!isApiError(error)) {
        throw error;
      }
      const errorCode = parseCustomErrorCode(error);

      // Access Token 만료 시
      if (isAccessTokenError(errorCode)) {
        const originalRequest = error.config;

        if (apiWrapper.getIsRefreshing()) {
          return new Promise((resolve, reject) => {
            apiWrapper.addToRefreshQueue({
              resolve: (token: string) => {
                const Authorization = `Bearer ${token}`;

                resolve(
                  internalClient.request(originalRequest.url, {
                    ...originalRequest.options,
                    headers: {
                      ...originalRequest.options.headers,
                      Authorization,
                    },
                  }),
                );
              },
              reject,
            });
          });
        }

        try {
          apiWrapper.setIsRefreshing(true);

          const refreshToken = await TokenManager.getRefreshToken();
          if (!refreshToken) {
            throw new Error('No Context RefreshToken');
          }

          // TODO: refresh 토큰 넣어서 재발급 api 호출

          const newAtk = '';
          const newRtk = '';

          await TokenManager.setAccessToken(newAtk);
          if (newRtk) {
            await TokenManager.setRefreshToken(newRtk);
          }

          apiWrapper.processRefreshQueue(newAtk);

          if (originalRequest.options.headers) {
            originalRequest.options.headers.Authorization = `Bearer ${newAtk}`;
          }
          return internalClient.request(
            originalRequest.url,
            originalRequest.options,
          );
        } catch (refreshError) {
          apiWrapper.rejectRefreshQueue();
          await TokenManager.removeAccessToken();
          await TokenManager.removeRefreshToken();
          // TODO: 라우팅 로직
          throw refreshError;
        } finally {
          apiWrapper.setIsRefreshing(false);
        }
      }

      throw error;
    },
  );
};
