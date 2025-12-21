import { ApiError } from '../errors/ApiError';
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

  /**
   * body를 직렬화합니다.
   * Content-Type이 application/json일 때만 JSON.stringify를 수행합니다.
   */
  private serializeBody(
    body: unknown,
    contentType: string,
  ): BodyInit | null | undefined {
    if (body === undefined || body === null) {
      return body;
    }

    // application/json일 때만 stringify
    if (contentType === 'application/json') {
      return JSON.stringify(body);
    }

    // 그 외에는 그대로 반환 (FormData, Blob, string 등)
    return body as BodyInit;
  }

  private async request<T>(
    url: string,
    options: FetchOptions = {},
  ): Promise<T> {
    // Content-Type: 사용자가 설정한 값 또는 기본값 (application/json)
    const contentType = options.headers?.['Content-Type'] ?? 'application/json';

    let config: InternalRequestConfig = {
      url,
      options: {
        ...options,
        headers: {
          'Content-Type': contentType,
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

    let promise: Promise<Response>;

    // 타임아웃 설정 (기본 30초)
    const timeout = config.options.timeout ?? 30000;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(`${this.baseUrl}${config.url}`, {
        ...config.options,
        signal: controller.signal,
      });

      promise = Promise.resolve(response);
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') {
        promise = Promise.reject(new ApiError(0, 'Request Timeout', error));
      } else if (error instanceof TypeError) {
        promise = Promise.reject(new ApiError(0, 'Network Error', error));
      } else {
        promise = Promise.reject(new ApiError(0, 'Unknown Error', error));
      }
    } finally {
      clearTimeout(timeoutId);
    }

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

    const response = await promise;

    if (!response.ok) {
      let data: unknown;
      try {
        data = await response.json();
      } catch {
        data = null;
      }
      throw new ApiError(response.status, response.statusText, data);
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

  post<T>(url: string, body?: unknown, options?: FetchOptions) {
    const contentType =
      options?.headers?.['Content-Type'] ?? 'application/json';
    return this.request<T>(url, {
      ...options,
      method: 'POST',
      body: this.serializeBody(body, contentType),
    });
  }

  put<T>(url: string, body?: unknown, options?: FetchOptions) {
    const contentType =
      options?.headers?.['Content-Type'] ?? 'application/json';
    return this.request<T>(url, {
      ...options,
      method: 'PUT',
      body: this.serializeBody(body, contentType),
    });
  }

  delete<T>(url: string, options?: FetchOptions) {
    return this.request<T>(url, { ...options, method: 'DELETE' });
  }

  patch<T>(url: string, body?: unknown, options?: FetchOptions) {
    const contentType =
      options?.headers?.['Content-Type'] ?? 'application/json';
    return this.request<T>(url, {
      ...options,
      method: 'PATCH',
      body: this.serializeBody(body, contentType),
    });
  }
}

export const createApiClient = (config: ApiClientConfig) =>
  new ApiClient(config);
