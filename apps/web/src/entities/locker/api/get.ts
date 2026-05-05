import { API } from '@/shared/api';

import { LOCKER_API_URL_PREFIX } from '../config';
import type {
  LockerLocationDetailResponse,
  LockerLocationsResponse,
  LockerMyResponse,
  LockerPeriodStatusResponse,
} from '../types';

export const getLockerPeriodStatus = async () => {
  return await API.get<LockerPeriodStatusResponse>(
    `${LOCKER_API_URL_PREFIX}/period-status`,
  );
};

export const getMyLocker = async () => {
  return await API.get<LockerMyResponse>(`${LOCKER_API_URL_PREFIX}/me`);
};

export const getLockerLocations = async () => {
  return await API.get<LockerLocationsResponse>(
    `${LOCKER_API_URL_PREFIX}/locations`,
  );
};

export const getLockerLocationDetail = async (locationId: string) => {
  return await API.get<LockerLocationDetailResponse>(
    `${LOCKER_API_URL_PREFIX}/locations/${locationId}`,
  );
};
