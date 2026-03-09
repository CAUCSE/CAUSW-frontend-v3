'use client';

import { useState } from 'react';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { FloatingActionButton, HStack, Plus } from '@causw/cds';

import { CeremonyListView } from '@/widgets/ceremony';

import { CeremonyCreateDialog, MOCK_MY_CEREMONIES } from '@/features/ceremony';

import type {
  CeremonyFilterType,
  MyCeremonyStateFilter,
} from '@/entities/ceremony';
import { filterByState } from '@/entities/ceremony';

import { useScrollRestoration } from '@/shared/hooks';
import { ActionHeader } from '@/shared/ui';

export const CeremonyPage = () => {
  const { saveScrollPosition } = useScrollRestoration('ceremony-list-scroll');
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [filter, setFilter] = useState<CeremonyFilterType>('전체');
  const [isCreateOpen, setIsCreateOpen] = useState(
    () => searchParams.get('create') === 'true',
  );
  const [myStateFilter, setMyStateFilter] =
    useState<MyCeremonyStateFilter>('등록 완료');

  const handleOpenChange = (open: boolean) => {
    setIsCreateOpen(open);

    if (!open && searchParams.get('create') === 'true') {
      router.replace(pathname);
    }
  };

  const myItems = filterByState(MOCK_MY_CEREMONIES, myStateFilter);

  const handleItemClick = (id: string) => {
    saveScrollPosition();
    router.push(`/ceremony/${id}`);
  };

  return (
    <div className="relative flex min-h-screen flex-col bg-gray-100">
      <ActionHeader background="gray">
        <ActionHeader.BackButton>뒤로</ActionHeader.BackButton>
        <ActionHeader.ActionButton>알림 설정</ActionHeader.ActionButton>
      </ActionHeader>

      <CeremonyListView
        filter={filter}
        onFilterChange={setFilter}
        myStateFilter={myStateFilter}
        onMyStateFilterChange={setMyStateFilter}
        myItems={myItems}
        onItemClick={handleItemClick}
      />

      <div className="fixed right-[1rem] bottom-[2.75rem]">
        <FloatingActionButton
          className="bg-gray-50 shadow-[0_0.25rem_0.25rem_rgba(0,0,0,0.04)]"
          onClick={() => setIsCreateOpen(true)}
        >
          <HStack gap="xs" className="items-center">
            <Plus size={20} className="fill-gray-500" />
            <p>경조사 신청</p>
          </HStack>
        </FloatingActionButton>
      </div>

      <CeremonyCreateDialog
        open={isCreateOpen}
        onOpenChange={handleOpenChange}
      />
    </div>
  );
};
