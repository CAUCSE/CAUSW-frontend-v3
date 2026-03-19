import { API } from '@/shared/api';

const URL_PREFIX = '/api/v2/lockers';

export const registerLocker = async (lockerId: string) => {
  return await API.post<Record<string, never>>(
    `${URL_PREFIX}/${lockerId}/register`,
  );
};

export const returnLocker = async (lockerId: string) => {
  return await API.post<Record<string, never>>(
    `${URL_PREFIX}/${lockerId}/return`,
  );
};

export const extendLocker = async (lockerId: string) => {
  return await API.post<Record<string, never>>(
    `${URL_PREFIX}/${lockerId}/extend`,
  );
};
