import { getPlatform } from '@/shared/config';

import { compareSemver } from './compareVersion';
import { fetchMinVersion } from './fetchMinVersion';
import { getAppVersion } from './getAppVersion';

export interface ForceUpdateResult {
  needUpdate: boolean;
  currentVersion: string;
  currentBuild: string;
  minimumVersion: string;
  storeUrlApp: string;
  storeUrlWeb: string;
  updateMessage: string;
}

export async function checkForceUpdate(): Promise<ForceUpdateResult> {
  const platform = getPlatform();

  if (platform === 'web') {
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

  const remoteConfig = await fetchMinVersion(platform);

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

  return result;
}
