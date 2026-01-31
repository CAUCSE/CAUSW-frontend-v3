'use server';
import { cookies } from 'next/headers';

import {
  getStorageAccessKey,
  getStorageRefreshKey,
} from '@/shared/utils/storage';

const accessKey = getStorageAccessKey();
const refreshKey = getStorageRefreshKey();

export const getServerATK = async (): Promise<string> => {
  const atk = (await cookies()).get(accessKey);
  if (!atk) {
    return '';
  }
  return atk.value;
};

export const getServerRTK = async (): Promise<string> => {
  const rtk = (await cookies()).get(refreshKey);
  if (!rtk) {
    return '';
  }
  return rtk.value;
};

export const setServerATK = async (token: string): Promise<void> => {
  (await cookies()).set(accessKey, token);
};

export const setServerRTK = async (token: string): Promise<void> => {
  (await cookies()).set(refreshKey, token);
};

export const removeServerATK = async (): Promise<void> => {
  (await cookies()).delete(accessKey);
};

export const removeServerRTK = async (): Promise<void> => {
  (await cookies()).delete(refreshKey);
};
