import Cookies from 'js-cookie';

import {
  AUTH_REFRESHED_STORAGE_VALUE,
  STORAGE_ACCESS_KEY,
  STORAGE_AUTH_REFRESHED_KEY,
  STORAGE_REFRESH_KEY,
} from '@/shared/config';

export const getClientATK = (): string => {
  const atk = Cookies.get(STORAGE_ACCESS_KEY);
  if (!atk) {
    return '';
  }
  return atk;
};

export const getClientRTK = (): string => {
  const rtk = Cookies.get(STORAGE_REFRESH_KEY);
  if (!rtk) {
    return '';
  }
  return rtk;
};

export const setClientATK = async (
  token: string,
  cookieOptions?: Cookies.CookieAttributes,
) => {
  Cookies.set(STORAGE_ACCESS_KEY, token, cookieOptions);
};

export const setClientRTK = async (
  token: string,
  cookieOptions?: Cookies.CookieAttributes,
) => {
  Cookies.set(STORAGE_REFRESH_KEY, token, cookieOptions);
};

export const removeClientATK = () => {
  Cookies.remove(STORAGE_ACCESS_KEY);
};

export const removeClientRTK = () => {
  Cookies.remove(STORAGE_REFRESH_KEY);
};

export const getClientAuthRefreshed = (): boolean => {
  return (
    Cookies.get(STORAGE_AUTH_REFRESHED_KEY) === AUTH_REFRESHED_STORAGE_VALUE
  );
};

export const removeClientAuthRefreshed = () => {
  Cookies.remove(STORAGE_AUTH_REFRESHED_KEY);
};
