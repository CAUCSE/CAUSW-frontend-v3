import {
  noATKCode,
  noPermissionCode,
  noRTKCode,
} from '@/shared/constants/auth/errorCode';
import { BaseApiError } from '@/shared/types/api/response';

export const isAccessTokenError = (errorCode: string) => {
  return noATKCode.includes(errorCode);
};

export const isRefreshTokenError = (errorCode: string) => {
  return noRTKCode.includes(errorCode);
};

export const isNoPermissionError = (errorCode: string) => {
  return noPermissionCode.includes(errorCode);
};

export const parseCustomErrorCode = (error: BaseApiError) => {
  if (!error.data) return '';
  return error.data.code;
};
