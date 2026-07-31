import { API } from '@/shared/api';

import type { NativeSocialLoginProvider } from '../model/types';

export const unlinkSocialAccount = async (
  provider: NativeSocialLoginProvider,
) => {
  return API.delete<null>(`/api/v2/users/me/social-accounts/${provider}`);
};
