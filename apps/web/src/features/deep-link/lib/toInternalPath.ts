import { safeCallbackUrl } from '@/shared/lib';

const ALLOWED_HOSTS = new Set(
  (process.env.NEXT_PUBLIC_DEEP_LINK_ALLOWED_HOSTS ?? '')
    .split(',')
    .map((host) => host.trim().toLowerCase())
    .filter(Boolean),
);

export const toInternalPath = (rawUrl: string): string | null => {
  try {
    const url = new URL(rawUrl);

    if (
      url.protocol === 'https:' &&
      ALLOWED_HOSTS.has(url.hostname.toLowerCase())
    ) {
      return safeCallbackUrl(`${url.pathname}${url.search}`);
    }

    if (url.protocol === 'causw:') {
      return safeCallbackUrl(`/${url.host}${url.pathname}${url.search}`);
    }
  } catch {
    return null;
  }

  return null;
};
