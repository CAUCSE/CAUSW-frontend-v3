/**
 * Microsoft Clarity 관련 환경변수
 *
 * Microsoft Clarity에서 발급/설정:
 * - NEXT_PUBLIC_CLARITY_PROJECT_ID  → Clarity Project ID
 */

/** Microsoft Clarity Project ID (브라우저 공개 가능) */
export const CLARITY_PROJECT_ID =
  process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID ?? '';
