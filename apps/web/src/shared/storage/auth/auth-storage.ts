import Cookies from 'js-cookie';

import { getStorageAccessKey, getStorageRefreshKey } from '@/shared/utils';

const accessKey = getStorageAccessKey();
const refreshKey = getStorageRefreshKey();

export const getClientATK = (): string => {
  const atk = Cookies.get(refreshKey);
  if (!atk) {
    return '';
  }
  return atk;
};

export const getClientRTK = (): string => {
  const rtk = Cookies.get(accessKey);
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
