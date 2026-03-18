import type { GetPostsCondition } from '../../model';

export const postKeys = {
  all: ['post'] as const,
  lists: () => [...postKeys.all, 'list'] as const,
  list: (condition: GetPostsCondition) =>
    [...postKeys.lists(), condition] as const,
  detail: (postId: string) => [...postKeys.all, postId] as const,
};
