import { type PostResponseDto } from './postResponseDto';

export interface GetMyPostsResponseDto {
  posts: PostResponseDto[];
  nextCursor?: string;
}
