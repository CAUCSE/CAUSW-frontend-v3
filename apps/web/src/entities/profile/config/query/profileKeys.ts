export const profileQueryKeys = {
  all: ['profile'] as const,
  me: () => [...profileQueryKeys.all, 'me'] as const,
};
