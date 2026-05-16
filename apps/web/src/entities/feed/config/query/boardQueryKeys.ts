export const boardQueryKeys = {
  all: ['boards'] as const,
  available: () => [...boardQueryKeys.all, 'available'] as const,
  writable: () => [...boardQueryKeys.all, 'writable'] as const,
};
