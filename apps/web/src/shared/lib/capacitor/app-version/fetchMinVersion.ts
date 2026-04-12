import { getApps, initializeApp } from 'firebase/app';
import {
  fetchAndActivate,
  getRemoteConfig,
  getValue,
  isSupported,
} from 'firebase/remote-config';

import { FIREBASE_CONFIG, type UpdateEnv } from '@/shared/config';
import { QUERY_TIME } from '@/shared/constants';

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

function getMinimumVersionKey(env: UpdateEnv, platform: Platform): string {
  if (platform === 'ios') {
    return env === 'dev' ? 'min_version_ios_dev' : 'min_version_ios_prod';
  }

  return env === 'dev' ? 'min_version_android_dev' : 'min_version_android_prod';
}

function getStoreUrlAppKey(platform: Platform): string {
  if (platform === 'ios') return 'ios_store_url_app';
  return 'android_store_url_app';
}

function getStoreUrlWebKey(platform: Platform): string {
  if (platform === 'ios') return 'ios_store_url_web';
  return 'android_store_url_web';
}

export async function fetchMinVersion(
  env: UpdateEnv,
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

  remoteConfig.settings.minimumFetchIntervalMillis =
    process.env.NODE_ENV === 'development' ? 0 : QUERY_TIME.RC_INTERVAL;

  remoteConfig.defaultConfig = {
    force_update_enabled: 'false',
    min_version_ios_dev: '0.0.0',
    min_version_ios_prod: '0.0.0',
    min_version_android_dev: '0.0.0',
    min_version_android_prod: '0.0.0',
    ios_store_url_app: '',
    ios_store_url_web: '',
    android_store_url_app: '',
    android_store_url_web: '',
    update_message_ko: '최신 버전으로 업데이트해주세요.',
  };

  await fetchAndActivate(remoteConfig);

  const forceUpdateEnabled =
    getValue(remoteConfig, 'force_update_enabled').asString() === 'true';

  const minimumVersionKey = getMinimumVersionKey(env, platform);
  const minimumVersion = getValue(remoteConfig, minimumVersionKey).asString();

  const storeUrlApp = getValue(
    remoteConfig,
    getStoreUrlAppKey(platform),
  ).asString();

  const storeUrlWeb = getValue(
    remoteConfig,
    getStoreUrlWebKey(platform),
  ).asString();

  const updateMessage = getValue(remoteConfig, 'update_message_ko').asString();

  return {
    forceUpdateEnabled,
    minimumVersion,
    storeUrlApp,
    storeUrlWeb,
    updateMessage,
  };
}
