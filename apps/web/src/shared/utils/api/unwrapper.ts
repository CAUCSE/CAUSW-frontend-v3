import { type ApiResponse } from '@causw/api-client';

import { type DefaultResponseField } from '@/shared/types';

/**
 * API 응답(ApiResponse)에서 백엔드 공통 래퍼(DefaultResponseField)를 벗겨내고
 * 실제 비즈니스 로직에 필요한 데이터(T)만 반환합니다.
 */
export const unwrapResponse = <T>(
  response: ApiResponse<DefaultResponseField<T>>,
): T => {
  if (response.status === 204) {
    return {} as T;
  }

  if (!response.data.data) {
    return {} as T;
  }

  return response.data.data;
};
