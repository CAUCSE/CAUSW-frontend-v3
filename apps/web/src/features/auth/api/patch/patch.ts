import type {
  AuthResponseDto,
  SocialLoginAdditionalInfoRequestDto,
} from '@/entities/auth';

import { API } from '@/shared/api';
import { TokenManager } from '@/shared/storage';

const USER_API_PREFIX = '/api/v2/users';

export const completeSocialRegistration = async (
  data: SocialLoginAdditionalInfoRequestDto,
) => {
  const refreshToken = await TokenManager.getRefreshToken();

  return API.patch<AuthResponseDto>(
    `${USER_API_PREFIX}/me/registration`,
    data,
    {
      headers: {
        'Refresh-Authorization': `Bearer ${refreshToken}`,
      },
    },
  );
};
