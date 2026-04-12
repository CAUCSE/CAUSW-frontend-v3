import type {
  AuthResponseDto,
  SocialLoginAdditionalInfoRequestDto,
} from '@/entities/auth';

import { API } from '@/shared/api';

const USER_API_PREFIX = '/api/v2/users';

export const completeSocialRegistration = async (
  data: SocialLoginAdditionalInfoRequestDto,
) => {
  return API.patch<AuthResponseDto>(`${USER_API_PREFIX}/me/registration`, data);
};
