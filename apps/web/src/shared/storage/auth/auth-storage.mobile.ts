import { SecureStoragePlugin } from 'capacitor-secure-storage-plugin';

import { NATIVE_ACCESS_KEY, NATIVE_REFRESH_KEY } from '@/shared/config';

import { hasNativeKey } from '../native';

export const getNativeATK = async (): Promise<string> => {
  try {
    if (!(await hasNativeKey(NATIVE_ACCESS_KEY))) {
      return '';
    }

    const { value } = await SecureStoragePlugin.get({
      key: NATIVE_ACCESS_KEY,
    });
    return value ?? '';
  } catch {
    return '';
  }
};

export const getNativeRTK = async (): Promise<string> => {
  try {
    if (!(await hasNativeKey(NATIVE_REFRESH_KEY))) {
      return '';
    }

    const { value } = await SecureStoragePlugin.get({
      key: NATIVE_REFRESH_KEY,
    });
    return value ?? '';
  } catch {
    return '';
  }
};

export const setNativeATK = async (token: string): Promise<void> => {
  await SecureStoragePlugin.set({ key: NATIVE_ACCESS_KEY, value: token });
};

export const setNativeRTK = async (token: string): Promise<void> => {
  await SecureStoragePlugin.set({ key: NATIVE_REFRESH_KEY, value: token });
};

export const removeNativeATK = async (): Promise<void> => {
  await SecureStoragePlugin.remove({ key: NATIVE_ACCESS_KEY });
};

export const removeNativeRTK = async (): Promise<void> => {
  await SecureStoragePlugin.remove({ key: NATIVE_REFRESH_KEY });
};
