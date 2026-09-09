import { API } from '@/shared/api';

import type {
  NativeSocialAccountLinkRequestDto,
  NativeSocialLoginProvider,
  SocialAccountOAuthInitResponseDto,
} from '../../../../entities/auth/model/types';

export const initSocialAccountOAuth = async (
  provider: NativeSocialLoginProvider,
) => {
  return API.post<SocialAccountOAuthInitResponseDto>(
    `/api/v2/users/me/social-accounts/${provider}/oauth`,
  );
};

export const linkSocialAccountNative = async (
  data: NativeSocialAccountLinkRequestDto,
) => {
  return API.post<null>('/api/v2/users/me/social-accounts/native', data);
};
