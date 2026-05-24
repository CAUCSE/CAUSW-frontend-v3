import { type PostResponseDto } from './postResponseDto';

export interface GetMyCommentedPostsResponseDto {
  posts: PostResponseDto[];
  nextCursor?: string;
}
