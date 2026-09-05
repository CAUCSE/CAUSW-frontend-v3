import { type ProfileImageValue } from '@/shared/types';

export interface CrawledAttachment {
  url: string;
  name: string;
}

/* 게시글 단일 조회 */
export interface GetPostResponseDto {
  id: string;
  title: string | null;
  content: string;
  crawledAttachments?: CrawledAttachment[];
  originalNoticeUrl?: string;
  isDeleted: boolean;
  displayWriterNickname: string;
  writerProfileImage: ProfileImageValue;
  fileUrlList: string[];
  numComment: number;
  numLike: number;
  viewCount?: number;
  voteId?: string;
  isAnonymous: boolean;
  isCrawled: boolean;
  isOwner: boolean;
  isPostLike: boolean;
  updatable: boolean;
  deletable: boolean;
  isOfficial: boolean;
  createdAt: string;
  updatedAt: string;
  boardId: string;
  boardName: string;
}
