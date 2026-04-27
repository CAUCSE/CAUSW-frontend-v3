import { getApps, initializeApp } from 'firebase/app';
import {
  fetchAndActivate,
  getRemoteConfig,
  getValue,
  isSupported,
} from 'firebase/remote-config';

import { FIREBASE_CONFIG, REMOTE_CONFIG_KEYS } from '@/shared/config';
import { QUERY_TIME } from '@/shared/constants';
import { isDevelopment } from '@/shared/utils';

type Platform = 'ios' | 'android';

export interface RemoteVersionConfig {
  forceUpdateEnabled: boolean;
  minimumVersion: string;
  storeUrlApp: string;
  storeUrlWeb: string;
  updateMessage: string;
}

function getFirebaseApp() {
  if (getApps().length > 0) {
    return getApps()[0];
  }

  return initializeApp(FIREBASE_CONFIG);
}

function getMinimumVersionKey(platform: Platform): string {
  if (platform === 'ios') {
    return isDevelopment
      ? REMOTE_CONFIG_KEYS.MIN_VERSION_IOS_DEV
      : REMOTE_CONFIG_KEYS.MIN_VERSION_IOS_PROD;
  }

  return isDevelopment
    ? REMOTE_CONFIG_KEYS.MIN_VERSION_ANDROID_DEV
    : REMOTE_CONFIG_KEYS.MIN_VERSION_ANDROID_PROD;
}

function getStoreUrlAppKey(platform: Platform): string {
  if (platform === 'ios') return REMOTE_CONFIG_KEYS.IOS_STORE_URL_APP;
  return REMOTE_CONFIG_KEYS.ANDROID_STORE_URL_APP;
}

function getStoreUrlWebKey(platform: Platform): string {
  if (platform === 'ios') return REMOTE_CONFIG_KEYS.IOS_STORE_URL_WEB;
  return REMOTE_CONFIG_KEYS.ANDROID_STORE_URL_WEB;
}

export async function fetchMinVersion(
  platform: Platform,
): Promise<RemoteVersionConfig> {
  const supported = await isSupported().catch(() => false);

  if (!supported) {
    return {
      forceUpdateEnabled: false,
      minimumVersion: '0.0.0',
      storeUrlApp: '',
      storeUrlWeb: '',
      updateMessage: '',
    };
  }

  const app = getFirebaseApp();
  const remoteConfig = getRemoteConfig(app);

  remoteConfig.settings.minimumFetchIntervalMillis = isDevelopment
    ? 0
    : QUERY_TIME.RC_INTERVAL;
  remoteConfig.defaultConfig = {
    [REMOTE_CONFIG_KEYS.FORCE_UPDATE_ENABLED]: 'false',
    [REMOTE_CONFIG_KEYS.MIN_VERSION_IOS_DEV]: '0.0.0',
    [REMOTE_CONFIG_KEYS.MIN_VERSION_IOS_PROD]: '0.0.0',
    [REMOTE_CONFIG_KEYS.MIN_VERSION_ANDROID_DEV]: '0.0.0',
    [REMOTE_CONFIG_KEYS.MIN_VERSION_ANDROID_PROD]: '0.0.0',
    [REMOTE_CONFIG_KEYS.IOS_STORE_URL_APP]: '',
    [REMOTE_CONFIG_KEYS.IOS_STORE_URL_WEB]: '',
    [REMOTE_CONFIG_KEYS.ANDROID_STORE_URL_APP]: '',
    [REMOTE_CONFIG_KEYS.ANDROID_STORE_URL_WEB]: '',
    [REMOTE_CONFIG_KEYS.UPDATE_MESSAGE_KO]: '최신 버전으로 업데이트해주세요.',
  };

  await fetchAndActivate(remoteConfig);

  const forceUpdateEnabled =
    getValue(
      remoteConfig,
      REMOTE_CONFIG_KEYS.FORCE_UPDATE_ENABLED,
    ).asString() === 'true';

  const minimumVersionKey = getMinimumVersionKey(platform);
  const minimumVersion = getValue(remoteConfig, minimumVersionKey).asString();

  const storeUrlApp = getValue(
    remoteConfig,
    getStoreUrlAppKey(platform),
  ).asString();

  const storeUrlWeb = getValue(
    remoteConfig,
    getStoreUrlWebKey(platform),
  ).asString();

  const updateMessage = getValue(
    remoteConfig,
    REMOTE_CONFIG_KEYS.UPDATE_MESSAGE_KO,
  ).asString();

  return {
    forceUpdateEnabled,
    minimumVersion,
    storeUrlApp,
    storeUrlWeb,
    updateMessage,
  };
}
