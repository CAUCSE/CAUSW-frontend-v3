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

  const perm = await PushNotifications.checkPermissions();
  if (perm.receive === 'prompt') {
    await PushNotifications.requestPermissions();
  }

  const perm2 = await PushNotifications.checkPermissions();
  if (perm2.receive !== 'granted') return;

  PushNotifications.addListener('registration', (t: Token) => {
    onToken(t.value);
  });

  PushNotifications.addListener('registrationError', (e) => {
    onError?.(e);
  });

  await PushNotifications.register();
}
