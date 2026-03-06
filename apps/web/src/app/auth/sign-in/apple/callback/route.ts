import { NextResponse } from 'next/server';

function buildRedirectUrl(requestUrl: string) {
  return new URL('/auth/sign-in/apple', requestUrl);
}

function redirectToAppleSignIn(redirectUrl: URL) {
  // POST callback 이후에는 반드시 GET으로 전환되어야 405를 피할 수 있음
  return NextResponse.redirect(redirectUrl, { status: 303 });
}

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const state = requestUrl.searchParams.get('state');
  const error = requestUrl.searchParams.get('error');

  const redirectUrl = buildRedirectUrl(request.url);

  if (typeof code === 'string' && code.length > 0) {
    redirectUrl.searchParams.set('code', code);
  }
  if (typeof state === 'string' && state.length > 0) {
    redirectUrl.searchParams.set('state', state);
  }
  if (typeof error === 'string' && error.length > 0) {
    redirectUrl.searchParams.set('error', error);
  }

  return redirectToAppleSignIn(redirectUrl);
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const code = formData.get('code');
  const state = formData.get('state');
  const error = formData.get('error');

  const redirectUrl = buildRedirectUrl(request.url);

  if (typeof code === 'string' && code.length > 0) {
    redirectUrl.searchParams.set('code', code);
  }
  if (typeof state === 'string' && state.length > 0) {
    redirectUrl.searchParams.set('state', state);
  }
  if (typeof error === 'string' && error.length > 0) {
    redirectUrl.searchParams.set('error', error);
  }

  return redirectToAppleSignIn(redirectUrl);
}
