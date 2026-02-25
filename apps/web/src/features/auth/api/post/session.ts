import type {
  SignupResponseDto,
  SigninResponseDto,
  SignoutResponseDto,
  SignupRequestDto,
  SigninRequestDto,
  SignoutRequestDto,
} from '@/entities/auth';

import { API } from '@/shared/api';

const URL_PREFIX = '/api/v2/auth';

export const signup = async (data: SignupRequestDto) => {
  return API.post<SignupResponseDto>(`${URL_PREFIX}/signup`, data);
};

export const signin = async (data: SigninRequestDto) => {
  return API.post<SigninResponseDto>(`${URL_PREFIX}/login`, data);
};

export const signout = async (data: SignoutRequestDto) => {
  return API.post<SignoutResponseDto>(`${URL_PREFIX}/logout`, data);
};
