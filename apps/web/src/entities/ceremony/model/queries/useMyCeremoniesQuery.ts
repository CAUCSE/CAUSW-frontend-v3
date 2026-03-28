'use client';

import { useSuspenseInfiniteQuery } from '@tanstack/react-query';

import { QUERY_STALE_TIME, QUERY_GC_TIME } from '@/shared/constants';

import { getMyCeremonies } from '../../api';
import { ceremonyQueryKey } from '../../config';
import type { CeremonyState } from '../types';

import { selectCeremonyPages, getNextPage } from './ceremonyQueryHelpers';

export const useMyCeremoniesQuery = (state: CeremonyState) =>
  useSuspenseInfiniteQuery({
    queryKey: ceremonyQueryKey.my(state),
    queryFn: ({ pageParam }) => getMyCeremonies(state, pageParam),
    initialPageParam: 0,
    getNextPageParam: getNextPage,
    select: selectCeremonyPages,
    staleTime: QUERY_STALE_TIME.DEFAULT,
    gcTime: QUERY_GC_TIME.DEFAULT,
  });
