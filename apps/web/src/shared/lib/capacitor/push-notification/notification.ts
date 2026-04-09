import type { PermissionState } from '@capacitor/core';
import {
  PushNotifications,
  type PermissionStatus,
  type Token,
} from '@capacitor/push-notifications';

import { isMobile } from '@/shared/utils';

type InitNotificationOptions = {
  onToken: (token: string) => void;
  onError?: (err: unknown) => void;
};

let registered = false;

async function getPushNotificationPermissionState(): Promise<
  PermissionState | 'unsupported'
> {
  if (!isMobile) return 'unsupported';

  const permission: PermissionStatus =
    await PushNotifications.checkPermissions();

  return permission.receive;
}

export async function isPushNotificationPermissionDenied() {
  const status = await getPushNotificationPermissionState();

  return status === 'denied';
}

export async function initNotification({
  onToken,
  onError,
}: InitNotificationOptions) {
  if (!isMobile) return;

  //가드 : 한 번만 리스너 등록
  if (registered) return;
  registered = true;

  let perm = await PushNotifications.checkPermissions();
  if (perm.receive === 'prompt') {
    perm = await PushNotifications.requestPermissions();
  }
  if (perm.receive !== 'granted') return;

  PushNotifications.addListener('registration', (t: Token) => {
    onToken(t.value);
  });

  PushNotifications.addListener('registrationError', (e) => {
    onError?.(e);
  });

  await PushNotifications.register();
}
