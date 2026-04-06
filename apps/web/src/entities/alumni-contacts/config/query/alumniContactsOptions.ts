import { infiniteQueryOptions, queryOptions } from '@tanstack/react-query';

import { QUERY_GC_TIME, QUERY_STALE_TIME } from '@/shared/constants';

import { getAlumniContacts, getAlumniContactsDetail } from '../../api';
import {
  type GetAlumniContactsDetailParam,
  type GetAlumniContactsQuery,
} from '../../model';

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
  detail: (param: GetAlumniContactsDetailParam) =>
    queryOptions({
      queryKey: alumniContactsQueryKeys.detail(param),
      queryFn: () => getAlumniContactsDetail(param),
      staleTime: QUERY_STALE_TIME.LONG,
      gcTime: QUERY_GC_TIME.LONG,
    }),
};
