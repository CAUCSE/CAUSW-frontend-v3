import { PaginationDto } from '@/shared/types';

export interface BaseComment {
  id: string;
  content: string;
  createdAt: Date | string;
  updatedAt: Date | string;
  isDeleted: boolean;
  writerName: string;
  writerNickname: string;
  displayWriterNickname: string;
  writerAdmissionYear: number;
  writerProfileImage: string;
  updatable: boolean;
  deletable: boolean;
  isBlocked: boolean;
  isAnonymous: boolean;
  isOwner: boolean;
  numLike: number;
}

export interface ChildComment extends BaseComment {
  isChildCommentLike: boolean;
}

export interface Comment extends BaseComment {
  postId: string;
  isCommentLike: boolean;
  isCommentSubscribed: boolean;
  numChildComment: number;
  childCommentList: ChildComment[];
}

/* 댓글 리스트 조회 */
export interface GetCommentsRequestDto {
  postId: string;
  pageNum?: number;
}

export type GetCommentsResponseDto = PaginationDto<Comment[]>;

/* 대댓글 미리보기 */
export type ReplyTarget = {
  id: string;
  author: string;
  content: string;
} | null;
