import { SecureStoragePlugin } from 'capacitor-secure-storage-plugin';

import { getFCMTokenKey } from '@/shared/utils';

import { hasNativeKey } from '../capacitor';

const fcmTokenKey = getFCMTokenKey();

export const getNativeFCM = async (): Promise<string> => {
  try {
    if (!(await hasNativeKey(fcmTokenKey))) {
      return '';
    }

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
