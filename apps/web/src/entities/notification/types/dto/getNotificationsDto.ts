import { PaginationDto } from '@/shared/types';

type NotificationType = 'POST' | 'COMMENT' | 'CEREMONY' | 'BOARD' | 'ADMISSION';

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

export type GetPaginatedNotificationsResponseDto = PaginationDto<
  GetNotificationsResponseDto[]
>;
