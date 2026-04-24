import { type ApiResponse, isApiError } from '@causw/api-client';
import { reportApiError } from '@causw/logger';

import { useAuthStore, AuthError } from '@/shared/model';
import { TokenManager } from '@/shared/storage';
import {
  isAccessTokenError,
  isPublicEndpoint,
  isServer,
  parseCustomErrorCode,
} from '@/shared/utils';

import { type BaseApiClient } from '../../instances';

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
      const requestUrl = originalRequest.url;
      const requestMethod = originalRequest.options.method;
      const isPublicRequest = isPublicEndpoint(requestUrl, requestMethod);
      const shouldHandleAccessTokenRefresh =
        !isPublicRequest &&
        (isAccessTokenError(errorCode) ||
          error.data?.errorCode === '4105' ||
          error.data?.errorCode === '4110');

      // Access Token 만료 시 + 이전 에러코드 값 포함
      if (shouldHandleAccessTokenRefresh) {
        if (isServer) {
          throw error;
        }

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
          const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
            await TokenManager.refreshAuth(refreshToken);

          await TokenManager.setAccessToken(newAccessToken);
          await TokenManager.setRefreshToken(newRefreshToken);

          apiWrapper.processRefreshQueue(newAccessToken);

          if (originalRequest.options.headers) {
            originalRequest.options.headers.Authorization = `Bearer ${newAccessToken}`;
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
