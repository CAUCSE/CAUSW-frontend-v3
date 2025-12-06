export interface FetchOptions extends RequestInit {
  headers?: Record<string, string>;
}

export interface InternalRequestConfig {
  url: string;
  options: FetchOptions;
}

export interface ApiClientConfig {
  baseUrl: string;
}
