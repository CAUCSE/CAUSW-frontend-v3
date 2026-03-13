'use client';

import { Suspense } from 'react';

import type { CeremonyDetailContext } from '@/entities/ceremony';
import { useCeremonyDetailQuery } from '@/entities/ceremony';

import { useIsMounted } from '@/shared/hooks';
import { SuspenseView } from '@/shared/ui/fallback';
import { QueryErrorBoundary } from '@/shared/ui/provider';

import { CeremonyDetailView } from './CeremonyDetailView';

interface CeremonyDetailContainerProps {
  ceremonyId: string;
  context?: CeremonyDetailContext;
}

const CeremonyDetailFetcher = ({
  ceremonyId,
  context = 'general',
}: CeremonyDetailContainerProps) => {
  const { data } = useCeremonyDetailQuery(ceremonyId, context);

  return <CeremonyDetailView detail={data} />;
};

export const CeremonyDetailContainer = ({
  ceremonyId,
  context = 'general',
}: CeremonyDetailContainerProps) => {
  const isMounted = useIsMounted();

  if (!isMounted) return <SuspenseView />;

  return (
    <QueryErrorBoundary>
      <Suspense fallback={<SuspenseView />}>
        <CeremonyDetailFetcher ceremonyId={ceremonyId} context={context} />
      </Suspense>
    </QueryErrorBoundary>
  );
};
