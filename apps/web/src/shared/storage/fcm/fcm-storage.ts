import { getFCMTokenKey } from '@/shared/utils';

const fcmTokenKey = getFCMTokenKey();

export const getClientFCM = (): string =>
  localStorage.getItem(fcmTokenKey) ?? '';

export const setClientFCM = (token: string): void => {
  localStorage.setItem(fcmTokenKey, token);
};

export const removeClientFCM = (): void => {
  localStorage.removeItem(fcmTokenKey);
};
