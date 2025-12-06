import { InterceptorManager } from '../interceptors/InterceptorManager';
import { ApiClientConfig, FetchOptions, InternalRequestConfig } from '../types';

export class ApiClient {
  private baseUrl: string;
  public interceptors = {
    request: new InterceptorManager<InternalRequestConfig>(),
    response: new InterceptorManager<Response>(),
  };

  constructor(config: ApiClientConfig) {
    this.baseUrl = config.baseUrl;
  }

  private async request<T>(
    url: string,
    options: FetchOptions = {},
  ): Promise<T> {
    let config: InternalRequestConfig = {
      url,
      options: {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      },
    };

    // 요청 인터셉터 실행
    // 요청이 전송되기 전에 설정을 수정하는 인터셉터 체인을 생성.
    const requestChain: Array<
      | ((
          config: InternalRequestConfig,
        ) => InternalRequestConfig | Promise<InternalRequestConfig>)
      | undefined
    > = [];
    this.interceptors.request.iterate((interceptor) => {
      requestChain.push(interceptor.fulfilled);
    });

    for (const interceptor of requestChain) {
      if (interceptor) {
        config = await interceptor(config);
      }
    }

    let response: Response;
    try {
      response = await fetch(`${this.baseUrl}${config.url}`, config.options);
    } catch (error) {
      throw error;
    }

    // 응답 인터셉터 실행
    // 초기 응답으로 시작하는 프로미스 체인을 생성.
    // 각 인터셉터는 응답을 수정하거나 에러를 처리할 수 있음.
    let promise = Promise.resolve(response);

    this.interceptors.response.iterate((interceptor) => {
      promise = promise.then(
        (res) => interceptor.fulfilled(res),
        (err) => {
          if (interceptor.rejected) {
            return interceptor.rejected(err);
          }
          throw err;
        },
      );
    });

    try {
      response = await promise;
    } catch (error) {
      throw error;
    }

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    // Handle 204 No Content
    if (response.status === 204) {
      return {} as T;
    }

    return response.json();
  }

  get<T>(url: string, options?: FetchOptions) {
    return this.request<T>(url, { ...options, method: 'GET' });
  }

  post<T>(url: string, body: unknown, options?: FetchOptions) {
    return this.request<T>(url, {
      ...options,
      method: 'POST',
      body: JSON.stringify(body),
    });
  }

  put<T>(url: string, body: unknown, options?: FetchOptions) {
    return this.request<T>(url, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(body),
    });
  }

  delete<T>(url: string, options?: FetchOptions) {
    return this.request<T>(url, { ...options, method: 'DELETE' });
  }

  patch<T>(url: string, body: unknown, options?: FetchOptions) {
    return this.request<T>(url, {
      ...options,
      method: 'PATCH',
      body: JSON.stringify(body),
    });
  }
}

export const createApiClient = (config: ApiClientConfig) =>
  new ApiClient(config);
