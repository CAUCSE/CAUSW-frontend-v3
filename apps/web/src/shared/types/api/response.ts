import { ApiError, ApiResponse } from '@causw/api-client';

export interface DefaultErrorField {
  code?: string;
  message?: string;
  timestamp?: string;
  data?: string;
}

export interface DefaultResponseField<T> {
  code?: string;
  message?: string;
  data?: T;
}

export type BaseApiError = ApiError<DefaultErrorField>;
export type BaseApiResponse<T> = ApiResponse<DefaultResponseField<T>>;
