import {
  ApiClient,
  ApiClientConfig,
  ApiResponse,
  createApiClient,
  FetchOptions,
  isApiError,
} from '@causw/api-client';

import { DefaultResponseField } from '@/shared/types/api/response';
import { unwrapResponse } from '@/shared/utils/api';

import {
  setRequestInterceptors,
  setResponseInterceptors,
} from '../interceptors';

const baseConfig: ApiClientConfig = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL || 'https://dev.causw.com/',
  timeout: 30000,
};

export class BaseApiClient {
  private client: ApiClient;
  private isRefreshing: boolean = false;

  constructor(config: ApiClientConfig) {
    this.client = createApiClient(config);
  }

  public get internalClient() {
    return this.client;
  }

  public getIsRefreshing = () => this.isRefreshing;
  public setIsRefreshing = (value: boolean) => {
    this.isRefreshing = value;
  };

  public get = async <T>(
    url: string,
    options?: FetchOptions,
  ): Promise<DefaultResponseField<T>> => {
    const response = await this.client.get<DefaultResponseField<T>>(
      url,
      options,
    );
    return unwrapResponse(response);
  };

  public post = async <T>(
    url: string,
    body?: unknown,
    options?: FetchOptions,
  ): Promise<DefaultResponseField<T>> => {
    const response = await this.client.post<DefaultResponseField<T>>(
      url,
      body,
      options,
    );
    return unwrapResponse(response);
  };

  public put = async <T>(
    url: string,
    body?: unknown,
    options?: FetchOptions,
  ): Promise<DefaultResponseField<T>> => {
    const response = await this.client.put<DefaultResponseField<T>>(
      url,
      body,
      options,
    );
    return unwrapResponse(response);
  };

  public delete = async <T>(
    url: string,
    options?: FetchOptions,
  ): Promise<DefaultResponseField<T>> => {
    const response = await this.client.delete<DefaultResponseField<T>>(
      url,
      options,
    );
    return unwrapResponse(response);
  };

  public patch = async <T>(
    url: string,
    body?: unknown,
    options?: FetchOptions,
  ): Promise<DefaultResponseField<T>> => {
    const response = await this.client.patch<DefaultResponseField<T>>(
      url,
      body,
      options,
    );
    return unwrapResponse(response);
  };
}

export const API = new BaseApiClient(baseConfig);

setRequestInterceptors(API.internalClient);
setResponseInterceptors(API.internalClient);
