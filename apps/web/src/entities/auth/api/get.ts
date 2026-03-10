import { API } from '@/shared/api';

import {
  CheckNicknameDuplicateRequestDto,
  CheckPhoneDuplicateRequestDto,
} from '../model/types';

export const checkPhoneDuplicate = async (
  params: CheckPhoneDuplicateRequestDto,
) => {
  const query = new URLSearchParams({ phoneNumber: params.phoneNumber });
  return API.get<null>(`/api/v2/users/check-phone?${query}`);
};

export const checkNicknameDuplicate = async (
  params: CheckNicknameDuplicateRequestDto,
) => {
  const query = new URLSearchParams({ nickname: params.nickname });
  return API.get<null>(`/api/v2/users/check-nickname?${query}`);
};
