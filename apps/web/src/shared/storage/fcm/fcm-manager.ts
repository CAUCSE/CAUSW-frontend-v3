import { isMobile, isServer } from '@/shared/utils';

import { getClientFCM, setClientFCM, removeClientFCM } from './fcm-storage';
import {
  getNativeFCM,
  setNativeFCM,
  removeNativeFCM,
} from './fcm-storage.mobile';

export class FcmTokenManager {
  static async get(): Promise<string> {
    if (isServer) return '';
    if (isMobile) return await getNativeFCM();
    return getClientFCM();
  }

  static async set(token: string): Promise<void> {
    if (isServer) return;
    if (isMobile) return await setNativeFCM(token);
    setClientFCM(token);
  }

  static async remove(): Promise<void> {
    if (isServer) return;
    if (isMobile) return await removeNativeFCM();
    removeClientFCM();
  }
}
