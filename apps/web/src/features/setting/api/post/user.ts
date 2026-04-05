import { type PasswordChangeRequest } from '@/entities/setting';

import { API } from '@/shared/api';

const USER_API_PREFIX = '/api/v2/users';

export const changeMyPassword = async (data: PasswordChangeRequest) => {
  return API.post<null>(`${USER_API_PREFIX}/me/password-change`, data);
};
