import { GetAlumniContactsQuery } from '../../types';

export const alumniContactsQueryKeys = {
  all: ['alumni-contacts'] as const,
  list: (params: GetAlumniContactsQuery) =>
    [...alumniContactsQueryKeys.all, 'list', params] as const,
  details: () => [...alumniContactsQueryKeys.all, 'detail'] as const,
  detail: (id: string) => [...alumniContactsQueryKeys.details(), id] as const,
};
