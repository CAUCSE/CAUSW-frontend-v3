import type { NicknameChangeRequest } from '@/entities/setting';

import { API } from '@/shared/api';
import { USER_API_PREFIX } from '@/shared/constants';

export const changeMyNickname = async (data: NicknameChangeRequest) => {
  return API.put<null>(`${USER_API_PREFIX}/me/nickname`, data);
};
