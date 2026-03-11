export const boardKeys = {
  all: ['boards'] as const,
  available: () => [...boardKeys.all, 'available'] as const,
};
