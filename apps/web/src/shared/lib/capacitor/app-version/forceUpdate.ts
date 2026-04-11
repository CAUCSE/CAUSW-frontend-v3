import { Capacitor } from '@capacitor/core';

import type { UpdateEnv } from '@/shared/config';

import { compareSemver } from './compareVersion';
import { fetchMinVersion } from './fetchMinVersion';
import { getAppVersion } from './getVersion';

export interface ForceUpdateResult {
  needUpdate: boolean;
  currentVersion: string;
  currentBuild: string;
  minimumVersion: string;
  storeUrlApp: string;
  storeUrlWeb: string;
  updateMessage: string;
}

function getPlatform(): 'ios' | 'android' | 'web' {
  return Capacitor.getPlatform() as 'ios' | 'android' | 'web';
}

export async function checkForceUpdate(
  env: UpdateEnv,
): Promise<ForceUpdateResult> {
  const platform = getPlatform();

  if (platform === 'web') {
    console.log('[ForceUpdateCheck] skipped on web');

    return {
      needUpdate: false,
      currentVersion: '0.0.0',
      currentBuild: '0',
      minimumVersion: '0.0.0',
      storeUrlApp: '',
      storeUrlWeb: '',
      updateMessage: '',
    };
  }

  const appInfo = await getAppVersion();

  console.log(
    'App Version Info:',
    JSON.stringify(
      {
        name: appInfo.name,
        id: appInfo.id,
        build: appInfo.build,
        version: appInfo.version,
      },
      null,
      2,
    ),
  );

  const remoteConfig = await fetchMinVersion(env, platform);

  console.log(
    '[RemoteConfig]',
    JSON.stringify(
      {
        env,
        platform,
        ...remoteConfig,
      },
      null,
      2,
    ),
  );

  const needUpdate =
    remoteConfig.forceUpdateEnabled &&
    compareSemver(appInfo.version, remoteConfig.minimumVersion) < 0;

  const result: ForceUpdateResult = {
    needUpdate,
    currentVersion: appInfo.version,
    currentBuild: appInfo.build,
    minimumVersion: remoteConfig.minimumVersion,
    storeUrlApp: remoteConfig.storeUrlApp,
    storeUrlWeb: remoteConfig.storeUrlWeb,
    updateMessage: remoteConfig.updateMessage,
  };

  console.log(
    '[ForceUpdateCheck]',
    JSON.stringify(
      {
        env,
        platform,
        ...result,
      },
      null,
      2,
    ),
  );

  return result;
}
