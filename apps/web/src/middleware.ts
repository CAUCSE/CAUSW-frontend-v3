import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { TokenManager } from './shared/storage';

export async function middleware(request: NextRequest) {
  // TODO: 실제 경로 맞춰서 세분화
  const privateRoutes = ['/home', '/board', '/contacts', '/user'];
  const accessToken = await TokenManager.getAccessToken();

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
