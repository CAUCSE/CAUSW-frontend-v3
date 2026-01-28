'use server';
import { cookies } from 'next/headers';

import {
  getStorageAccessKey,
  getStorageRefreshKey,
} from '@/shared/utils/storage';

const accessKey = getStorageAccessKey();
const refreshKey = getStorageRefreshKey();

export const getAccessToken = async () => {
  return (await cookies()).get(accessKey);
};

export const getRefreshToken = async () => {
  return (await cookies()).get(refreshKey);
};

export const setAccessToken = async (token: string) => {
  (await cookies()).set(accessKey, token);
};

export const setRefreshToken = async (token: string) => {
  (await cookies()).set(refreshKey, token);
};

export const removeAccessToken = async () => {
  (await cookies()).delete(accessKey);
};

export const removeRefreshToken = async () => {
  (await cookies()).delete(refreshKey);
};
