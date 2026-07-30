import { Capacitor } from '@capacitor/core';

import { ENVIRONMENT } from '@/shared/config';

export const isClient = typeof window !== 'undefined';
export const isServer = typeof window === 'undefined';

export type Platform = 'ios' | 'android' | 'web';

const PATTERNS = [
  /KAKAOTALK/i,
  /Instagram/i,
  /FBAN|FBAV/,
  /NAVER\(inapp/i,
  /Line\//,
  /DaumApps/i,
];
export function detectInAppBrowser(userAgent: string) {
  const isKakao = /KAKAOTALK/i.test(userAgent);
  const isAny = PATTERNS.some((p) => p.test(userAgent));
  return { isInAppBrowser: isAny, isKakao };
}

export const getPlatform = (): Platform => {
  if (!isClient) return 'web'; // 서버에서는 web으로 간주
  return Capacitor.getPlatform() as Platform;
};

export const isMobile = isClient && Capacitor.isNativePlatform();

export const isIOS = isClient && getPlatform() === 'ios';
export const isAndroid = isClient && getPlatform() === 'android';
export const isWeb = isClient && !isMobile;

export const isDevelopment = ENVIRONMENT !== 'production';
export const isProduction = ENVIRONMENT == 'production';
