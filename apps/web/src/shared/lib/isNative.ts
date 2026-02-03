import { Capacitor } from '@capacitor/core';

export type Platform = 'ios' | 'android' | 'web';

export const getPlatform = (): Platform => {
  return Capacitor.getPlatform() as Platform;
};

/** 네이티브 앱(= Capacitor iOS/Android)인지 */
export const isNative = (): boolean => Capacitor.isNativePlatform();

/** iOS(아이폰/아이패드 포함)인지 */
export const isIOS = (): boolean => getPlatform() === 'ios';

/** Android인지 */
export const isAndroid = (): boolean => getPlatform() === 'android';

/** 웹인지 (모바일 웹 포함) */
export const isWeb = (): boolean => getPlatform() === 'web';
