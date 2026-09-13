import { type PostCardItem } from '@/entities/post';

export type ActivityType = 'my-posts' | 'my-comments' | 'favorites';

export type ActivityMode = 'list' | 'empty';

export type MyActivityFeed = {
  emptyMessage: string;
  posts: PostCardItem[];
};

export interface PasswordChangeRequest {
  email: string;
  currentPassword: string;
  newPassword: string;
  newPasswordConfirm: string;
}

export interface NicknameChangeRequest {
  nickname: string;
}

export interface AcademicRecordReturnRequest {
  note?: string;
  imageUuids?: string[];
  imageFileList: File[];
}

export interface AcademicRecordGraduationRequest {
  graduationYear: number;
  description?: string;
}
