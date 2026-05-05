import { type NativeSocialLoginProvider } from '@/entities/auth';

import { BASE_URL, ENVIRONMENT } from '@/shared/config';

export const getSocialOauthUrl = (provider: NativeSocialLoginProvider) => {
  const oauthUrl = new URL(`${BASE_URL}/oauth2/authorization/${provider}`);

  if (ENVIRONMENT === 'local') {
    oauthUrl.searchParams.set('env', 'local');
  }

  if (ENVIRONMENT === 'development') {
    oauthUrl.searchParams.set('env', 'dev');
  }

  return oauthUrl.toString();
};
