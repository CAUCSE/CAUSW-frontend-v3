import { API } from '@/shared/api';

import type {
  LockerLocationDetailResponse,
  LockerLocationsResponse,
  LockerMyResponse,
  LockerPeriodStatusResponse,
} from '../model/types';

const URL_PREFIX = '/api/v2/lockers';

export const getLockerPeriodStatus = async () => {
  return await API.get<LockerPeriodStatusResponse>(
    `${URL_PREFIX}/period-status`,
  );
};

export const getMyLocker = async () => {
  return await API.get<LockerMyResponse>(`${URL_PREFIX}/me`);
};

export const getLockerLocations = async () => {
  return await API.get<LockerLocationsResponse>(`${URL_PREFIX}/locations`);
};

export const getLockerLocationDetail = async (locationId: string) => {
  return await API.get<LockerLocationDetailResponse>(
    `${URL_PREFIX}/locations/${locationId}`,
  );
};
