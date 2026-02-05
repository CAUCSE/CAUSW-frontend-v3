import { PushNotifications, type Token } from '@capacitor/push-notifications';

import { isNative } from './isNative';

type InitNotificationOptions = {
  onToken: (token: string) => void;
  onError?: (err: unknown) => void;
};

export async function initNotification({
  onToken,
  onError,
}: InitNotificationOptions) {
  if (!isNative()) return;

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
