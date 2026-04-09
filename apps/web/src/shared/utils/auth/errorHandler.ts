import { type ApiError } from '@causw/api-client';

import { noATKCode, noRTKCode } from '@/shared/constants';

export const isAccessTokenError = (errorCode: string) => {
  return noATKCode.includes(errorCode);
};

export const isRefreshTokenError = (errorCode: string) => {
  return noRTKCode.includes(errorCode);
};

export const parseCustomErrorCode = (error: ApiError): string => {
  if (!error.data) return '';
  return error.data.code || '';
};
