'use client';

import { Suspense } from 'react';

import { BellGrayColored } from '@causw/cds';

import type { MyCeremonyStateFilter } from '@/entities/ceremony';
import {
  CeremonyListItem,
  MyCeremonyFilterChips,
  MY_CEREMONY_STATE_MAP,
  useMyCeremoniesQuery,
} from '@/entities/ceremony';

import { useFetchNextOnScroll, useIsMounted } from '@/shared/hooks';
import { NoDataView, SuspenseView } from '@/shared/ui/fallback';
import { QueryErrorBoundary } from '@/shared/ui/provider';

interface MyCeremonyListViewProps {
  stateFilter: MyCeremonyStateFilter;
  onStateFilterChange: (filter: MyCeremonyStateFilter) => void;
  onItemClick?: (id: string) => void;
}

const MyCeremonyListContent = ({
  stateFilter,
  onItemClick,
}: Pick<MyCeremonyListViewProps, 'stateFilter' | 'onItemClick'>) => {
  const state = MY_CEREMONY_STATE_MAP[stateFilter];
  const { data, fetchNextPage, hasNextPage } = useMyCeremoniesQuery(state);
  const { targetRef } = useFetchNextOnScroll({ fetchNextPage, hasNextPage });

  return (
    <div className="flex flex-col gap-2 px-5">
      {data.items.length === 0 ? (
        <NoDataView className="rounded-3 bg-white px-0 py-13.5">
          <NoDataView.Icon>
            <BellGrayColored size={52} />
          </NoDataView.Icon>
          <NoDataView.Message>해당하는 경조사가 없어요</NoDataView.Message>
        </NoDataView>
      ) : (
        data.items.map((item) => (
          <CeremonyListItem
            key={item.id}
            item={item}
            onClick={() => onItemClick?.(item.id)}
          />
        ))
      )}
      {data.hasNext && <div ref={targetRef} />}
    </div>
  );
};

export const MyCeremonyListView = ({
  stateFilter,
  onStateFilterChange,
  onItemClick,
}: MyCeremonyListViewProps) => {
  const isMounted = useIsMounted();

  return (
    <>
      <MyCeremonyFilterChips
        selected={stateFilter}
        onChange={onStateFilterChange}
      />

      {!isMounted ? (
        <SuspenseView />
      ) : (
        <QueryErrorBoundary>
          <Suspense fallback={<SuspenseView />}>
            <MyCeremonyListContent
              stateFilter={stateFilter}
              onItemClick={onItemClick}
            />
          </Suspense>
        </QueryErrorBoundary>
      )}
    </>
  );
};
