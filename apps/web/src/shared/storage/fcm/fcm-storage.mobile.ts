import { SecureStoragePlugin } from 'capacitor-secure-storage-plugin';

import { getFCMTokenKey } from '@/shared/utils';

const fcmTokenKey = getFCMTokenKey();

export const getNativeFCM = async (): Promise<string> => {
  try {
    const { value } = await SecureStoragePlugin.get({ key: fcmTokenKey });
    return value ?? '';
  } catch {
    return '';
  }
};

export const setNativeFCM = async (token: string): Promise<void> => {
  await SecureStoragePlugin.set({ key: fcmTokenKey, value: token });
};

export const removeNativeFCM = async (): Promise<void> => {
  await SecureStoragePlugin.remove({ key: fcmTokenKey });
};
