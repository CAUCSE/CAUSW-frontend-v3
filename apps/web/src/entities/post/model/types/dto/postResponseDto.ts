import { type BoardGroup } from '@/entities/board';

import { type GetPostResponseDto } from './getPostDto';

export type PostResponseDto = Omit<
  GetPostResponseDto,
  'id' | 'fileUrlList' | 'displayWriterNickname'
> & {
  postId: string;
  postImageUrls: string[];
  writerNickname: string;
  isPostFavorite: boolean;
  boardGroup: BoardGroup;
};
