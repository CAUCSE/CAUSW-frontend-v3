export type SentryType = 'server_error' | 'unexpected_error' | 'network_error';
export type SentryLevel = 'error' | 'warning' | 'fatal';
export type SentryExtra = {
  errorCode?: string;
  [key: string]: unknown;
};

export interface CustomApiError {
  status: number;
  data?: unknown;
  config?: {
    url?: string;
    options?: {
      method?: string;
    };
  };
}
