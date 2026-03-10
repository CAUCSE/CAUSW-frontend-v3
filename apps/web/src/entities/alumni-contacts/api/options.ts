import { infiniteQueryOptions } from '@tanstack/react-query';

import type { GetAlumniContactsQuery } from '../types';

import { getAlumniContacts } from './get';
import { alumniContactsQueryKeys } from './keys';

export const alumniContactsQueryOptions = {
  list: (query: GetAlumniContactsQuery) =>
    infiniteQueryOptions({
      queryKey: alumniContactsQueryKeys.list(query),
      queryFn: () => getAlumniContacts(query),
      initialPageParam: 0,
      getNextPageParam: (lastPage) =>
        lastPage.hasNext ? lastPage.currentPage + 1 : undefined,
    }),
};
