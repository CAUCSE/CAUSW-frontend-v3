import { type GetPostsQuery } from '../../model';

export const postQueryKeys = {
  all: ['posts'] as const,
  detail: (postId: string) => [...postQueryKeys.all, postId] as const,
  list: (query: GetPostsQuery) => [...postQueryKeys.all, query] as const,
};
