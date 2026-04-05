'use server';
import { cookies } from 'next/headers';

import {
  AUTH_REFRESHED_STORAGE_VALUE,
  STORAGE_ACCESS_KEY,
  STORAGE_AUTH_REFRESHED_KEY,
  STORAGE_REFRESH_KEY,
} from '@/shared/config';

export const getServerATK = async (): Promise<string> => {
  const atk = (await cookies()).get(STORAGE_ACCESS_KEY);
  if (!atk) {
    return '';
  }
  return atk.value;
};

export const getServerRTK = async (): Promise<string> => {
  const rtk = (await cookies()).get(STORAGE_REFRESH_KEY);
  if (!rtk) {
    return '';
  }
  return rtk.value;
};

export const setServerATK = async (token: string): Promise<void> => {
  (await cookies()).set(STORAGE_ACCESS_KEY, token);
};

export const setServerRTK = async (token: string): Promise<void> => {
  (await cookies()).set(STORAGE_REFRESH_KEY, token);
};

export const removeServerATK = async (): Promise<void> => {
  (await cookies()).delete(STORAGE_ACCESS_KEY);
};

export const removeServerRTK = async (): Promise<void> => {
  (await cookies()).delete(STORAGE_REFRESH_KEY);
};

export const setServerAuthRefreshed = async (): Promise<void> => {
  (await cookies()).set(
    STORAGE_AUTH_REFRESHED_KEY,
    AUTH_REFRESHED_STORAGE_VALUE,
  );
};
