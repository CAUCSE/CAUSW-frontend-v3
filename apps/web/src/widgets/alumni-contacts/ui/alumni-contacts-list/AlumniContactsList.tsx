'use client';

import { RefObject } from 'react';

import { useSearchParams } from 'next/navigation';

import { useInfiniteQuery } from '@tanstack/react-query';

import {
  AlumniContactsFilterSearchParam,
  alumniContactsQueryOptions,
  type GetPaginatedAlumniContactsResponseDto,
} from '@/entities/alumni-contacts';

import { QUERY_STALE_TIME } from '@/shared/constants';
import { useInfiniteScroll } from '@/shared/hooks';
import { SuspenseView } from '@/shared/ui';

import { AlumniContactsListItem } from '../alumni-contacts-list-item';

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
    <ul className="mb-5 grid grid-cols-1 gap-4 md:grid-cols-2">
      {data?.map((item) => (
        <AlumniContactsListItem key={item.id} item={item} />
      ))}
      {!isLoading && !isFetchingNextPage && hasNextPage && (
        <div ref={targetRef} className="h-3 w-full" />
      )}
      {isLoading ||
        (isFetchingNextPage && (
          <div className="col-span-2 flex w-full justify-center">
            <SuspenseView />
          </div>
        ))}
    </ul>
  );
};

export const AlumniContactsListWrapper = () => {
  const searchParams = useSearchParams();

  const query = AlumniContactsFilterSearchParam.parse(
    Object.fromEntries(searchParams.entries()),
  );

  const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useInfiniteQuery({
      ...alumniContactsQueryOptions.list(query),
      staleTime: QUERY_STALE_TIME.NONE,
      select: (data) => data.pages.flatMap((page) => page.content),
    });

  const { targetRef } = useInfiniteScroll({
    intersectionCallback: (entries) => {
      const [entry] = entries;
      if (entry.isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    },
  });

  // PullToRefresh 컴포넌트 스크롤 동작 오류로 주석처리
  // const { isMobileSize } = useBreakpoint();

  // if (isMobileSize) {
  //   return (
  //     <PullToRefresh
  //       onRefresh={async () => {
  //         await refetch();
  //       }}
  //     >
  //       <AlumniContactsList
  //         data={data}
  //         isLoading={isLoading}
  //         isFetchingNextPage={isFetchingNextPage}
  //         hasNextPage={hasNextPage}
  //         targetRef={targetRef}
  //       />
  //     </PullToRefresh>
  //   );
  // }

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
