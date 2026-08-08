'use client';

import { useParams, useSearchParams } from 'next/navigation';

import { CeremonyDetailContainer } from '@/widgets/ceremony';

import type { CeremonyDetailContext } from '@/entities/ceremony';

import { ROUTES } from '@/shared/constants';
import { ActionHeader } from '@/shared/ui';

export const CeremonyDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const searchParams = useSearchParams();
  const rawContext = searchParams.get('context');
  const context: CeremonyDetailContext = rawContext === 'my' ? 'my' : 'general';

  return (
    <div className="flex min-h-screen flex-col bg-gray-100">
      <ActionHeader background="gray">
        <ActionHeader.BackButton fallbackHref={ROUTES.CEREMONY}>
          뒤로
        </ActionHeader.BackButton>
      </ActionHeader>

      <CeremonyDetailContainer ceremonyId={id} context={context} />
    </div>
  );
};
