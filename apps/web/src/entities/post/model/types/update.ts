export interface PostUpdateRequestDto {
  content: string;
  isAnonymous: boolean;
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
