import { API } from '@/shared/api';

import {
  type AdmissionStateResponseDto,
  type CheckNicknameDuplicateRequestDto,
  type CheckPhoneDuplicateRequestDto,
} from '../model/types';

const AUTH_API_URL_PREFIX = '/api/v2/users';

export const getAdmissionState = async () => {
  return API.get<AdmissionStateResponseDto>(
    `${AUTH_API_URL_PREFIX}/me/admission/state`,
  );
};

export const checkPhoneDuplicate = async (
  params: CheckPhoneDuplicateRequestDto,
) => {
  const query = new URLSearchParams({ phoneNumber: params.phoneNumber });
  return API.get<null>(`${AUTH_API_URL_PREFIX}/check-phone?${query}`);
};

export const checkNicknameDuplicate = async (
  params: CheckNicknameDuplicateRequestDto,
) => {
  const query = new URLSearchParams({ nickname: params.nickname });
  return API.get<null>(`${AUTH_API_URL_PREFIX}/check-nickname?${query}`);
};
