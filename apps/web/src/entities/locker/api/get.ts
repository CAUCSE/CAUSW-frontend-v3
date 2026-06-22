import { API } from '@/shared/api';

import { LOCKER_API_PREFIX } from '../config';
import type {
  GetLockerAppicationPeriodResponseDto,
  GetLockerLocationsResponseDto,
  GetMyLockerResponseDto,
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

export const getLockerApplicationPeriod = async () => {
  const data = await API.get<GetLockerAppicationPeriodResponseDto>(
    `${LOCKER_API_PREFIX}/period-status`,
  );

  return data;
};
