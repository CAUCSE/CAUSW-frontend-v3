'use client';

import { useState } from 'react';

import {
  CaldendarIconColored,
  Flex,
  mergeStyles,
  Tab,
  Text,
  VStack,
} from '@causw/cds';

import { ScheduleItem, TAB_OPTIONS } from '../model';

import { ActionCard, EmptyStateView } from '@/shared';

interface ScheduleListWidgetProps {
  items: ScheduleItem[];
}

export function ScheduleListWidget({ items }: ScheduleListWidgetProps) {
  const [selectedTab, setSelectedTab] = useState('전체');

  const filteredItems = items.filter(
    (item) => selectedTab === '전체' || item.tag === selectedTab,
  );
  //TODO : ui용 삭제 예정
  const upcomingItems = filteredItems.filter((item) => item.isUpcoming);
  const pastItems = filteredItems.filter((item) => !item.isUpcoming);

  return (
    <VStack className="desktop:gap-10 gap-6">
      <Tab.Root
        variant="chip"
        value={selectedTab}
        onValueChange={setSelectedTab}
      >
        <Tab.List className="scrollbar-hide overflow-x-auto">
          {TAB_OPTIONS.map((opt) => (
            <Tab.TabItem key={opt.value} value={opt.value}>
              {opt.label}
            </Tab.TabItem>
          ))}
        </Tab.List>
      </Tab.Root>

      <Flex className="desktop:flex-row desktop:gap-10 flex-col gap-6">
        <ScheduleSection
          title="곧 다가올 일정"
          items={upcomingItems}
          emptyMessage="다가올 일정이 없어요"
        />
        <ScheduleSection
          title="끝난 일정"
          items={pastItems}
          emptyMessage="지난 일정이 없어요"
        />
      </Flex>
    </VStack>
  );
}

function ScheduleSection({
  title,
  items,
  emptyMessage,
}: {
  title: string;
  items: ScheduleItem[];
  emptyMessage: string;
}) {
  return (
    <VStack className="flex-1 gap-3">
      <Text typography="subtitle-16-bold">{title}</Text>
      <VStack className="gap-3">
        {items.length > 0 ? (
          items.map((item) => (
            <ActionCard
              key={item.id}
              link={item.link || undefined}
              title={item.title}
              icon={<CaldendarIconColored size={24} />}
              iconBgClass={item.isUpcoming ? 'bg-blue-gradient' : 'bg-gray-100'}
              descriptions={[item.date, item.tag]}
              size="md"
              className={mergeStyles(
                'rounded-xl border border-gray-100 bg-white p-4',
                item.link
                  ? 'cursor-pointer hover:border-blue-200 hover:bg-blue-50/30'
                  : 'cursor-default',
              )}
            />
          ))
        ) : (
          <EmptyStateView message={emptyMessage} />
        )}
      </VStack>
    </VStack>
  );
}
