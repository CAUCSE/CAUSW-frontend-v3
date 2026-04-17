import { API } from '@/shared/api';
import { USER_API_PREFIX } from '@/shared/constants';

import {
  type AdmissionStateResponseDto,
  type CheckNicknameDuplicateRequestDto,
  type CheckPhoneDuplicateRequestDto,
  type UserResponseDto,
  type TermResponseDto,
} from '../model/types';

export const getAdmissionState = async () => {
  return API.get<AdmissionStateResponseDto>('/api/v2/users/me/admission/state');
};

export const getMyInfo = async () => {
  return API.get<UserResponseDto>(`${USER_API_PREFIX}/me`);
};

export const getTerms = async () => {
  return API.get<TermResponseDto[]>('/api/v2/terms');
};

export const checkPhoneDuplicate = async (
  params: CheckPhoneDuplicateRequestDto,
) => {
  const query = new URLSearchParams({ phoneNumber: params.phoneNumber });
  return API.get<null>(`${USER_API_PREFIX}/check-phone?${query}`);
};

export const checkNicknameDuplicate = async (
  params: CheckNicknameDuplicateRequestDto,
) => {
  const query = new URLSearchParams({ nickname: params.nickname });
  return API.get<null>(`${USER_API_PREFIX}/check-nickname?${query}`);
};
