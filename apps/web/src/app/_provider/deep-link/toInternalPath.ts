import { safeCallbackUrl } from '@/shared/lib';

const ALLOWED_HOSTS = new Set([
  'www.causw.co.kr',
  'causw.co.kr',
  'dev.causw.co.kr',
]);

export const toInternalPath = (rawUrl: string): string | null => {
  try {
    const url = new URL(rawUrl);

    if (url.protocol === 'https:' && ALLOWED_HOSTS.has(url.hostname)) {
      return safeCallbackUrl(`${url.pathname}${url.search}`);
    }

    if (url.protocol === 'causw:') {
      return safeCallbackUrl(`${url.pathname}${url.search}`);
    }
  } catch {
    return null;
  }

  return null;
};
