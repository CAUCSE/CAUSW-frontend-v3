import { ApiError } from '../errors/ApiError';
import { InterceptorManager } from '../interceptors/InterceptorManager';
import {
  ApiClientConfig,
  ApiResponse,
  FetchOptions,
  InternalRequestConfig,
} from '../types';

export class ApiClient {
  private baseUrl: string;
  private timeout: number;
  public interceptors = {
    request: new InterceptorManager<InternalRequestConfig>(),
    response: new InterceptorManager<Response>(),
  };

  constructor(config: ApiClientConfig) {
    this.baseUrl = config.baseUrl;
    this.timeout = config.timeout ?? 30000;
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
  ): Promise<ApiResponse<T>> {
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
    const timeout = config.options.timeout ?? this.timeout;
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
        throw new ApiError('Request Timeout', config, 'ECONNABORTED', null);
      } else if (error instanceof TypeError) {
        throw new ApiError('Network Error', config, 'ERR_NETWORK', null);
      } else {
        throw new ApiError('Unknown Error', config, 'UNKNOWN', null);
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

    // Parse Headers
    const headers: Record<string, string> = {};
    response.headers.forEach((value, key) => {
      headers[key] = value;
    });
    /* eslint-disable @typescript-eslint/no-explicit-any */
    let data: any;

    // Handle 204 No Content
    if (response.status === 204) {
      data = {};
    } else {
      try {
        const text = await response.text();
        try {
          data = JSON.parse(text);
        } catch {
          data = text;
        }
      } catch {
        data = null;
      }
    }

    // Construct ApiResponse
    const apiResponse: ApiResponse<T> = {
      data: data,
      status: response.status,
      statusText: response.statusText,
      headers,
      config,
    };

    if (!response.ok) {
      throw new ApiError(
        `Request failed with status code ${response.status}`,
        config,
        response.status.toString(),
        null,
        apiResponse,
      );
    }

    return apiResponse;
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
