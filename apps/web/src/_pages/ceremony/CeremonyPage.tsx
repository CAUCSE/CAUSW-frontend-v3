'use client';

import { useState } from 'react';

import { FloatingActionButton, HStack, Plus, Tab } from '@causw/cds';

import { CeremonyCreateDialog } from '@/features/ceremony/ui';

import {
  CeremonyEmptyView,
  CeremonyFilterChips,
  CeremonyListItem,
} from '@/entities/ceremony/ui';

import type { CeremonyFilterType, CeremonyItem } from '@/shared/types';
import { ActionHeader } from '@/shared/ui/ActionHeader';

// TODO: API 연결 시 제거
const MOCK_UPCOMING: CeremonyItem[] = [
  {
    id: '1',
    title: '홍길동(21학번) 모 결혼식',
    type: '경사',
    category: '결혼식',
    startDate: '2026-10-10',
    endDate: '2026-10-10',
    startTime: '00:00:00',
    endTime: '23:59:00',
    state: 'ACCEPT',
  },
  {
    id: '2',
    title: '김영희(19학번) 부 생신잔치',
    type: '경사',
    category: '생신잔치',
    startDate: '2026-10-10',
    endDate: '2026-10-10',
    startTime: '00:00:00',
    endTime: '23:59:00',
    state: 'ACCEPT',
  },
  {
    id: '3',
    title: '홍길동(21학번) 졸업식',
    type: '경사',
    category: '개업',
    startDate: '2026-10-10',
    endDate: '2026-10-10',
    startTime: '00:00:00',
    endTime: '23:59:00',
    state: 'ACCEPT',
  },
  {
    id: '4',
    title: '김범식(44학번) 딸 장례식',
    type: '조사',
    category: '장례식',
    startDate: '2026-10-10',
    endDate: '2026-10-12',
    startTime: '00:00:00',
    endTime: '23:59:00',
    state: 'ACCEPT',
  },
  {
    id: '5',
    title: '김범석(55학번) 아들 돌잔치',
    type: '경사',
    category: '돌잔치',
    startDate: '2026-10-10',
    endDate: '2026-10-10',
    startTime: '00:00:00',
    endTime: '23:59:00',
    state: 'ACCEPT',
  },
];

// TODO: API 연결 시 제거
const MOCK_ONGOING: CeremonyItem[] = [
  {
    id: '0',
    title: '제 1회 졸업식',
    type: '경사',
    category: '결혼식',
    startDate: '2026-02-20',
    endDate: '2026-02-22',
    startTime: '00:00:00',
    endTime: '23:59:00',
    state: 'ACCEPT',
  },
];

const MOCK_ENDED: CeremonyItem[] = [
  {
    id: '6',
    title: '김영희(19학번) 결혼식',
    type: '경사',
    category: '결혼식',
    startDate: '2026-10-10',
    endDate: '2026-10-10',
    startTime: '13:00:00',
    endTime: '15:00:00',
    state: 'ACCEPT',
  },
  {
    id: '7',
    title: '홍길동(21학번) 졸업식',
    type: '경사',
    category: '개업',
    startDate: '2026-10-10',
    endDate: '2026-10-10',
    startTime: '00:00:00',
    endTime: '23:59:00',
    state: 'ACCEPT',
  },
];

const filterItems = (
  items: CeremonyItem[],
  filter: CeremonyFilterType,
): CeremonyItem[] => {
  if (filter === '전체') return items;
  return items.filter((item) => item.type === filter);
};

interface CeremonySectionProps {
  title: string;
  items: CeremonyItem[];
  emptyMessage?: string;
}

const CeremonySection = ({
  title,
  items,
  emptyMessage,
}: CeremonySectionProps) => (
  <div className="flex flex-col gap-2 px-5">
    <h3 className="typo-subtitle-16-bold text-gray-700">{title}</h3>
    {items.length === 0 ? (
      <CeremonyEmptyView message={emptyMessage} />
    ) : (
      items.map((item) => <CeremonyListItem key={item.id} item={item} />)
    )}
  </div>
);

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

      <Tab variant="underline" defaultValue="all">
        <Tab.List className="bg-gray-100 px-5">
          <Tab.TabItem value="all" className="px-0 py-2">
            전체 경조사
          </Tab.TabItem>
          <Tab.TabItem value="mine" className="px-0 py-2">
            내 경조사
          </Tab.TabItem>
        </Tab.List>

        <Tab.Content value="all" className="flex flex-col gap-5 pt-5 pb-25">
          <CeremonyFilterChips selected={filter} onChange={setFilter} />

          <CeremonySection
            title="진행 중인 경조사"
            items={ongoingItems}
            emptyMessage="진행 중인 경조사가 없어요"
          />

          <CeremonySection
            title="곧 다가올 경조사"
            items={upcomingItems}
            emptyMessage="곧 다가올 경조사가 없어요"
          />

          {endedItems.length > 0 && (
            <CeremonySection title="끝난 경조사" items={endedItems} />
          )}
        </Tab.Content>

        <Tab.Content value="mine" className="flex flex-col gap-5 pt-5 pb-25">
          <CeremonyFilterChips selected={filter} onChange={setFilter} />

          <CeremonySection
            title="진행 중인 경조사"
            items={[]}
            emptyMessage="진행 중인 경조사가 없어요"
          />
        </Tab.Content>
      </Tab>

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
