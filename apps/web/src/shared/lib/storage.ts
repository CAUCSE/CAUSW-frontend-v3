import { SecureStoragePlugin } from 'capacitor-secure-storage-plugin';

import { isNative } from './isNative';

export interface KeyValueStorage {
  set(key: string, value: string): Promise<void>;
  get(key: string): Promise<string | null>;
  remove(key: string): Promise<void>;
}

const webStorage: KeyValueStorage = {
  async set(key, value) {
    localStorage.setItem(key, value);
  },
  async get(key) {
    return localStorage.getItem(key);
  },
  async remove(key) {
    localStorage.removeItem(key);
  },
};

const nativeStorage: KeyValueStorage = {
  async set(key, value) {
    await SecureStoragePlugin.set({ key, value });
  },
  async get(key) {
    try {
      const { value } = await SecureStoragePlugin.get({ key });
      return value ?? null;
    } catch {
      return null;
    }
  },
  async remove(key) {
    await SecureStoragePlugin.remove({ key });
  },
};

export const storage: KeyValueStorage = isNative() ? nativeStorage : webStorage;
