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

type UseCeremonyQuery = typeof useOngoingCeremoniesQuery;

interface CeremonySectionConfig {
  useQuery: UseCeremonyQuery;
  title: string;
  emptyMessage?: string;
  hideWhenEmpty?: boolean;
}

const CEREMONY_SECTIONS: CeremonySectionConfig[] = [
  {
    useQuery: useOngoingCeremoniesQuery,
    title: '진행 중인 경조사',
    emptyMessage: '진행 중인 경조사가 없어요',
  },
  {
    useQuery: useUpcomingCeremoniesQuery,
    title: '곧 다가올 경조사',
    emptyMessage: '곧 다가올 경조사가 없어요',
  },
  {
    useQuery: usePastCeremoniesQuery,
    title: '끝난 경조사',
    hideWhenEmpty: true,
  },
];

const CeremonyContentSection = ({
  config,
  type,
  onItemClick,
}: {
  config: CeremonySectionConfig;
  type: CeremonyFilterTypeApi;
  onItemClick?: (id: string) => void;
}) => {
  const { data, fetchNextPage, hasNextPage } = config.useQuery(type);
  const { targetRef } = useFetchNextOnScroll({ fetchNextPage, hasNextPage });

  if (config.hideWhenEmpty && data.items.length === 0) return null;

  return (
    <>
      <CeremonySection
        title={config.title}
        items={data.items}
        emptyMessage={config.emptyMessage}
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
        {CEREMONY_SECTIONS.map((config) => (
          <CeremonyContentSection
            key={config.title}
            config={config}
            type={type}
            onItemClick={onItemClick}
          />
        ))}
      </Suspense>
    </QueryErrorBoundary>
  );
};
