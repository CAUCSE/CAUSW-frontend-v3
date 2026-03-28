'use client';

import type { CeremonyDetailContext } from '@/entities/ceremony';
import { useCeremonyDetailQuery } from '@/entities/ceremony';

import {
  HydrationSuspense,
  QueryErrorBoundary,
  SuspenseView,
} from '@/shared/ui';

import { CeremonyDetailView } from './CeremonyDetailView';

interface CeremonyDetailContainerProps {
  ceremonyId: string;
  context?: CeremonyDetailContext;
}

const CeremonyDetailFetcher = ({
  ceremonyId,
  context,
}: Required<CeremonyDetailContainerProps>) => {
  const { data } = useCeremonyDetailQuery(ceremonyId, context);

  return <CeremonyDetailView detail={data} />;
};

export const CeremonyDetailContainer = ({
  ceremonyId,
  context = 'general',
}: CeremonyDetailContainerProps) => {
  return (
    <QueryErrorBoundary>
      <HydrationSuspense fallback={<SuspenseView />}>
        <CeremonyDetailFetcher ceremonyId={ceremonyId} context={context} />
      </HydrationSuspense>
    </QueryErrorBoundary>
  );
};
