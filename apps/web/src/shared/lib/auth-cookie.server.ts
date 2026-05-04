import type { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies';

import { SESSION_COOKIE_EXPIRES_DAYS } from '@/shared/config';
import { TIME } from '@/shared/constants';

export const buildServerCookieOptions = (
  isPersistent: boolean,
): Partial<ResponseCookie> | undefined => {
  if (!isPersistent) {
    return undefined;
  }

  return {
    expires: new Date(Date.now() + SESSION_COOKIE_EXPIRES_DAYS * TIME.DAY),
  };
};
