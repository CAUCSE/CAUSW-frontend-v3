import type { PermissionState } from '@capacitor/core';
import {
  PushNotifications,
  type PermissionStatus,
} from '@capacitor/push-notifications';

import { isMobile } from '@/shared/utils';

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
