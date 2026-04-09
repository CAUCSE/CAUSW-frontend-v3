import { infiniteQueryOptions } from '@tanstack/react-query';

import { getAlumniContacts } from '../../api';
import { type GetAlumniContactsQuery } from '../../model';

import { alumniContactsQueryKeys } from './alumniContactsKeys';

export const alumniContactsQueryOptions = {
  list: (query: GetAlumniContactsQuery) =>
    infiniteQueryOptions({
      queryKey: alumniContactsQueryKeys.list(query),
      queryFn: ({ pageParam }) => getAlumniContacts(query, pageParam),
      initialPageParam: 0,
      getNextPageParam: (lastPage) =>
        lastPage.hasNext ? lastPage.currentPage + 1 : undefined,
    }),
};
