export type PostImageType = 'existing' | 'new';

export interface PostImageMeta {
  order: number;
  type: PostImageType;
  url?: string;
  fileIndex?: number;
  isRepresentative: boolean;
}

export interface PostUpdateRequestDto {
  title: string;
  content: string;
  isAnonymous: boolean;
  images: PostImageMeta[];
}

export interface PostUpdateResponseDto {
  id: string;
  title: string | null;
  content: string;
  writerId: string;
  fileUrlList: string[];
  isAnonymous: boolean;
  createdAt: string;
  updatedAt: string;
  boardName: string;
}
