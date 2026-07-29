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
  // v1
  | 'POST'
  | 'COMMENT'
  | 'BOARD'
  | 'ADMISSION'

  // v2
  | 'COMMUNITY' // 커뮤니티 알림
  | 'OFFICIAL' // 공식 계정 알림
  | 'SYSTEM' // 시스템 알림
  | 'CEREMONY_V2' // 경조사 알림
  | 'LOCKER'; // 사물함 알림

export interface UpdateFCMTokenRequestDto {
  fcmToken: string;
}
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
