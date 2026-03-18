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

export interface GetPostResponseDto {
  id: string;
  content: string;
  isDeleted: boolean;
  displayWriterNickname: string;
  writerProfileImage?: string | null;
  fileUrlList?: string[] | string | null;
  numComment: number;
  numLike: number;
  numFavorite: number;
  voteId?: string | null;
  isAnonymous: boolean;
  isCrawled: boolean;
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

export type GetPostDetailResponseDto = GetPostResponseDto;

export interface GetPostsCondition {
  boardIds?: string[];
  cursor?: string;
  size?: number;
  keyword?: string;
}

export interface GetPostsItemResponseDto {
  postId: string;
  content: string;
  numComment: number;
  numLike: number;
  numFavorite: number;
  isAnonymous: boolean;
  voteId?: string | null;
  isDeleted: boolean;
  isCrawled: boolean;
  writerNickname: string;
  writerProfileImageUrl?: string | null;
  createdAt: string;
  updatedAt: string;
  postImageUrls?: string[] | null;
  boardId: string;
  boardName: string;
}

export interface GetPostsResponseDto {
  posts: GetPostsItemResponseDto[];
  nextCursor?: string | null;
}

export interface VoteOption {
  value: string;
  label: string;
  count: number;
}

export interface VoteData {
  options: VoteOption[];
  endTime: string;
}
