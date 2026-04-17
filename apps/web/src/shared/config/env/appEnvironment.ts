import { Capacitor } from '@capacitor/core';

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
