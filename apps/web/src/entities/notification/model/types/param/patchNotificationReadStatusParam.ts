import type { GetNotificationsResponseDto } from '../dto';

export interface PatchNotificationReadStatusParam {
  id: GetNotificationsResponseDto['notificationLogId'];
}
