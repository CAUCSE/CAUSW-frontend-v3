import { type GetPostResponseDto } from './getPostDto';

export type PostResponseDto = Omit<
  GetPostResponseDto,
  'id' | 'fileUrlList' | 'displayWriterNickname'
> & {
  postId: string;
  postImageUrls: string[];
  writerNickname: string;
};
