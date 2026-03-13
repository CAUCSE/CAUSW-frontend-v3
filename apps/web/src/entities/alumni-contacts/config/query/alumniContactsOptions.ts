import { infiniteQueryOptions, queryOptions } from '@tanstack/react-query';

import { getAlumniContacts, getAlumniDetail } from '../../api';
import { GetAlumniContactsQuery } from '../../types';

import { alumniContactsQueryKeys } from './alumniContactsKeys';

export const alumniContactsQueryOptions = {
  list: (query: GetAlumniContactsQuery) =>
    infiniteQueryOptions({
      queryKey: alumniContactsQueryKeys.list(query),
      queryFn: ({ pageParam }) => getAlumniContacts(query, pageParam as number),
      initialPageParam: 0,
      getNextPageParam: (lastPage) =>
        lastPage.hasNext ? lastPage.currentPage + 1 : undefined,
    }),

  detail: (id: string) =>
    queryOptions({
      queryKey: alumniContactsQueryKeys.detail(id),
      queryFn: () => getAlumniDetail(id),
      staleTime: 1000 * 60 * 5, // 5분
    }),
};
