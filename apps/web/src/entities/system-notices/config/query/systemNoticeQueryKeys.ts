export const systemNoticeQueryKeys = {
  all: ['system-notices'] as const,
  latest: () => [...systemNoticeQueryKeys.all, 'latest'] as const,
};
