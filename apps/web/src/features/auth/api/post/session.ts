import type {
  SignupResponseDto,
  SigninResponseDto,
  SignoutResponseDto,
  SignupRequestDto,
  SigninRequestDto,
  SignoutRequestDto,
  KakaoLoginRequestDto,
  KakaoLoginResponseDto,
  AppleLoginRequestDto,
  AppleLoginResponseDto,
  GoogleLoginRequestDto,
  GoogleLoginResponseDto,
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

/**
 * 카카오 OAuth 인가 코드를 서버로 전달해 로그인 처리.
 *
 * TODO: setTimeout mock → 실제 API 엔드포인트로 교체 필요
 * return API.post<KakaoLoginResponseDto>(`${URL_PREFIX}/oauth/kakao`, data);
 */
export const kakaoLogin = async (
  data: KakaoLoginRequestDto,
): Promise<KakaoLoginResponseDto> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        accessToken: `mock_access_token_for_code_${data.code.slice(0, 8)}`,
        name: '테스트 유저',
        email: 'test@causw.ac.kr',
        profileImgUrl: '',
      });
    }, 1500);
  });
};

/**
 * Apple OAuth 인가 코드를 서버로 전달해 로그인 처리.
 *
 * TODO: 실제 API 엔드포인트로 교체 필요
 * return API.post<AppleLoginResponseDto>(`${URL_PREFIX}/oauth/apple`, data);
 */
export const appleLogin = async (
  data: AppleLoginRequestDto,
): Promise<AppleLoginResponseDto> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        accessToken: `mock_access_token_for_code_${data.code.slice(0, 8)}`,
        name: '테스트 유저',
        email: 'test@causw.ac.kr',
        profileImgUrl: '',
      });
    }, 1500);
  });
};

/**
 * Google OAuth 인가 코드를 서버로 전달해 로그인 처리.
 *
 * TODO: 실제 API 엔드포인트로 교체 필요
 * return API.post<GoogleLoginResponseDto>(`${URL_PREFIX}/oauth/google`, data);
 */
export const googleLogin = async (
  data: GoogleLoginRequestDto,
): Promise<GoogleLoginResponseDto> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        accessToken: `mock_access_token_for_code_${data.code.slice(0, 8)}`,
        name: '테스트 유저',
        email: 'test@causw.ac.kr',
        profileImgUrl: '',
      });
    }, 1500);
  });
};
