export const postQueryKeys = {
  all: ['post'] as const,
  detail: (postId: string) => [...postQueryKeys.all, postId] as const,
};
