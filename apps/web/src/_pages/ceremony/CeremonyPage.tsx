'use client';

import { useState } from 'react';

import { FloatingActionButton, HStack, Plus } from '@causw/cds';

import { CeremonyListView } from '@/widgets/ceremony';

import { CeremonyCreateDialog } from '@/features/ceremony';
import {
  MOCK_ONGOING,
  MOCK_UPCOMING,
  MOCK_ENDED,
} from '@/features/ceremony/config/mockData';

import type { CeremonyFilterType } from '@/entities/ceremony';
import { filterItems } from '@/entities/ceremony';

import { ActionHeader } from '@/shared/ui';

export const CeremonyPage = () => {
  const [filter, setFilter] = useState<CeremonyFilterType>('전체');
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const ongoingItems = filterItems(MOCK_ONGOING, filter);
  const upcomingItems = filterItems(MOCK_UPCOMING, filter);
  const endedItems = filterItems(MOCK_ENDED, filter);

  return (
    <div className="relative flex min-h-screen flex-col bg-gray-100">
      <ActionHeader background="gray">
        <ActionHeader.BackButton>뒤로</ActionHeader.BackButton>
        <ActionHeader.ActionButton>알림 설정</ActionHeader.ActionButton>
      </ActionHeader>

      <CeremonyListView
        filter={filter}
        onFilterChange={setFilter}
        ongoingItems={ongoingItems}
        upcomingItems={upcomingItems}
        endedItems={endedItems}
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
        onOpenChange={setIsCreateOpen}
      />
    </div>
  );
};
