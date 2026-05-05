import { API } from '@/shared/api';
import { USER_API_PREFIX } from '@/shared/constants';

import { type UserMeAccountResponse } from '../model/types';

export const getMyAccount = async () => {
  return API.get<UserMeAccountResponse>(`${USER_API_PREFIX}/me/account`);
};
