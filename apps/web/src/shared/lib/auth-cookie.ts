import { SESSION_COOKIE_EXPIRES_DAYS } from '@/shared/config';

export const buildClientCookieOptions = (
  isPersistent: boolean,
): Cookies.CookieAttributes | undefined => {
  if (!isPersistent) {
    return undefined;
  }

  return {
    expires: SESSION_COOKIE_EXPIRES_DAYS,
  };
};
