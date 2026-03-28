import type { CeremonyFilterTypeApi } from '../../model';

export const ceremonyQueryKey = {
  all: ['ceremony'] as const,
  lists: () => [...ceremonyQueryKey.all, 'list'] as const,
  ongoing: (type: CeremonyFilterTypeApi) =>
    [...ceremonyQueryKey.lists(), 'ongoing', type] as const,
  upcoming: (type: CeremonyFilterTypeApi) =>
    [...ceremonyQueryKey.lists(), 'upcoming', type] as const,
  upcomingPreview: (type: CeremonyFilterTypeApi) =>
    [...ceremonyQueryKey.lists(), 'upcoming-preview', type] as const,
  past: (type: CeremonyFilterTypeApi) =>
    [...ceremonyQueryKey.lists(), 'past', type] as const,
  detail: (id: string) => [...ceremonyQueryKey.all, 'detail', id] as const,
};
