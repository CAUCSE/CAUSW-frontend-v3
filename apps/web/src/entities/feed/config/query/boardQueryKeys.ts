export const boardQueryKeys = {
  all: ['boards'] as const,
  available: () => [...boardQueryKeys.all, 'available'] as const,
};
