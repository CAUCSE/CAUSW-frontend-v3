import { SecureStoragePlugin } from 'capacitor-secure-storage-plugin';

export const hasNativeKey = async (key: string): Promise<boolean> => {
  try {
    const { value } = await SecureStoragePlugin.keys();
    return Array.isArray(value) && value.includes(key);
  } catch {
    return false;
  }
};
