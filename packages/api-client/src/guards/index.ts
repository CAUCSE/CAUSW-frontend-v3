import { ApiError } from '../errors/ApiError';

/**
 * ApiError 인스턴스인지 확인하는 타입가드
 * @example
 * try {
 *   await apiClient.get('/endpoint');
 * } catch (error) {
 *   if (isApiError(error)) {
 *     handleApiError(error.status, error.data);
 *   }
 * }
 */
export function isApiError(error: unknown): error is ApiError {
  return error instanceof ApiError;
}

/**
 * ApiError에 응답 데이터가 있는지 확인하는 타입가드
 * @example
 * try {
 *   await apiClient.get('/endpoint');
 * } catch (error) {
 *   if (isApiError(error) && hasResponse(error)) {
 *     handleApiErrorData(error.data);
 *   }
 * }
 */
export function hasResponse(
  error: ApiError,
): error is ApiError & { data: NonNullable<unknown> } {
  return error.data !== null && error.data !== undefined;
}

/**
 * ApiError의 응답 데이터가 특정 타입인지 확인하는 타입가드
 * @example
 * interface ErrorResponse {
 *   message: string;
 *   code: string;
 * }
 *
 * try {
 *   await apiClient.get('/endpoint');
 * } catch (error) {
 *   if (isApiError(error) && hasResponseOfType<ErrorResponse>(error)) {
 *     handleTypedApiError(error.data.message, error.data.code);
 *   }
 * }
 */
export function hasResponseOfType<T>(
  error: ApiError,
  validator?: (data: unknown) => data is T,
): error is ApiError & { data: T } {
  if (!hasResponse(error)) {
    return false;
  }

  if (validator) {
    return validator(error.data);
  }

  return true;
}
