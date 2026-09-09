import { ROUTES } from '@/shared/constants';

const ALLOWED_PREFIXES = Object.values(ROUTES);

export const safeCallbackUrl = (raw: string | null | undefined): string => {
  if (!raw) return '/home';

  let value = raw;
  for (let index = 0; index < 2; index += 1) {
    try {
      value = decodeURIComponent(value);
    } catch {
      return '/home';
    }
  }

  if (
    !value.startsWith('/') ||
    value.startsWith('//') ||
    value.includes('\\') ||
    /[\r\n]/.test(value) ||
    value.startsWith('/auth')
  ) {
    return '/home';
  }

  return ALLOWED_PREFIXES.some((prefix) => value.startsWith(prefix))
    ? value
    : '/home';
};
