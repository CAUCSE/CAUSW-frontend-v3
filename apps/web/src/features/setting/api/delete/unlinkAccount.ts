import { API } from '@/shared/api';

import type { NativeSocialLoginProvider } from '../../../../entities/auth/model/types';

export const unlinkAccount = async (provider: NativeSocialLoginProvider) => {
  return API.delete<null>(`/api/v2/users/me/social-accounts/${provider}`);
};
