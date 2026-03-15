import { BASE_URL } from '@/shared/config';
import { DefaultResponseField } from '@/shared/types';
import { isMobile, isServer } from '@/shared/utils';

import {
  getClientATK,
  getClientRTK,
  removeClientATK,
  removeClientRTK,
  setClientATK,
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
} from './auth-storage.server';

export class TokenManager {
  // Access Token 재발급
  static async refreshAccessToken(): Promise<string> {
    const response = await fetch(`${BASE_URL}/api/v2/auth/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${await TokenManager.getAccessToken()}`,
        Cookie: `refresh_token=${await TokenManager.getRefreshToken()}`,
      },
      credentials: 'include',
    });

    const data: DefaultResponseField<{
      accessToken: string;
      refreshToken: string;
    }> = await response.json();

    if (!data.data?.accessToken) {
      throw new Error('No AccessToken');
    }

    return data.data.accessToken;
  }

  // Access Token
  static async getAccessToken(): Promise<string> {
    if (isServer) {
      return await getServerATK();
    } else if (isMobile) {
      return await getNativeATK();
    } else {
      return getClientATK();
    }
  }

  static async setAccessToken(token: string): Promise<void> {
    if (isServer) {
      return await setServerATK(token);
    } else if (isMobile) {
      return await setNativeATK(token);
    } else {
      return setClientATK(token);
    }
  }

  static async removeAccessToken(): Promise<void> {
    if (isServer) {
      await removeServerATK();
    } else if (isMobile) {
      await removeNativeATK();
    } else {
      removeClientATK();
    }
  }

  // Refresh Token
  static async getRefreshToken(): Promise<string> {
    if (isServer) {
      return await getServerRTK();
    } else if (isMobile) {
      return await getNativeRTK();
    } else {
      return getClientRTK();
    }
  }

  /**
   * @description 모바일 환경에서는 쿠키가 유실될 수 있기 때문에(백그라운드 종료) 서버에서 세팅해준 refresh_token을 security Storage로 옮기는 작업을 합니다.
   */
  static async setRefreshToken(): Promise<void> {
    if (isMobile) {
      const refreshToken = getClientRTK();
      //삭제!!
      console.log('client RTK:', getClientRTK());
      console.log('document.cookie', document.cookie);
      await setNativeRTK(refreshToken);
    }
  }

  static async removeRefreshToken(): Promise<void> {
    if (isServer) {
      await removeServerRTK();
    } else if (isMobile) {
      await removeNativeRTK();
    } else {
      removeClientRTK();
    }
  }
}
