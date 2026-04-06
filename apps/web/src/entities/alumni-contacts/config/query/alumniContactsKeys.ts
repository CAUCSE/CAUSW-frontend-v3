import type {
  GetAlumniContactsDetailParam,
  GetAlumniContactsQuery,
} from '../../model';

export const alumniContactsQueryKeys = {
  all: ['alumni-contacts'] as const,
  list: (query: GetAlumniContactsQuery) =>
    [...alumniContactsQueryKeys.all, 'list', query] as const,
  detail: (param: GetAlumniContactsDetailParam) =>
    [...alumniContactsQueryKeys.all, 'detail', param] as const,
};
