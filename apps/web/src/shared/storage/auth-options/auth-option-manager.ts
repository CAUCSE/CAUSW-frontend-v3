import type { NextRequest, NextResponse } from 'next/server';

import { STORAGE_SESSION_PERSIST_KEY } from '@/shared/config';
import { TOGGLE_VALUE } from '@/shared/constants';
import {
  buildClientCookieOptions,
  buildServerCookieOptions,
} from '@/shared/lib';
import { isServer } from '@/shared/utils';

import {
  getClientSessionPersist,
  removeClientSessionPersist,
  setClientSessionPersist,
} from './auth-option-storage';
import { getServerSessionPersist } from './auth-option-storage.server';

export class AuthOptionManager {
  static async setSessionPersist(persist: boolean): Promise<void> {
    if (!isServer) {
      setClientSessionPersist(persist);
    }
  }

  static async getSessionPersist(): Promise<boolean> {
    if (isServer) {
      return await getServerSessionPersist();
    }

    return getClientSessionPersist();
  }

  static async removeSessionPersist(): Promise<void> {
    if (!isServer) {
      removeClientSessionPersist();
    }
  }

  static getSessionPersistInMiddleware(request: Pick<NextRequest, 'cookies'>) {
    return (
      request.cookies.get(STORAGE_SESSION_PERSIST_KEY)?.value ===
      TOGGLE_VALUE.ON
    );
  }

  static async getClientCookieOptions(sessionPersist?: boolean) {
    const isPersistent =
      sessionPersist === undefined
        ? await this.getSessionPersist()
        : sessionPersist;

    return buildClientCookieOptions(isPersistent);
  }

  static async getServerCookieOptions(sessionPersist?: boolean) {
    const isPersistent =
      sessionPersist === undefined
        ? await this.getSessionPersist()
        : sessionPersist;

    return buildServerCookieOptions(isPersistent);
  }

  static async getCookieOptionsInMiddleware(
    request: Pick<NextRequest, 'cookies'>,
  ) {
    return this.getServerCookieOptions(
      this.getSessionPersistInMiddleware(request),
    );
  }

  static async refreshSessionPersist(): Promise<void> {
    if (isServer) {
      return;
    }

    const persist = await this.getSessionPersist();
    setClientSessionPersist(persist);
  }

  static async refreshSessionPersistInMiddleware(
    response: Pick<NextResponse, 'cookies'>,
    request: Pick<NextRequest, 'cookies'>,
  ): Promise<void> {
    const persist = this.getSessionPersistInMiddleware(request);

    response.cookies.set(
      STORAGE_SESSION_PERSIST_KEY,
      persist ? TOGGLE_VALUE.ON : TOGGLE_VALUE.OFF,
      await this.getServerCookieOptions(persist),
    );
  }
}
