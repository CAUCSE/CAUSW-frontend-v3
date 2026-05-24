/**
 * Google Analytics 관련 환경변수
 *
 * Google Analytics 4에서 발급/설정:
 * - NEXT_PUBLIC_GA_MEASUREMENT_ID  → Web data stream의 Measurement ID (예: G-XXXXXXX)
 */

/** Google Analytics 4 Measurement ID (브라우저 공개 가능) */
export const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? '';
