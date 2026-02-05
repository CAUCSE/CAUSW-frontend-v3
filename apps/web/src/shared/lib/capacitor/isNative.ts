import { Capacitor } from '@capacitor/core';

export type Platform = 'ios' | 'android' | 'web';

const platform = Capacitor.getPlatform() as Platform;

export const getPlatform = (): Platform => platform;

/** 네이티브 앱(= Capacitor iOS/Android)인지 */
export const isNative = (): boolean => Capacitor.isNativePlatform();

/** iOS(아이폰/아이패드 포함)인지 */
export const isIOS = (): boolean => platform === 'ios';

/** Android인지 */
export const isAndroid = (): boolean => platform === 'android';

/** 웹인지 (모바일 웹 포함) */
export const isWeb = (): boolean => platform === 'web';
