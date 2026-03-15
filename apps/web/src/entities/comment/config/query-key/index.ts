export const commentKeys = {
  all: ['comments'] as const,

  post: (postId: string) => [...commentKeys.all, postId] as const,

  list: (postId: string, pageNum?: number) =>
    [...commentKeys.post(postId), pageNum] as const,
};
