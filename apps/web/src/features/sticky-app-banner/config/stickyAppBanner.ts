export const STICKY_APP_BANNER_STORAGE_KEY =
  'ccssaa:sticky-banner:hidden-until';
/** 닫은 후 재노출까지의 기간 (1일) */
export const STICKY_APP_BANNER_HIDE_DURATION = 24 * 60 * 60 * 1000;
/** 768px 미만에서만 노출 */
export const STICKY_APP_BANNER_MEDIA_QUERY = '(width < 768px)';
/** 배너 실제 높이(safe-area 포함). globals.css 에서 레이아웃 padding-top 으로 사용 */
export const STICKY_APP_BANNER_HEIGHT_VAR = '--sticky-app-banner-height';
export const ANDROID_PACKAGE_NAME = 'kr.co.causwv2.twa';
