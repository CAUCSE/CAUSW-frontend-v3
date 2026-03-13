import { GetAlumniContactsQuery } from '../../types';

export const alumniContactsQueryKeys = {
  all: ['alumni-contacts'] as const,
  lists: () => [...alumniContactsQueryKeys.all, 'list'] as const,
  list: (params: GetAlumniContactsQuery) =>
    [...alumniContactsQueryKeys.lists(), params] as const,

  details: () => [...alumniContactsQueryKeys.all, 'detail'] as const,
  detail: (id: string) => [...alumniContactsQueryKeys.details(), id] as const,
};
