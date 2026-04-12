import { type PasswordChangeRequest } from '@/entities/setting';

import { API } from '@/shared/api';
import { USER_API_PREFIX } from '@/shared/constants';

export const changeMyPassword = async (data: PasswordChangeRequest) => {
  return API.post(`${USER_API_PREFIX}/me/password-change`, data);
};
