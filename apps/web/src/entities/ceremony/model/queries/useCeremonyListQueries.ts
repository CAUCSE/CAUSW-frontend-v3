'use client';

import { useSuspenseInfiniteQuery } from '@tanstack/react-query';

import { QUERY_STALE_TIME, QUERY_GC_TIME } from '@/shared/constants';

import {
  getOngoingCeremonies,
  getUpcomingCeremonies,
  getPastCeremonies,
} from '../../api';
import { ceremonyQueryKey } from '../../config';
import type { CeremonyFilterTypeApi } from '../types';

import { selectCeremonyPages, getNextPage } from './ceremonyQueryHelpers';

export const useOngoingCeremoniesQuery = (type: CeremonyFilterTypeApi) =>
  useSuspenseInfiniteQuery({
    queryKey: ceremonyQueryKey.ongoing(type),
    queryFn: ({ pageParam }) => getOngoingCeremonies(type, pageParam),
    initialPageParam: 0,
    getNextPageParam: getNextPage,
    select: selectCeremonyPages,
    staleTime: QUERY_STALE_TIME.DEFAULT,
    gcTime: QUERY_GC_TIME.DEFAULT,
  });

export const useUpcomingCeremoniesQuery = (type: CeremonyFilterTypeApi) =>
  useSuspenseInfiniteQuery({
    queryKey: ceremonyQueryKey.upcoming(type),
    queryFn: ({ pageParam }) => getUpcomingCeremonies(type, pageParam),
    initialPageParam: 0,
    getNextPageParam: getNextPage,
    select: selectCeremonyPages,
    staleTime: QUERY_STALE_TIME.DEFAULT,
    gcTime: QUERY_GC_TIME.DEFAULT,
  });

export const usePastCeremoniesQuery = (type: CeremonyFilterTypeApi) =>
  useSuspenseInfiniteQuery({
    queryKey: ceremonyQueryKey.past(type),
    queryFn: ({ pageParam }) => getPastCeremonies(type, pageParam),
    initialPageParam: 0,
    getNextPageParam: getNextPage,
    select: selectCeremonyPages,
    staleTime: QUERY_STALE_TIME.DEFAULT,
    gcTime: QUERY_GC_TIME.DEFAULT,
  });
