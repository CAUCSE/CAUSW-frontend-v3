import { type GetAlumniContactsQuery } from '../../model';

export const alumniContactsQueryKeys = {
  all: ['alumni-contacts'] as const,
  list: (params: GetAlumniContactsQuery) =>
    [...alumniContactsQueryKeys.all, params] as const,
};
