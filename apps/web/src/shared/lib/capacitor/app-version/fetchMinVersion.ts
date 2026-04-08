import { getApps, initializeApp } from 'firebase/app';
import {
  fetchAndActivate,
  getRemoteConfig,
  getValue,
  isSupported,
} from 'firebase/remote-config';

import type { UpdateEnv } from '@/shared/config';

type Platform = 'ios' | 'android';

export interface RemoteVersionConfig {
  forceUpdateEnabled: boolean;
  minimumVersion: string;
  storeUrl: string;
  updateMessage: string;
}

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

function getFirebaseApp() {
  if (getApps().length > 0) {
    return getApps()[0];
  }

  return initializeApp(firebaseConfig);
}

function getMinimumVersionKey(env: UpdateEnv, platform: Platform): string {
  if (platform === 'ios') {
    return env === 'dev' ? 'min_version_ios_dev' : 'min_version_ios_prod';
  }

  return env === 'dev' ? 'min_version_android_dev' : 'min_version_android_prod';
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
      storeUrl: '',
      updateMessage: '',
    };
  }

  const app = getFirebaseApp();
  const remoteConfig = getRemoteConfig(app);

  remoteConfig.settings.minimumFetchIntervalMillis =
    process.env.NODE_ENV === 'development' ? 0 : 12 * 60 * 60 * 1000;

  remoteConfig.defaultConfig = {
    force_update_enabled: 'false',
    min_version_ios_dev: '0.0.0',
    min_version_ios_prod: '0.0.0',
    min_version_android_dev: '0.0.0',
    min_version_android_prod: '0.0.0',
    ios_store_url: '',
    android_store_url: '',
    update_message_ko: '최신 버전으로 업데이트해주세요.',
  };

  await fetchAndActivate(remoteConfig);

  const forceUpdateEnabled =
    getValue(remoteConfig, 'force_update_enabled').asString() === 'true';

  const minimumVersionKey = getMinimumVersionKey(env, platform);
  const minimumVersion = getValue(remoteConfig, minimumVersionKey).asString();

  const storeUrl =
    platform === 'ios'
      ? getValue(remoteConfig, 'ios_store_url').asString()
      : getValue(remoteConfig, 'android_store_url').asString();

  const updateMessage = getValue(remoteConfig, 'update_message_ko').asString();

  return {
    forceUpdateEnabled,
    minimumVersion,
    storeUrl,
    updateMessage,
  };
}
