import { type NativeSocialLoginProvider } from '@/entities/auth';

import { BASE_URL, ENVIRONMENT } from '@/shared/config';

interface GetSocialOauthUrlOptions {
  linkToken?: string;
}

export const getSocialOauthUrl = (
  provider: NativeSocialLoginProvider,
  options?: GetSocialOauthUrlOptions,
) => {
  const oauthUrl = new URL(`${BASE_URL}/oauth2/authorization/${provider}`);

  if (ENVIRONMENT === 'local') {
    oauthUrl.searchParams.set('env', 'local');
  }

  if (ENVIRONMENT === 'development') {
    oauthUrl.searchParams.set('env', 'dev');
  }

  if (options?.linkToken) {
    oauthUrl.searchParams.set('linkToken', options.linkToken);
  }

  return oauthUrl.toString();
};
