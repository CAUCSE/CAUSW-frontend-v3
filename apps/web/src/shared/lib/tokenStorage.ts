import { STORAGE_KEYS } from '@/shared/config';
import { storage } from '@/shared/lib/storage';

export const tokenStorage = {
  setRefresh(token: string) {
    return storage.set(STORAGE_KEYS.REFRESH, token);
  },
  getRefresh() {
    return storage.get(STORAGE_KEYS.REFRESH);
  },
  removeRefresh() {
    return storage.remove(STORAGE_KEYS.REFRESH);
  },
};
