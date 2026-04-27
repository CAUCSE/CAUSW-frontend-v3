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
  isOwner: boolean;
  isPostLike: boolean;
  isPostFavorite: boolean;
  updatable: boolean;
  deletable: boolean;
  createdAt: string;
  updatedAt: string;
  boardId: string;
  boardName: string;
}

export interface Post {
  id: number;
  author: {
    name: string;
    profileImage?: string;
    isOfficial?: boolean;
  };
  createdAt: string;
  content: string;
  images?: string[];
  likeCount: number;
  isLiked: boolean;
  isHtml?: boolean;
  vote?: {
    options: {
      value: string;
      label: string;
      count: number;
    }[];
    endTime: string;
  };
}

export type PostCardItem = {
  id: number;
  author: string;
  timeAgo: string;
  content: string;
  likeCount: number;
  commentCount: number;
  imageCount?: number;
};

export interface VoteOption {
  value: string;
  label: string;
  count: number;
}

export interface VoteData {
  options: VoteOption[];
  endTime: string;
}
