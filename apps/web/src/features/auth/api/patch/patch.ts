import type { SocialRegistrationRequestDto } from '@/entities/auth';

import { API } from '@/shared/api';

const USER_API_PREFIX = '/api/v2/users';

export const registerSocialUser = async (
  data: SocialRegistrationRequestDto,
) => {
  return API.patch<null>(`${USER_API_PREFIX}/me/registration`, data);
};
