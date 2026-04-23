import type {
  SignupResponseDto,
  SignoutResponseDto,
  SignupRequestDto,
  SigninRequestDto,
  SignoutRequestDto,
  NativeSocialLoginRequestDto,
  AuthResponseDto,
  SendEmailVerificationCodeRequestDto,
  SendEmailVerificationCodeResponseDto,
  VerifyEmailVerificationCodeRequestDto,
  VerifyEmailVerificationCodeResponseDto,
  FindEmailRequestDto,
  EmailFindResponse,
  PasswordResetSendRequestDto,
  PasswordResetVerifyRequestDto,
  PasswordResetVerifyResponseDto,
  TermsAgreementRequestDto,
} from '@/entities/auth';

import { API } from '@/shared/api';
import { AUTH_API_PREFIX } from '@/shared/constants';
import { TokenManager } from '@/shared/storage';

export const signup = async (data: SignupRequestDto) => {
  return API.post<SignupResponseDto>(`${AUTH_API_PREFIX}/signup`, data);
};

export const signin = async (data: SigninRequestDto) => {
  return API.post<AuthResponseDto>(`${AUTH_API_PREFIX}/login`, data);
};

export const signout = async (data: SignoutRequestDto) => {
  const refreshToken = await TokenManager.getRefreshToken();

  return API.post<SignoutResponseDto>(`${AUTH_API_PREFIX}/logout`, data, {
    headers: {
      'Refresh-Authorization': `Bearer ${refreshToken}`,
    },
  });
};

export const sendEmailVerificationCode = async (
  data: SendEmailVerificationCodeRequestDto,
) => {
  return API.post<SendEmailVerificationCodeResponseDto>(
    `${AUTH_API_PREFIX}/email/send`,
    data,
  );
};

export const verifyEmailVerificationCode = async (
  data: VerifyEmailVerificationCodeRequestDto,
) => {
  return API.post<VerifyEmailVerificationCodeResponseDto>(
    `${AUTH_API_PREFIX}/email/verify`,
    data,
  );
};

export const nativeSocialLogin = async (data: NativeSocialLoginRequestDto) => {
  return API.post<AuthResponseDto>(`${AUTH_API_PREFIX}/login/native`, {
    provider: data.provider,
    accessToken: data.accessToken,
    idToken: data.idToken,
  });
};

export const findEmail = async (data: FindEmailRequestDto) => {
  return API.post<EmailFindResponse>(`${AUTH_API_PREFIX}/find-email`, data);
};

export const sendPasswordResetCode = async (
  data: PasswordResetSendRequestDto,
) => {
  return API.post<null>(`${AUTH_API_PREFIX}/password-reset/send`, data);
};

export const verifyPasswordResetCode = async (
  data: PasswordResetVerifyRequestDto,
) => {
  return API.post<PasswordResetVerifyResponseDto>(
    `${AUTH_API_PREFIX}/password-reset/verify`,
    data,
  );
};

export const agreeTerms = async (data: TermsAgreementRequestDto) => {
  return API.post<null>('/api/v2/terms/agreements', data);
};
