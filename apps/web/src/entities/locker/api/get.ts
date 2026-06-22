import { API } from '@/shared/api';

import { LOCKER_API_PREFIX } from '../config';
import { type GetMyLockerResponseDto } from '../types';

export const getMyLocker = async () => {
  const data = await API.get<GetMyLockerResponseDto>(`${LOCKER_API_PREFIX}/me`);

  return data;
};
