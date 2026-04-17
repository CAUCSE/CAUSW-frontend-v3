import { BASE_URL, isMobile, isServer } from '@/shared/config';
import { AUTH_API_PREFIX } from '@/shared/constants';

// eslint-disable-next-line
import type { AuthResponseDto } from '@/entities/auth';
import { type DefaultResponseField } from '@/shared/types';

import {
  getClientATK,
  getClientAuthRefreshed,
  getClientRTK,
  removeClientATK,
  removeClientAuthRefreshed,
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
  setServerAuthRefreshed,
  setServerATK,
} from './auth-storage.server';

export class TokenManager {
  // Access Token 재발급
  static async refreshAuth(): Promise<AuthResponseDto> {
    const response = await fetch(`${BASE_URL}/${AUTH_API_PREFIX}/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer any-token`,
      },
      credentials: 'include',
    });

    const data: DefaultResponseField<AuthResponseDto> = await response.json();

    if (!data.data?.accessToken) {
      throw new Error('No AccessToken');
    }

    return data.data;
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

      if (!refreshToken) {
        return;
      }
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

  static async setAuthRefreshed(): Promise<void> {
    if (isServer) {
      await setServerAuthRefreshed();
    }
  }

  static async getAuthRefreshed(): Promise<boolean> {
    return getClientAuthRefreshed();
  }

  static async removeAuthRefreshed(): Promise<void> {
    removeClientAuthRefreshed();
  }
}
