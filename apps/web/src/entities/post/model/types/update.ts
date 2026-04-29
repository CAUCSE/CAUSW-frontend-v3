export type PostImageType = 'existing' | 'new';

export interface PostImageMeta {
  order: number;
  type: PostImageType;
  url?: string;
  fileIndex?: number;
  isRepresentative: boolean;
}

export interface PostUpdateRequestDto {
  content: string;
  isAnonymous: boolean;
  images: PostImageMeta[];
}

export interface PostUpdateResponseDto {
  id: string;
  content: string;
  writerId: string;
  fileUrlList: string[];
  isAnonymous: boolean;
  createdAt: string;
  updatedAt: string;
  boardName: string;
}
