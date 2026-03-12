'use client';

import { useSuspenseInfiniteQuery } from '@tanstack/react-query';

import { QUERY_STALE_TIME, QUERY_GC_TIME } from '@/shared/constants';

import {
  getOngoingCeremonies,
  getUpcomingCeremonies,
  getPastCeremonies,
} from '../../api';
import { ceremonyQueryKey } from '../../config';
import type { CeremonyFilterTypeApi, CeremonyPageResponse } from '../types';

const selectCeremonyPages = (data: { pages: CeremonyPageResponse[] }) => {
  const allItems = data.pages.flatMap((page) => page.content);
  const seen = new Set<string>();
  const items = allItems.filter((item) => {
    if (seen.has(item.id)) return false;
    seen.add(item.id);
    return true;
  });

  return {
    items,
    hasNext: data.pages[data.pages.length - 1]?.hasNext ?? false,
  };
};

const getNextPage = (lastPage: CeremonyPageResponse) =>
  lastPage.hasNext ? lastPage.currentPage + 1 : undefined;

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
