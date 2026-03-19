import { API } from '@/shared/api';

const URL_PREFIX = '/api/v2/lockers';

export const createLockerRegistration = async (lockerId: string) => {
  return await API.post<Record<string, never>>(
    `${URL_PREFIX}/${lockerId}/register`,
  );
};

export const deleteLockerAssignment = async (lockerId: string) => {
  return await API.post<Record<string, never>>(
    `${URL_PREFIX}/${lockerId}/return`,
  );
};

export const updateLockerExtension = async (lockerId: string) => {
  return await API.post<Record<string, never>>(
    `${URL_PREFIX}/${lockerId}/extend`,
  );
};
