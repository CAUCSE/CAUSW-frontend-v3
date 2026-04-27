/* 게시글 단일 조회 */
export interface GetPostResponseDto {
  id: string;
  content: string;
  isDeleted: boolean;
  displayWriterNickname: string;
  writerProfileImage: string;
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
