import { App } from '@capacitor/app';

export interface AppVersionInfo {
  version: string;
  build: string;
  id: string;
  name: string;
}

export async function getAppVersion(): Promise<AppVersionInfo> {
  const info = await App.getInfo();
  //TODO : prod올리기 전에 삭제
  console.log('App Version Info-get:', info, JSON.stringify(info, null, 2));
  return {
    version: info.version,
    build: info.build,
    id: info.id,
    name: info.name,
  };
}
