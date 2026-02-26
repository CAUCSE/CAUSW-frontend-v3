/**
 * Google 로그인 관련 환경변수
 *
 * Google Cloud Console에서 발급/설정:
 * - NEXT_PUBLIC_GOOGLE_CLIENT_ID   → OAuth Client ID
 */

/** Google OAuth Client ID (브라우저 공개 가능) */
export const GOOGLE_CLIENT_ID =
  process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ??
  '1079571986006-hishfijcs5ihbvj5loiamdnub1qqquti.apps.googleusercontent.com';
