import { Capacitor } from '@capacitor/core';

export type RawAppEnv = 'local-dev' | 'local-prod' | 'dev' | 'prod';
export type UpdateEnv = 'dev' | 'prod';

export const isClient = typeof window !== 'undefined';
export const isServer = typeof window === 'undefined';

export type Platform = 'ios' | 'android' | 'web';

export const getPlatform = (): Platform => {
  if (!isClient) return 'web'; // 서버에서는 web으로 간주
  return Capacitor.getPlatform() as Platform;
};

export const isMobile = isClient && Capacitor.isNativePlatform();

export const isIOS = isClient && getPlatform() === 'ios';
export const isAndroid = isClient && getPlatform() === 'android';
export const isWeb = isClient && !isMobile;

export function getRawAppEnv(): RawAppEnv {
  const env = process.env.NEXT_PUBLIC_APP_ENV as RawAppEnv | undefined;

  switch (env) {
    case 'local-dev':
    case 'local-prod':
    case 'dev':
    case 'prod':
      return env;
    default:
      return 'local-dev';
  }
}

export function getUpdateEnv(): UpdateEnv {
  const rawEnv = getRawAppEnv();

  switch (rawEnv) {
    case 'local-dev':
    case 'dev':
      return 'dev';

    case 'local-prod':
    case 'prod':
      return 'prod';

    default:
      return 'dev';
  }
}
