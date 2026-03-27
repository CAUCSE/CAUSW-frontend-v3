type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export type PublicEndpoint = {
  method: HttpMethod;
  path: string;
};

export const PUBLIC_ENDPOINTS: PublicEndpoint[] = [
  { method: 'POST', path: '/api/v2/auth/login' },
  { method: 'POST', path: '/api/v2/auth/signup' },
  { method: 'POST', path: '/api/v2/auth/email/send' },
  { method: 'POST', path: '/api/v2/auth/email/verify' },
];
