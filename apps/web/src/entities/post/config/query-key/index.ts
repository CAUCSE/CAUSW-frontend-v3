export const postKeys = {
  all: ['post'] as const,
  detail: (postId: string) => [...postKeys.all, postId] as const,
};
