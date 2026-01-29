import Cookies from 'js-cookie';

import { getStorageAccessKey, getStorageRefreshKey } from '@/shared/utils';

const accessKey = getStorageAccessKey();
const refreshKey = getStorageRefreshKey();

export const getClientATK = () => {
  return Cookies.get(accessKey);
};

export const getClientRTK = () => {
  return Cookies.get(refreshKey);
};

export const getNativeATK = () => {
  // TODO: 네이티브 스토리지에서 토큰 가져오기
  return '';
};

export const getNativeRTK = () => {
  // TODO: 네이티브 스토리지에서 토큰 가져오기
  return '';
};

export const setClientATK = (token: string) => {
  Cookies.set(accessKey, token);
};

export const setClientRTK = (token: string) => {
  Cookies.set(refreshKey, token);
};

export const setNativeATK = () => {
  // TODO: 네이티브 스토리지에 토큰 저장하기
  return '';
};

export const setNativeRTK = () => {
  // TODO: 네이티브 스토리지에 토큰 저장하기
  return '';
};

export const removeClientATK = () => {
  Cookies.remove(accessKey);
};

export const removeClientRTK = () => {
  Cookies.remove(refreshKey);
};

export const removeNativeATK = () => {
  // TODO: 네이티브 스토리지에서 토큰 삭제하기
  return '';
};
export const removeNativeRTK = () => {
  // TODO: 네이티브 스토리지에서 토큰 삭제하기
  return '';
};
