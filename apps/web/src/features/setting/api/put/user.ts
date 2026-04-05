import type { NicknameChangeRequest } from '@/entities/setting';

import { API } from '@/shared/api';

const USER_API_PREFIX = '/api/v2/users';

export const changeMyNickname = async (data: NicknameChangeRequest) => {
  return API.put<null>(`${USER_API_PREFIX}/me/nickname`, data);
};
