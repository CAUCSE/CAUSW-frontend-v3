export interface FetchOptions extends RequestInit {
  headers?: Record<string, string>;
  /** 요청 타임아웃 (ms). 기본값: 30000 (30초) */
  timeout?: number;
}

export interface InternalRequestConfig {
  url: string;
  options: FetchOptions;
}

export interface ApiClientConfig {
  baseUrl: string;
}
