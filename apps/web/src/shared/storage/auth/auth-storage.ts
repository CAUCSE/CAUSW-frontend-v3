import Cookies from 'js-cookie';

import { REFRRESHED } from '@/shared/config';
import {
  getStorageAccessKey,
  getStorageAuthRefreshedKey,
  getStorageRefreshKey,
} from '@/shared/utils';

const accessKey = getStorageAccessKey();
const authRefreshedKey = getStorageAuthRefreshedKey();
const refreshKey = getStorageRefreshKey();

export const getClientATK = (): string => {
  const atk = Cookies.get(accessKey);
  if (!atk) {
    return '';
  }
  return atk;
};

export const getClientRTK = (): string => {
  const rtk = Cookies.get(refreshKey);
  if (!rtk) {
    return '';
  }
  return rtk;
};

export const setClientATK = (token: string) => {
  Cookies.set(accessKey, token);
};

export const setClientRTK = (token: string) => {
  Cookies.set(refreshKey, token);
};

export const removeClientATK = () => {
  Cookies.remove(accessKey);
};

export const removeClientRTK = () => {
  Cookies.remove(refreshKey);
};

export const getClientAuthRefreshed = (): boolean => {
  return Cookies.get(authRefreshedKey) === REFRRESHED;
};

export const removeClientAuthRefreshed = () => {
  Cookies.remove(authRefreshedKey);
};
