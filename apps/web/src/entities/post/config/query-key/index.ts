import { GetPostRequestDto } from '../../model';

export const postKeys = {
  all: ['post'] as const,
  detail: (postId: GetPostRequestDto) => [...postKeys.all, postId] as const,
};
