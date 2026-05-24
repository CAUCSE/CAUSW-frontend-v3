type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
import { AUTH_API_PREFIX, USER_API_PREFIX } from '../urls/api-prefix';

export type PublicEndpoint = {
  method: HttpMethod;
  path: string;
};

export const PUBLIC_ENDPOINTS: PublicEndpoint[] = [
  { method: 'POST', path: `${AUTH_API_PREFIX}/login` },
  { method: 'POST', path: `${AUTH_API_PREFIX}/signup` },
  { method: 'POST', path: `${AUTH_API_PREFIX}/email/send` },
  { method: 'POST', path: `${AUTH_API_PREFIX}/email/verify` },
  { method: 'POST', path: `${AUTH_API_PREFIX}/find-email` },
  { method: 'POST', path: `${AUTH_API_PREFIX}/password-reset/send` },
  { method: 'POST', path: `${AUTH_API_PREFIX}/password-reset/verify` },
  { method: 'POST', path: `${USER_API_PREFIX}/password-change` },
  { method: 'POST', path: `${AUTH_API_PREFIX}/login/native` },
  { method: 'GET', path: '/api/v2/terms' },
  { method: 'GET', path: `${USER_API_PREFIX}/check-nickname` },
  { method: 'GET', path: `${USER_API_PREFIX}/check-phone` },
];
