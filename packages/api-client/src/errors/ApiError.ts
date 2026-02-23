import { ApiResponse, InternalRequestConfig } from '../types';

/* eslint-disable @typescript-eslint/no-explicit-any */
export class ApiError<T = any> extends Error {
  public config: InternalRequestConfig;
  public code?: string;
  public request?: any;
  public response?: ApiResponse<T>;
  public status?: number;
  public data?: T;

  constructor(
    message: string,
    config: InternalRequestConfig,
    code?: string,
    request?: any,
    response?: ApiResponse<T>,
    options?: ErrorOptions,
  ) {
    super(message, options);
    this.name = 'ApiError';
    this.config = config;
    this.code = code;
    this.request = request;
    this.response = response;
    this.status = response?.status;
    this.data = response?.data;
  }
}
