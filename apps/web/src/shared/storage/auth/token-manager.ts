import { isMobile, isServer } from '@/shared/utils';

import {
  getClientATK,
  getClientRTK,
  removeClientATK,
  removeClientRTK,
  setClientATK,
  setClientRTK,
} from './auth-storage';
import {
  getNativeATK,
  getNativeRTK,
  removeNativeATK,
  removeNativeRTK,
  setNativeATK,
  setNativeRTK,
} from './auth-storage.mobile';
import {
  getServerATK,
  getServerRTK,
  removeServerATK,
  removeServerRTK,
  setServerATK,
  setServerRTK,
} from './auth-storage.server';

export class TokenManager {
  // Access Token
  static async getAccessToken(): Promise<string> {
    if (isServer) {
      return await getServerATK();
    } else if (isMobile) {
      return getNativeATK();
    } else {
      return getClientATK();
    }
  }

  static async setAccessToken(token: string): Promise<void> {
    if (isServer) {
      return await setServerATK(token);
    } else if (isMobile) {
      setNativeATK(token);
    } else {
      return setClientATK(token);
    }
  }

  static async removeAccessToken(): Promise<void> {
    if (isServer) {
      await removeServerATK();
    } else if (isMobile) {
      removeNativeATK();
    } else {
      removeClientATK();
    }
  }

  // Refresh Token
  static async getRefreshToken(): Promise<string> {
    if (isServer) {
      return await getServerRTK();
    } else if (isMobile) {
      return getNativeRTK();
    } else {
      return getClientRTK();
    }
  }

  static async setRefreshToken(token: string): Promise<void> {
    if (isServer) {
      await setServerRTK(token);
    } else if (isMobile) {
      setNativeRTK(token);
    } else {
      setClientRTK(token);
    }
  }

  static async removeRefreshToken(): Promise<void> {
    if (isServer) {
      await removeServerRTK();
    } else if (isMobile) {
      removeNativeRTK();
    } else {
      removeClientRTK();
    }
  }
}
