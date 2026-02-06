import { SecureStoragePlugin } from 'capacitor-secure-storage-plugin';

import { getNativeAccessKey, getNativeRefreshKey } from '@/shared/utils';

const accessNativeKey = getNativeAccessKey();
const refreshNativeKey = getNativeRefreshKey();
export const getNativeATK = async (): Promise<string> => {
  try {
    const { value } = await SecureStoragePlugin.get({
      key: accessNativeKey,
    });
    return value ?? '';
  } catch {
    return '';
  }
};

export const getNativeRTK = async (): Promise<string> => {
  try {
    const { value } = await SecureStoragePlugin.get({
      key: refreshNativeKey,
    });
    return value ?? '';
  } catch {
    return '';
  }
};

export const setNativeATK = async (token: string): Promise<void> => {
  await SecureStoragePlugin.set({ key: accessNativeKey, value: token });
};

export const setNativeRTK = async (token: string): Promise<void> => {
  await SecureStoragePlugin.set({ key: refreshNativeKey, value: token });
};

export const removeNativeATK = async (): Promise<void> => {
  await SecureStoragePlugin.remove({ key: accessNativeKey });
};

export const removeNativeRTK = async (): Promise<void> => {
  await SecureStoragePlugin.remove({ key: refreshNativeKey });
};
