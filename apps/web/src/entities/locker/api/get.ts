import { API } from '@/shared/api';

import { LOCKER_API_PREFIX } from '../config';
import {
  type GetLockerLocationsResponseDto,
  type GetMyLockerResponseDto,
} from '../types';

export const getMyLocker = async () => {
  const data = await API.get<GetMyLockerResponseDto>(`${LOCKER_API_PREFIX}/me`);

  return data;
};

export const getLockerLocations = async () => {
  const data = await API.get<GetLockerLocationsResponseDto>(
    `${LOCKER_API_PREFIX}/locations`,
  );

  return data;
};
