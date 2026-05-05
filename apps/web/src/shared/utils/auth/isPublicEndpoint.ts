import { PUBLIC_ENDPOINTS } from '@/shared/constants/auth/publicEndpoints';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

const normalizePath = (url: string): string => {
  try {
    return new URL(url).pathname;
  } catch {
    return url.split('?')[0];
  }
};

export const isPublicEndpoint = (url: string, method?: string): boolean => {
  const normalizedPath = normalizePath(url);
  const upperMethod = (method ?? 'GET').toUpperCase() as HttpMethod;

  return PUBLIC_ENDPOINTS.some(
    (endpoint) =>
      endpoint.method === upperMethod && endpoint.path === normalizedPath,
  );
};
