import { type GetPostResponseDto } from './getPostDto';

type PostResponseDto = Omit<
  GetPostResponseDto,
  'id' | 'fileUrlList' | 'displayWriterNickname'
> & {
  postId: string;
  postImageUrls: string[];
  writerNickname: string;
};

export interface GetPostsResponseDto {
  posts: PostResponseDto[];
  nextCursor?: string;
}
