import { PushNotifications, type Token } from '@capacitor/push-notifications';

import { isNative } from '../isNative';

type InitNotificationOptions = {
  onToken: (token: string) => void;
  onError?: (err: unknown) => void;
};

let registered = false;

export async function initNotification({
  onToken,
  onError,
}: InitNotificationOptions) {
  if (!isNative()) return;

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
