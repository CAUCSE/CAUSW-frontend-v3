import type { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies';

import {
  AUTH_REFRESHED_STORAGE_VALUE,
  STORAGE_ACCESS_KEY,
  STORAGE_AUTH_REFRESHED_KEY,
  STORAGE_REFRESH_KEY,
} from '@/shared/config';

const getCookieStore = async () => {
  const { cookies } = await import('next/headers');
  return await cookies();
};

export const getServerATK = async (): Promise<string> => {
  const cookieStore = await getCookieStore();

  const atk = cookieStore.get(STORAGE_ACCESS_KEY);
  return atk?.value ?? '';
};

export const getServerRTK = async (): Promise<string> => {
  const cookieStore = await getCookieStore();

  const rtk = cookieStore.get(STORAGE_REFRESH_KEY);
  return rtk?.value ?? '';
};

export const setServerATK = async (
  token: string,
  cookieOptions?: Partial<ResponseCookie>,
): Promise<void> => {
  const cookieStore = await getCookieStore();
  cookieStore.set(STORAGE_ACCESS_KEY, token, cookieOptions);
};

export const setServerRTK = async (
  token: string,
  cookieOptions?: Partial<ResponseCookie>,
): Promise<void> => {
  const cookieStore = await getCookieStore();
  cookieStore.set(STORAGE_REFRESH_KEY, token, cookieOptions);
};

export const removeServerATK = async (): Promise<void> => {
  const cookieStore = await getCookieStore();
  cookieStore.delete(STORAGE_ACCESS_KEY);
};

export const removeServerRTK = async (): Promise<void> => {
  const cookieStore = await getCookieStore();
  cookieStore.delete(STORAGE_REFRESH_KEY);
};

export const setServerAuthRefreshed = async (): Promise<void> => {
  const cookieStore = await getCookieStore();
  cookieStore.set(STORAGE_AUTH_REFRESHED_KEY, AUTH_REFRESHED_STORAGE_VALUE);
};
