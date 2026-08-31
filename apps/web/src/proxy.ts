import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import {
  STORAGE_ACCESS_KEY,
  STORAGE_REFRESH_KEY,
  STORAGE_AUTH_REFRESHED_KEY,
  AUTH_REFRESHED_STORAGE_VALUE,
} from './shared/config';
import { AuthOptionManager, TokenManager } from './shared/storage';
import { isAuthRoute, shouldRefreshAccessToken } from './shared/utils';

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'],
};

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get(STORAGE_ACCESS_KEY)?.value ?? '';
  const refreshToken = request.cookies.get(STORAGE_REFRESH_KEY)?.value ?? '';
  const isCapacitor =
    request.headers.get('user-agent')?.includes('CAUSWCapacitor') ?? false;

  if (pathname === '/') {
    if (accessToken || refreshToken) {
      return NextResponse.redirect(new URL('/home', request.url));
    }

    // Capacitor 앱은 기존 루트 진입 흐름을 유지한다.
    if (isCapacitor) {
      return NextResponse.redirect(new URL('/auth/sign-in', request.url));
    }

    // 비로그인 웹 사용자는 랜딩 페이지에 접근한다.
    return NextResponse.next();
  }

  if (isAuthRoute(pathname)) {
    return NextResponse.next();
  }
  const cookieOptions =
    await AuthOptionManager.getCookieOptionsInMiddleware(request);

  if (!accessToken && !refreshToken) {
    return NextResponse.redirect(new URL('/auth/sign-in', request.url));
  }

  if (refreshToken && (!accessToken || shouldRefreshAccessToken(accessToken))) {
    try {
      const refreshedAuth = await TokenManager.refreshAuth(refreshToken);

      const response = NextResponse.next();
      response.cookies.set(
        STORAGE_ACCESS_KEY,
        refreshedAuth.accessToken,
        cookieOptions,
      );
      response.cookies.set(
        STORAGE_REFRESH_KEY,
        refreshedAuth.refreshToken,
        cookieOptions,
      );
      await AuthOptionManager.refreshSessionPersistInMiddleware(
        response,
        request,
      );
      response.cookies.set(
        STORAGE_AUTH_REFRESHED_KEY,
        AUTH_REFRESHED_STORAGE_VALUE,
      );
      return response;
    } catch {
      return NextResponse.redirect(new URL('/auth/sign-in', request.url));
    }
  }

  return NextResponse.next();
}
