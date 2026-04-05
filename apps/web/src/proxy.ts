import { NextResponse, userAgent } from 'next/server';
import type { NextRequest } from 'next/server';

import { TokenManager } from './shared/storage';

export async function proxy(request: NextRequest) {
  if (request.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/auth/sign-in', request.url));
  }

  // TODO: 실제 경로 맞춰서 세분화
  const privateRoutes = ['/home', '/feed', '/contacts', '/user'];
  const accessToken = await TokenManager.getAccessToken();
  const { device } = userAgent(request);

  //  기기 타입이 모바일(또는 태블릿)이면 토큰 검사 없이 바로 통과
  if (device.type === 'mobile' || device.type === 'tablet') {
    return NextResponse.next();
  }
  if (!accessToken) {
    if (
      privateRoutes.some((route) => request.nextUrl.pathname.startsWith(route))
    ) {
      return NextResponse.redirect(new URL('/auth/sign-in', request.url));
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}
