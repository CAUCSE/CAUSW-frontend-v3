import { LOCKER_API_PREFIX } from '@/entities/locker';

import { API } from '@/shared/api';

import type {
  PostLockerReturnParam,
  PostLockerRegistrationParam,
  PostLockerExtensionParam,
} from '../model';

export const postLockerRegistration = async (
  param: PostLockerRegistrationParam,
) => {
  const { lockerId } = param;

  return await API.post(`${LOCKER_API_PREFIX}/${lockerId}/register`);
};

export const postLockerReturn = async (param: PostLockerReturnParam) => {
  const { lockerId } = param;

  return await API.post(`${LOCKER_API_PREFIX}/${lockerId}/return`);
};

export const postLockerExtension = async (param: PostLockerExtensionParam) => {
  const { lockerId } = param;

  return await API.post(`${LOCKER_API_PREFIX}/${lockerId}/extend`);
};
