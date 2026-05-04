export const STORAGE_ACCESS_KEY = 'access_token';
export const STORAGE_REFRESH_KEY = 'refresh_token';
export const NATIVE_ACCESS_KEY = 'access_token';
export const NATIVE_REFRESH_KEY = 'refresh_token';

export const STORAGE_AUTH_REFRESHED_KEY = 'auth_refreshed';
export const AUTH_REFRESHED_STORAGE_VALUE = '1';
export const STORAGE_SESSION_PERSIST_KEY = 'session_persist';
export const SESSION_COOKIE_EXPIRES_DAYS = 90;

//firebase에서 변수 이름 변경하면 아래 키 값도 변경 필요
export const REMOTE_CONFIG_KEYS = {
  FORCE_UPDATE_ENABLED: 'force_update_enabled',
  MIN_VERSION_IOS_DEV: 'min_version_ios_dev',
  MIN_VERSION_IOS_PROD: 'min_version_ios_prod',
  MIN_VERSION_ANDROID_DEV: 'min_version_android_dev',
  MIN_VERSION_ANDROID_PROD: 'min_version_android_prod',
  IOS_STORE_URL_APP: 'ios_store_url_app',
  IOS_STORE_URL_WEB: 'ios_store_url_web',
  ANDROID_STORE_URL_APP: 'android_store_url_app',
  ANDROID_STORE_URL_WEB: 'android_store_url_web',
  UPDATE_MESSAGE_KO: 'update_message_ko',
} as const;
