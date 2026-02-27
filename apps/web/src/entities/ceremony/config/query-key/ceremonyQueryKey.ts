export const ceremonyQueryKey = {
  all: () => ['ceremony'] as const,
  upcoming: () => [...ceremonyQueryKey.all(), 'upcoming'] as const,
};
