'use client';

import { Suspense, useCallback } from 'react';

import type { CeremonyFilterTypeApi } from '@/entities/ceremony';
import {
  useOngoingCeremoniesQuery,
  useUpcomingCeremoniesQuery,
  usePastCeremoniesQuery,
} from '@/entities/ceremony';

import { useInfiniteScroll } from '@/shared/hooks';
import { SuspenseView } from '@/shared/ui/fallback';
import { QueryErrorBoundary } from '@/shared/ui/provider';

import { CeremonySection } from './CeremonySection';

const useFetchNextOnScroll = (
  fetchNextPage: () => void,
  hasNextPage: boolean,
) => {
  const handleIntersect = useCallback<IntersectionObserverCallback>(
    (entries) => {
      if (entries[0]?.isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage],
  );
  return useInfiniteScroll({ intersectionCallback: handleIntersect });
};

interface SectionContentProps {
  type: CeremonyFilterTypeApi;
  onItemClick?: (id: string) => void;
}

const OngoingContent = ({ type, onItemClick }: SectionContentProps) => {
  const { data, fetchNextPage, hasNextPage } = useOngoingCeremoniesQuery(type);
  const { targetRef } = useFetchNextOnScroll(fetchNextPage, hasNextPage);

  return (
    <>
      <CeremonySection
        title="진행 중인 경조사"
        items={data.items}
        emptyMessage="진행 중인 경조사가 없어요"
        onItemClick={onItemClick}
      />
      {data.hasNext && <div ref={targetRef} />}
    </>
  );
};

const UpcomingContent = ({ type, onItemClick }: SectionContentProps) => {
  const { data, fetchNextPage, hasNextPage } = useUpcomingCeremoniesQuery(type);
  const { targetRef } = useFetchNextOnScroll(fetchNextPage, hasNextPage);

  return (
    <>
      <CeremonySection
        title="곧 다가올 경조사"
        items={data.items}
        emptyMessage="곧 다가올 경조사가 없어요"
        onItemClick={onItemClick}
      />
      {data.hasNext && <div ref={targetRef} />}
    </>
  );
};

const PastContent = ({ type, onItemClick }: SectionContentProps) => {
  const { data, fetchNextPage, hasNextPage } = usePastCeremoniesQuery(type);
  const { targetRef } = useFetchNextOnScroll(fetchNextPage, hasNextPage);

  if (data.items.length === 0) return null;

  return (
    <>
      <CeremonySection
        title="끝난 경조사"
        items={data.items}
        onItemClick={onItemClick}
      />
      {data.hasNext && <div ref={targetRef} />}
    </>
  );
};

const SectionWrapper = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<SuspenseView />}>
    <QueryErrorBoundary>{children}</QueryErrorBoundary>
  </Suspense>
);

export const OngoingCeremonySection = (props: SectionContentProps) => (
  <SectionWrapper>
    <OngoingContent {...props} />
  </SectionWrapper>
);

export const UpcomingCeremonySection = (props: SectionContentProps) => (
  <SectionWrapper>
    <UpcomingContent {...props} />
  </SectionWrapper>
);

export const PastCeremonySection = (props: SectionContentProps) => (
  <SectionWrapper>
    <PastContent {...props} />
  </SectionWrapper>
);
