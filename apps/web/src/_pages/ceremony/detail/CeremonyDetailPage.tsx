'use client';

import { useParams, useRouter, useSearchParams } from 'next/navigation';

import { CeremonyDetailContainer } from '@/widgets/ceremony';

import type { CeremonyDetailContext } from '@/entities/ceremony';

import { ActionHeader } from '@/shared/ui';

export const CeremonyDetailPage = () => {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const searchParams = useSearchParams();
  const rawContext = searchParams.get('context');
  const context: CeremonyDetailContext = rawContext === 'my' ? 'my' : 'general';

  return (
    <div className="flex min-h-screen flex-col bg-gray-100">
      <ActionHeader background="gray">
        <ActionHeader.BackButton onClick={() => router.back()}>
          뒤로
        </ActionHeader.BackButton>
      </ActionHeader>

      <CeremonyDetailContainer ceremonyId={id} context={context} />
    </div>
  );
};
