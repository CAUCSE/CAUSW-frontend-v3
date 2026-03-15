export const commentKeys = {
  all: ['comments'] as const,
  list: (postId: string, pageNum?: number) =>
    [...commentKeys.all, postId, pageNum] as const,
};
