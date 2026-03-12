'use client';

import type { RefObject } from 'react';

import { useSearchParams } from 'next/navigation';

import { useInfiniteQuery } from '@tanstack/react-query';

import { PullToRefresh } from '@causw/cds';

import {
  AlumniContactsFilterSearchParam,
  alumniContactsQueryOptions,
  type GetPaginatedAlumniContactsResponseDto,
} from '@/entities/alumni-contacts';

import { QUERY_STALE_TIME } from '@/shared/constants';
import { useBreakpoint, useInfiniteScroll } from '@/shared/hooks';
import { SuspenseView } from '@/shared/ui';

import { AlumniContactsListItem } from '../alumni-contacts-list-item';

import { AlumniContactsListEmptyView } from './AlumniContactsListEmptyView';

type AlumniContactsListItem =
  GetPaginatedAlumniContactsResponseDto['content'][number];

interface AlumniContactsListProps {
  data?: AlumniContactsListItem[];
  isLoading: boolean;
  isFetchingNextPage: boolean;
  hasNextPage: boolean;
  targetRef: RefObject<HTMLDivElement | null>;
}

const AlumniContactsList = ({
  data,
  isLoading,
  isFetchingNextPage,
  hasNextPage,
  targetRef,
}: AlumniContactsListProps) => {
  return (
    <ul className="mb-20 grid grid-cols-1 gap-4 md:mb-5 md:grid-cols-2">
      {data?.map((item) => (
        <AlumniContactsListItem key={item.id} item={item} />
      ))}
      {!isLoading && !isFetchingNextPage && hasNextPage && (
        <div ref={targetRef} className="h-3 w-full" />
      )}
      {isLoading ||
        (isFetchingNextPage && (
          <div className="col-span-1 flex w-full justify-center md:col-span-2">
            <SuspenseView />
          </div>
        ))}
    </ul>
  );
};

export const AlumniContactsListWrapper = () => {
  const searchParams = useSearchParams();
  const { isMobileSize } = useBreakpoint();

  const query = AlumniContactsFilterSearchParam.parse(
    Object.fromEntries(searchParams.entries()),
  );

  const {
    data,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    refetch,
  } = useInfiniteQuery({
    ...alumniContactsQueryOptions.list(query),
    staleTime: QUERY_STALE_TIME.NONE,
    select: (data) => data.pages.flatMap((page) => page.content),
  });

  const { targetRef } = useInfiniteScroll({
    intersectionCallback: (entries) => {
      const [entry] = entries;
      if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
  });

  if (!data || data?.length === 0) {
    return <AlumniContactsListEmptyView />;
  }

  if (isMobileSize) {
    return (
      <PullToRefresh
        onRefresh={async () => {
          await refetch();
        }}
        className="overscroll-y-auto"
      >
        <AlumniContactsList
          data={data}
          isLoading={isLoading}
          isFetchingNextPage={isFetchingNextPage}
          hasNextPage={hasNextPage}
          targetRef={targetRef}
        />
      </PullToRefresh>
    );
  }

  return (
    <AlumniContactsList
      data={data}
      isLoading={isLoading}
      isFetchingNextPage={isFetchingNextPage}
      hasNextPage={hasNextPage}
      targetRef={targetRef}
    />
  );
};
