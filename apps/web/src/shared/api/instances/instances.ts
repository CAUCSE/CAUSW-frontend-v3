import {
  ApiClient,
  ApiClientConfig,
  createApiClient,
  FetchOptions,
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

  /** 원본 API Client 접근 로직 ( response wrapping 되지 않는, 토큰 관련 처리 없는 ) */
  public get internalClient() {
    return this.client;
  }

  /** Refresh Token 재발급을 위한 큐 */
  private refreshQueue: {
    resolve: (token: string) => void;
    reject: () => void;
  }[] = [];

  constructor(config: ApiClientConfig) {
    this.client = createApiClient(config);
  }

  public getIsRefreshing = () => this.isRefreshing;
  public setIsRefreshing = (value: boolean) => {
    this.isRefreshing = value;
  };

  public addToRefreshQueue(callback: {
    resolve: (token: string) => void;
    reject: () => void;
  }) {
    this.refreshQueue.push(callback);
  }

  public processRefreshQueue(token: string) {
    this.refreshQueue.forEach(({ resolve }) => resolve(token));
    this.refreshQueue = [];
  }

  public rejectRefreshQueue() {
    this.refreshQueue.forEach(({ reject }) => reject());
    this.refreshQueue = [];
  }

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

setRequestInterceptors(API);
setResponseInterceptors(API);
