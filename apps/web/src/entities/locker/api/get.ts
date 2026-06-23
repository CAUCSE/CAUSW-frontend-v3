import { API } from '@/shared/api';

import { LOCKER_API_PREFIX } from '../config';
import type {
  GetLockerAppicationPeriodResponseDto,
  GetLockerLocationParam,
  GetLockerLocationResponseDto,
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

export const getLockerLocation = async (param: GetLockerLocationParam) => {
  const { locationId } = param;

  const data = await API.get<GetLockerLocationResponseDto>(
    `${LOCKER_API_PREFIX}/locations/${locationId}`,
  );

  return data;
};
