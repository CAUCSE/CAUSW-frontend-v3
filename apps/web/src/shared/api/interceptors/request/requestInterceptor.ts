import { ApiClient } from '@causw/api-client';

export const setRequestInterceptors = (apiClient: ApiClient) => {
  apiClient.interceptors.request.register((config) => {
    return config;
  });
};
