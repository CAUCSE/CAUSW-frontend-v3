'use client';

import { useRouter } from 'next/navigation';

import { CeremonyDetailView } from '@/widgets/ceremony';

import { MOCK_CEREMONY_DETAIL } from '@/features/ceremony/config/mockData';

import { ActionHeader } from '@/shared/ui';

export const CeremonyDetailPage = () => {
  const router = useRouter();

  // TODO: useParams()로 id 가져와서 API 호출로 교체
  const detail = MOCK_CEREMONY_DETAIL;

  return (
    <div className="flex min-h-screen flex-col bg-gray-100">
      <ActionHeader background="gray">
        <ActionHeader.BackButton onClick={() => router.back()}>
          뒤로
        </ActionHeader.BackButton>
      </ActionHeader>

      <CeremonyDetailView detail={detail} />
    </div>
  );
};
