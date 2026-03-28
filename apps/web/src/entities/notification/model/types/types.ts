export interface NotificationUnreadCntResponse {
  notificationLogCount: number;
}
export interface NotificationLatestResponse {
  notificationLogId: string;
  title: string;
  body: string;
  noticeType: NotificationType;
  targetId: string;
  targetParentId: string;
  isRead: boolean;
}
export type NotificationType =
  | 'POST'
  | 'COMMENT'
  | 'CEREMONY'
  | 'BOARD'
  | 'ADMISSION';
