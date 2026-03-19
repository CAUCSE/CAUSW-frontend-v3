import { API } from '@/shared/api';
import type { DefaultResponseField } from '@/shared/types';

const URL_PREFIX = '/api/v2/lockers';

export const createLockerRegistration = async (lockerId: string) => {
  const response = await API.internalClient.post<
    DefaultResponseField<Record<string, never>>
  >(`${URL_PREFIX}/${lockerId}/register`);

  return response.data?.data ?? {};
};

export const deleteLockerAssignment = async (lockerId: string) => {
  const response = await API.internalClient.post<
    DefaultResponseField<Record<string, never>>
  >(`${URL_PREFIX}/${lockerId}/return`);

  return response.data?.data ?? {};
};

export const updateLockerExtension = async (lockerId: string) => {
  const response = await API.internalClient.post<
    DefaultResponseField<Record<string, never>>
  >(`${URL_PREFIX}/${lockerId}/extend`);

  return response.data?.data ?? {};
};
