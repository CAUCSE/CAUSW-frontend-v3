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

export interface CommunityNotificationSettings {
  likeOnMyPost: boolean;
  commentOnMyPost: boolean;
  replyOnMyComment: boolean;
}

export interface CeremonyNotificationSettings {
  enabled: boolean;
}

export interface ServiceNotificationSettings {
  noticeEnabled: boolean;
}

export interface OfficialBoardNotificationSettings {
  boardId: string;
  name: string;
  subscribed: boolean;
}

export interface NotificationSettingsResponse {
  community: CommunityNotificationSettings;
  ceremony: CeremonyNotificationSettings;
  service: ServiceNotificationSettings;
  officialBoards: OfficialBoardNotificationSettings[];
}

export interface UpdateNotificationSettingsRequest {
  community?: Partial<CommunityNotificationSettings>;
  ceremony?: Partial<CeremonyNotificationSettings>;
  service?: Partial<ServiceNotificationSettings>;
}

export interface UpdateOfficialBoardNotificationRequest {
  boardId: string;
  subscribed: boolean;
}
