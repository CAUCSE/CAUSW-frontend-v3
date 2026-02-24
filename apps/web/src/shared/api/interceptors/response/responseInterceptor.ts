import { ApiResponse, isApiError } from '@causw/api-client';
import { reportApiError } from '@causw/logger';

import { useAuthStore, AuthError } from '@/shared/model';
import { TokenManager } from '@/shared/storage';
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
      if (!isApiError(error)) {
        reportApiError(error);
        throw error;
      }

      const errorCode = parseCustomErrorCode(error);
      const originalRequest = error.config;
      const status = error.status ?? 0;

      // Access Token 만료 시
      if (isAccessTokenError(errorCode)) {
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

          const newError = new AuthError(
            'token-expired',
            '토큰이 만료되었습니다. 다시 로그인해주세요.',
            { cause: refreshError },
          );
          useAuthStore.getState().setAuthError(newError);
          throw newError;
        } finally {
          apiWrapper.setIsRefreshing(false);
        }
      }

      const isClientError = status >= 400 && status < 500;

      if (!isClientError) {
        reportApiError(error, {
          url: originalRequest.url,
          method: originalRequest.options.method,
        });
      }

      throw error;
    },
  );
};
