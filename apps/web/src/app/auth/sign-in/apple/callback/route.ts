import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const formData = await request.formData();
  const code = formData.get('code');
  const state = formData.get('state');
  const error = formData.get('error');

  const redirectUrl = new URL('/auth/sign-in/apple', request.url);

  if (typeof code === 'string' && code.length > 0) {
    redirectUrl.searchParams.set('code', code);
  }
  if (typeof state === 'string' && state.length > 0) {
    redirectUrl.searchParams.set('state', state);
  }
  if (typeof error === 'string' && error.length > 0) {
    redirectUrl.searchParams.set('error', error);
  }

  return NextResponse.redirect(redirectUrl);
}
