/* 게시글 작성 */
export interface PostMetaImage {
  order: number;
  fileIndex: number;
  isRepresentative: boolean;
}

export interface PostCreateRequestDto {
  content: string;
  boardId: string;
  isAnonymous: boolean;
  images: PostMetaImage[];
}

export interface PostCreateResponseDto {
  id: string;
  content: string;
  fileUrlList: string[];
  isAnonymous: boolean;
  createdAt: string;
  updatedAt: string;
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
