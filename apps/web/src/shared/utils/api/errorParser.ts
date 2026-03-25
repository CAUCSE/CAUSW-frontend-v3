import { ApiError } from '@causw/api-client';

import { type DefaultErrorField } from '@/shared/types';

/**
 * ApiError에서 서버가 보낸 에러 메시지를 추출합니다.
 * 백엔드 사양에 맞게 DefaultErrorField 내의 message를 최우선으로 가져오며,
 * 없을 경우 기본 메시지를 반환합니다.
 */
export const extractErrorMessage = (
  error: unknown,
  fallbackMessage = '알 수 없는 오류가 발생했습니다.',
): string => {
  if (error instanceof ApiError) {
    // 백엔드에서 내려주는 에러 형식(DefaultErrorField)으로 파싱 시도
    const errorData = error.response?.data as DefaultErrorField | undefined;

    if (errorData && errorData.message) {
      return errorData.message;
    }

    // fallback으로 ApiError의 자체 상태나 메세지 사용
    if (error.message) {
      return error.message;
    }
  } else if (error instanceof Error) {
    return error.message;
  }

  return fallbackMessage;
};
