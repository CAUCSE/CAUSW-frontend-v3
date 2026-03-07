/**
 * 카카오 SDK 관련 환경변수
 *
 * 카카오 개발자 콘솔 (https://developers.kakao.com) 에서 발급:
 * - NEXT_PUBLIC_KAKAO_JS_KEY  → 앱 키 > JavaScript 키
 * - NEXT_PUBLIC_KAKAO_SDK_URL → CDN URL (버전 고정용, 생략 시 기본값 사용)
 */

/** JS SDK 초기화용 JavaScript 키 (브라우저 공개 가능) */
export const KAKAO_JS_KEY = process.env.NEXT_PUBLIC_KAKAO_JS_KEY ?? '';
