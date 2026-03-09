'use client';

import { Suspense, useSyncExternalStore } from 'react';

import type { CeremonyFilterTypeApi } from '@/entities/ceremony';
import {
  useOngoingCeremoniesQuery,
  useUpcomingCeremoniesQuery,
  usePastCeremoniesQuery,
} from '@/entities/ceremony';

import { useFetchNextOnScroll } from '@/shared/hooks';
import { SuspenseView } from '@/shared/ui/fallback';
import { QueryErrorBoundary } from '@/shared/ui/provider';

import { CeremonySection } from './CeremonySection';

interface SectionContentProps {
  type: CeremonyFilterTypeApi;
  onItemClick?: (id: string) => void;
}

const OngoingContent = ({ type, onItemClick }: SectionContentProps) => {
  const { data, fetchNextPage, hasNextPage } = useOngoingCeremoniesQuery(type);
  const { targetRef } = useFetchNextOnScroll({ fetchNextPage, hasNextPage });

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
  const { targetRef } = useFetchNextOnScroll({ fetchNextPage, hasNextPage });

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
  const { targetRef } = useFetchNextOnScroll({ fetchNextPage, hasNextPage });

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

const CeremonySectionsFallback = () => <SuspenseView />;

const emptySubscribe = () => () => {};
const useIsMounted = () =>
  useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );

export const CeremonySectionsGroup = ({
  type,
  onItemClick,
}: SectionContentProps) => {
  const isMounted = useIsMounted();

  if (!isMounted) return <CeremonySectionsFallback />;

  return (
    <QueryErrorBoundary>
      <Suspense fallback={<CeremonySectionsFallback />}>
        <OngoingContent type={type} onItemClick={onItemClick} />
        <UpcomingContent type={type} onItemClick={onItemClick} />
        <PastContent type={type} onItemClick={onItemClick} />
      </Suspense>
    </QueryErrorBoundary>
  );
};
