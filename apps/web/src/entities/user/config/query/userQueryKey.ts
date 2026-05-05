export const userQueryKey = {
  all: ['user'] as const,
  me: () => [...userQueryKey.all, 'me'] as const,
  account: () => [...userQueryKey.me(), 'account'] as const,
};
