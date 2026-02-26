/**
 * Apple 로그인 관련 환경변수
 *
 * Apple Developer Console에서 발급/설정:
 * - NEXT_PUBLIC_APPLE_SERVICE_ID   → Services ID (Web OAuth Client ID)
 */

/** Apple Services ID (브라우저 공개 가능) */
export const APPLE_SERVICE_ID = process.env.NEXT_PUBLIC_APPLE_SERVICE_ID ?? '';
