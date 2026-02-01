import { CustomApiError, SentryExtra, SentryLevel, SentryType } from '../types';

/**
 * 주어진 에러 객체가 `CustomApiError` (API 에러) 형식인지 확인하는 타입 가드입니다.
 * * @param error - 확인할 에러 객체 (unknown)
 * @returns `CustomApiError` 구조와 일치하면 `true`를 반환합니다.
 */
export function isApiClientError(error: unknown): error is CustomApiError {
  return (
    typeof error === 'object' &&
    error !== null &&
    'status' in error &&
    typeof (error as Record<string, unknown>).status === 'number'
    // 필요하다면 여기서 config 구조도 체크 가능
  );
}

/**
 * 에러 객체를 분석하여 Sentry 포맷(Level, Tag, Extra)으로 변환합니다.
 * * **처리 정책:**
 * - **Server Error (500 이상)**: `fatal` 레벨 / `server_error` 태그
 * - **Client Error (400 대)**: `warning` 레벨 / `unexpected_error` 태그
 * - **그 외 (네트워크 등)**: `error` 레벨 / `network_error` 태그
 *
 * @param params.error - 발생한 에러 객체
 * @param params.url - (Optional) 에러가 발생한 API URL
 * @param params.method - (Optional) 에러가 발생한 HTTP Method
 * @returns Sentry 전송용 데이터 객체 (`type`, `level`, `extra`)
 */
export function createSentryFormat({
  error,
  url,
  method,
}: {
  error: unknown;
  url?: string;
  method?: string;
}): { type: SentryType; level: SentryLevel; extra: SentryExtra } {
  let type: SentryType = 'network_error';
  let extra: SentryExtra = {
    info: '서버 응답이 없습니다.',
    url: url || 'unknown',
    method: method || 'UNKNOWN',
  };
  let level: SentryLevel = 'error';

  if (isApiClientError(error)) {
    const { status, data } = error;

    let errorCode: string | undefined;
    let timeStamp: string | undefined;
    let message: string | undefined;

    if (typeof data === 'object' && data !== null) {
      const dataObj = data as Record<string, unknown>;

      if ('code' in dataObj) {
        errorCode = dataObj.code as string;
      } else if ('errorCode' in dataObj) {
        errorCode = dataObj.errorCode as string;
      }

      if ('timestamp' in dataObj) {
        timeStamp = dataObj.timestamp as string;
      } else if ('timeStamp' in dataObj) {
        timeStamp = dataObj.timeStamp as string;
      }

      if ('message' in dataObj) {
        message = dataObj.message as string;
      }
    }

    if (status >= 500) {
      type = 'server_error';
      level = 'fatal';
      extra = {
        ...extra,
        info: '서버 내부 오류 발생',
        status,
        errorCode,
        timeStamp,
        serverMessage: message,
      };
    } else {
      type = 'unexpected_error';
      level = 'warning';
      extra = {
        ...extra,
        info: '클라이언트/요청 오류 발생',
        status,
        errorCode,
        timeStamp,
        data,
      };
    }
  }

  return {
    type,
    level,
    extra,
  };
}
