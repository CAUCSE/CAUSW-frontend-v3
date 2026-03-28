import { isApiError } from '@causw/api-client';

import { SentryExtra, SentryFormat, SentryLevel, SentryType } from '../types';

/**
 * 에러 객체를 분석하여 Sentry 포맷(Level, Tag, Extra)으로 변환합니다.
 * * **처리 정책:**
 * - **Server Error (500 이상)**: `fatal` 레벨 / `server_error` 태그
 * - **Client Error (400 대)**: `warning` 레벨 / `unexpected_error` 태그
 * - **그 외 (네트워크 등)**: `error` 레벨 / `network_error` 태그
 */
export function createSentryFormat({
  error,
  url,
  method,
}: {
  error: unknown;
  url?: string;
  method?: string;
}): SentryFormat {
  let type: SentryType = 'network_error';
  let level: SentryLevel = 'error';
  let extra: SentryExtra = {
    info: '서버 응답이 없습니다.',
    url: url?.split('?')[0] || 'unknown',
    method: method || 'UNKNOWN',
  };

  if (!isApiError(error) || typeof error.status !== 'number') {
    return { type, level, extra };
  }

  const { status, code: errorCode } = error;

  // TODO: timeStamp 추출 로직 구현 필요
  // 현재는 구조가 불명확하여 undefined로 선언만 해둠
  let timeStamp: string | undefined;

  if (status >= 500) {
    type = 'server_error';
    level = 'fatal';
    extra = {
      ...extra,
      info: '서버 내부 오류 발생',
      status,
      errorCode,
      timeStamp,
    };
  } else {
    type = 'unexpected_error';
    level = 'warning';
    extra = {
      ...extra,
      info: '예상치 못한 오류 발생',
      status,
      errorCode,
      timeStamp,
    };
  }

  return {
    type,
    level,
    extra,
  };
}
