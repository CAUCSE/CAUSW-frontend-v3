import { NextResponse, userAgent } from 'next/server';
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

  if (pathname === '/') {
    return NextResponse.redirect(new URL('/auth/sign-in', request.url));
  }

  if (isAuthRoute(pathname)) {
    return NextResponse.next();
  }

  const accessToken = request.cookies.get(STORAGE_ACCESS_KEY)?.value ?? '';
  const refreshToken = request.cookies.get(STORAGE_REFRESH_KEY)?.value ?? '';

  const { device } = userAgent(request);
  const cookieOptions = await AuthOptionManager.getCookieOptionsInMiddleware(request);

  //  기기 타입이 모바일(또는 태블릿)이면 토큰 검사 없이 바로 통과
  if (device.type === 'mobile' || device.type === 'tablet') {
    return NextResponse.next();
  }
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
      await AuthOptionManager.refreshSessionPersistInMiddleware(response, request);
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
