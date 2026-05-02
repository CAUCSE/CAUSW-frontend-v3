import Cookies from 'js-cookie';

import {
  SESSION_COOKIE_EXPIRES_DAYS,
  STORAGE_SESSION_PERSIST_KEY,
} from '@/shared/config';
import { TOGGLE_VALUE } from '@/shared/constants';

export const getClientSessionPersist = (): boolean => {
  return Cookies.get(STORAGE_SESSION_PERSIST_KEY) === TOGGLE_VALUE.ON;
};

export const setClientSessionPersist = (persist: boolean) => {
  if (persist) {
    Cookies.set(STORAGE_SESSION_PERSIST_KEY, TOGGLE_VALUE.ON, {
      expires: SESSION_COOKIE_EXPIRES_DAYS,
    });
    return;
  }

  Cookies.set(STORAGE_SESSION_PERSIST_KEY, TOGGLE_VALUE.OFF);
};

export const removeClientSessionPersist = () => {
  Cookies.remove(STORAGE_SESSION_PERSIST_KEY);
};
