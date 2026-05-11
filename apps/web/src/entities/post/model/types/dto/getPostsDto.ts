import { type PostResponseDto } from './postResponseDto';

export interface GetPostsResponseDto {
  posts: PostResponseDto[];
  nextCursor?: string;
}
