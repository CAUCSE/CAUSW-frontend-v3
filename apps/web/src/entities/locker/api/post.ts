import { API } from '@/shared/api';

import { LOCKER_API_URL_PREFIX } from '../config';

export const createLockerRegistration = async (lockerId: string) => {
  await API.post(`${LOCKER_API_URL_PREFIX}/${lockerId}/register`);
};

export const deleteLockerAssignment = async (lockerId: string) => {
  await API.post(`${LOCKER_API_URL_PREFIX}/${lockerId}/return`);
};

export const updateLockerExtension = async (lockerId: string) => {
  await API.post(`${LOCKER_API_URL_PREFIX}/${lockerId}/extend`);
};
