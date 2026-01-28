import Cookies from 'js-cookie';

import { getStorageAccessKey, getStorageRefreshKey } from '@/shared/utils';

const accessKey = getStorageAccessKey();
const refreshKey = getStorageRefreshKey();

export const getAccessToken = () => {
  return Cookies.get(accessKey);
};

export const getRefreshToken = () => {
  return Cookies.get(refreshKey);
};

export const getNativeAccessToken = () => {
  // TODO: 네이티브 스토리지에서 토큰 가져오기
  return '';
};

export const getNativeRefreshToken = () => {
  // TODO: 네이티브 스토리지에서 토큰 가져오기
  return '';
};

export const setAccessToken = (token: string) => {
  Cookies.set(accessKey, token);
};

export const setRefreshToken = (token: string) => {
  Cookies.set(refreshKey, token);
};

export const setNativeAccessToken = () => {
  // TODO: 네이티브 스토리지에 토큰 저장하기
  return '';
};

export const setNativeRefreshToken = () => {
  // TODO: 네이티브 스토리지에 토큰 저장하기
  return '';
};

export const removeAccessToken = () => {
  Cookies.remove(accessKey);
};

export const removeRefreshToken = () => {
  Cookies.remove(refreshKey);
};

export const removeNativeAccessToken = () => {
  // TODO: 네이티브 스토리지에서 토큰 삭제하기
  return '';
};
export const removeNativeRefreshToken = () => {
  // TODO: 네이티브 스토리지에서 토큰 삭제하기
  return '';
};
