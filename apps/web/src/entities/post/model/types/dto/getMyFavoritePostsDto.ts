import { type PostResponseDto } from './postResponseDto';

export interface GetMyFavoritePostsResponseDto {
  posts: PostResponseDto[];
  nextCursor?: string;
}
