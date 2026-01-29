'use server';
import { cookies } from 'next/headers';

import {
  getStorageAccessKey,
  getStorageRefreshKey,
} from '@/shared/utils/storage';

const accessKey = getStorageAccessKey();
const refreshKey = getStorageRefreshKey();

export const getServerATK = async () => {
  return (await cookies()).get(accessKey);
};

export const getServerRTK = async () => {
  return (await cookies()).get(refreshKey);
};

export const setServerATK = async (token: string) => {
  (await cookies()).set(accessKey, token);
};

export const setServerRTK = async (token: string) => {
  (await cookies()).set(refreshKey, token);
};

export const removeServerATK = async () => {
  (await cookies()).delete(accessKey);
};

export const removeServerRTK = async () => {
  (await cookies()).delete(refreshKey);
};
