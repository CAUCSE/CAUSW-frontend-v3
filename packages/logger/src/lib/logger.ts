import * as Sentry from '@sentry/nextjs';

import { isApiError } from '@causw/api-client';

import { SentryExtra, SentryLevel } from '../types';

import { createSentryFormat } from './utils';

export const captureException = Sentry.captureException;
export const withServerActionInstrumentation =
  Sentry.withServerActionInstrumentation;
export const captureRequestError = Sentry.captureRequestError;
export const getTraceData = Sentry.getTraceData;

/**
 * 에러를 커스텀 태그, 레벨, 추가 데이터와 함께 Sentry로 전송합니다.
 * * **기능:**
 * - `Scope`를 사용하여 태그(type)와 레벨(level)을 설정합니다.
 * - `Extra` 데이터를 첨부하여 디버깅 정보를 제공합니다.
 * - **Fingerprint**: `[type, errorCode]` 조합으로 설정하여, Sentry 대시보드에서 같은 종류의 에러끼리 묶이도록 합니다.
 *
 * @param error - 전송할 에러 객체 (unknown)
 * @param type - 에러 그룹핑을 위한 태그 (예: 'server_error', 'network_error')
 * @param extra - 함께 전송할 메타 데이터 (errorCode 등)
 * @param level - 로그 심각도 ('error' | 'warning' | 'fatal')
 */
export function captureSentry(
  error: unknown,
  type: string,
  extra: SentryExtra = {},
  level: SentryLevel = 'error',
) {
  try {
    Sentry.captureException(error, (scope) => {
      scope.setTag('type', type);
      Object.entries(extra).forEach(([key, value]) =>
        scope.setExtra(key, value),
      );
      scope.setLevel(level);
      scope.setFingerprint([type, extra.errorCode || 'generic']);
      return scope;
    });
  } catch {
    console.warn('Sentry capture failed');
  }
}

/**
 * API 호출 중 발생한 에러(`CustomApiError`)를 분석하여 자동으로 Sentry에 전송합니다.
 * * **기능:**
 * - `createSentryFormat`을 내부적으로 호출하여 에러 상태 코드(4xx, 5xx)에 따라 레벨과 태그를 자동 결정합니다.
 * - API 에러 객체 내의 `config` 정보를 추출하여 실패한 URL과 Method를 기록합니다.
 *
 * @param error - catch문에서 잡힌 에러 객체
 * @param config - (Optional) 에러 객체에 URL 정보가 없을 경우 수동으로 주입할 요청 정보
 */
export function reportApiError(
  error: unknown,
  config?: { url?: string; method?: string },
) {
  const apiError = isApiError(error) ? error : undefined;

  const url = config?.url || apiError?.config?.url || 'unknown';
  const method =
    config?.method || apiError?.config?.options?.method || 'UNKNOWN';

  const { type, level, extra } = createSentryFormat({ error, url, method });

  captureSentry(error, type, extra, level);
}
