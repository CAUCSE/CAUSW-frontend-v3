import { getPlatform, type UpdateEnv } from '@/shared/config';

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

export async function checkForceUpdate(
  env: UpdateEnv,
): Promise<ForceUpdateResult> {
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
  //TODO : prod올리기 전에 삭제
  console.log(
    'App Version Info-force:',
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
