/* 게시글 작성 */
export interface PostCreateRequestDto {
  content: string;
  boardId: string;
  isAnonymous: boolean;
}

export interface PostCreateResponseDto {
  id: string;
  content: string;
  fileUrlList: string[];
  isAnonymous: boolean;
  createdAt: Date | string;
  updatedAt: Date | string;
  boardName: string;
}

export interface VoteWriteOption {
  id: string;
  value: string;
}

export interface VoteWriteValue {
  options: VoteWriteOption[];
  endTime: Date | null;
  allowMultiple: boolean;
}
