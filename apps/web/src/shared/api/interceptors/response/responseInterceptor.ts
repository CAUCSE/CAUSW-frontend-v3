import { ApiClient } from '@causw/api-client';

export const setResponseInterceptors = (apiClient: ApiClient) => {
  apiClient.interceptors.response.register((config) => {
    return config;
  });
};
