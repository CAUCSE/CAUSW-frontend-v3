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

export const NOTIFICATION_TYPE_MAP: Record<NotificationType, string> = {
  POST: '게시글',
  COMMENT: '댓글',
  CEREMONY: '경조사',
  BOARD: '게시판',
  ADMISSION: '가입 승인',
};
