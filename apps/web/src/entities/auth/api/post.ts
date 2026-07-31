import { API } from '@/shared/api';

import type {
  NativeSocialAccountLinkRequestDto,
  NativeSocialLoginProvider,
  SocialAccountOAuthInitResponseDto,
} from '../model/types';

export const linkNativeSocialAccount = async (
  body: NativeSocialAccountLinkRequestDto,
) => {
  return API.post<null>('/api/v2/users/me/social-accounts/native', body);
};

export const initSocialAccountOAuth = async (
  provider: NativeSocialLoginProvider,
) => {
  return API.post<SocialAccountOAuthInitResponseDto>(
    `/api/v2/users/me/social-accounts/${provider}/oauth`,
  );
};
