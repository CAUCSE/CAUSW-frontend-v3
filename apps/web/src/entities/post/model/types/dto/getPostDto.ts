import { type ProfileImageValue } from '@/shared/types';

/* 게시글 단일 조회 */
export interface GetPostResponseDto {
  id: string;
  content: string;
  isDeleted: boolean;
  displayWriterNickname: string;
  writerProfileImage: ProfileImageValue;
  fileUrlList: string[];
  numComment: number;
  numLike: number;
  numFavorite: number;
  voteId?: string;
  isAnonymous: boolean;
  isCrawled: boolean;
  isOwner: boolean;
  isPostLike: boolean;
  isPostFavorite: boolean;
  updatable: boolean;
  deletable: boolean;
  isOfficial: boolean;
  createdAt: string;
  updatedAt: string;
  boardId: string;
  boardName: string;
}
