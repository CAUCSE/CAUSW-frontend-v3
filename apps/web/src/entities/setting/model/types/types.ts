export type ActivityType = 'my-posts' | 'my-comments' | 'favorites';
export type ActivityMode = 'list' | 'empty';

export type MyActivityPostItem = {
  postId: string;
  boardId: string;
  authorName: string;
  createdAt: string;
  content: string;
  likeCount: number;
  commentCount: number;
  isLiked: boolean;
  avatarUrl?: string;
  images?: string[];
  isOfficial?: boolean;
  isAnonymous?: boolean;
  boardName?: string;
};

export type MyActivityFeedPage = {
  posts: MyActivityPostItem[];
  nextCursor: string | null;
};

export interface MyActivityPostItemDto {
  postId: string;
  content: string;
  numComment: number;
  numLike: number;
  numFavorite: number;
  isAnonymous: boolean;
  voteId: string | null;
  isDeleted: boolean;
  isCrawled: boolean;
  writerNickname: string;
  writerProfileImage: {
    profileImageType: string;
    profileImageUrl: string;
  } | null;
  createdAt: string;
  updatedAt: string;
  postImageUrls: string[];
  boardId: string;
  boardName: string;
}

export interface MyActivityFeedResponseDto {
  posts: MyActivityPostItemDto[];
  nextCursor: string | null;
}

export interface PasswordChangeRequest {
  currentPassword: string;
  newPassword: string;
  newPasswordConfirm: string;
}

export interface NicknameChangeRequest {
  nickname: string;
}
