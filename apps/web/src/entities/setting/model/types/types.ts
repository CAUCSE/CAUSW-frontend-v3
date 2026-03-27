import { type PostCardItem } from '@/entities/post';

export type ActivityType = 'my-posts' | 'my-comments' | 'favorites';
export type ActivityMode = 'list' | 'empty';

export type MyActivityFeed = {
  emptyMessage: string;
  posts: PostCardItem[];
};

export interface PasswordChangeRequest {
  currentPassword: string;
  newPassword: string;
  newPasswordConfirm: string;
}

export interface NicknameChangeRequest {
  nickname: string;
}
