export interface NotificationUnreadCntResponse {
  notificationLogCount: number;
}
export interface NotificationLatestResponse {
  notificationLogId: string;
  title: string;
  body: string;
  // TODO : type 나오면 수정
  noticeType: string;
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
