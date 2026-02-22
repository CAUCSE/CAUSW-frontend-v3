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

import { TAB_OPTIONS, ScheduleItem } from '../../model';

import { EventCard, COPY, EmptyStateView } from '@/shared';

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
    <VStack className="gap-6">
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
          title={COPY.UPCOMING_SCHEDULE}
          items={upcomingItems}
          emptyMessage={COPY.EMPTY_UPCOMING_SCHEDULE}
        />
        <ScheduleSection
          title={COPY.PAST_SCHEDULE}
          items={pastItems}
          emptyMessage={COPY.EMPTY_PAST_SCHEDULE}
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
            <EventCard
              key={item.id}
              link={item.link || undefined}
              title={item.title}
              icon={<CaldendarIconColored size={24} />}
              iconBgClass={item.isUpcoming ? 'bg-blue-gradient' : 'bg-gray-100'}
              descriptions={[item.date, item.tag]}
              className={mergeStyles(
                'rounded-xl border border-gray-100 bg-white p-4',
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
