import { App } from '@capacitor/app';

export interface AppVersionInfo {
  version: string;
  build: string;
  id: string;
  name: string;
}

export async function getAppVersion(): Promise<AppVersionInfo> {
  const info = await App.getInfo();
  console.log('App Version Info:', info, JSON.stringify(info, null, 2)); // 여기 :
  return {
    version: info.version,
    build: info.build,
    id: info.id,
    name: info.name,
  };
}
