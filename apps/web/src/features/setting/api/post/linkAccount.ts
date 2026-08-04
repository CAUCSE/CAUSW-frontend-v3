import { API } from '@/shared/api';

import type {
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
