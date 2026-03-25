/**
 * 커뮤니티, 공식, 시스템, 경조사 알림
 */
type NotificationType = 'COMMUNITY' | 'OFFICIAL' | 'SYSTEM' | 'CEREMONY';

export interface GetNotificationsResponseDto {
  notificationLogId: string;
  title: string;
  body: string;
  noticeType: NotificationType;
  targetId: string;
  targetParentId: string;
  isRead: boolean;
  createdAt: string;
}
