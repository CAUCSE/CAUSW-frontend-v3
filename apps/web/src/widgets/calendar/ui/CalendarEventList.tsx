'use client';

import { useMemo, useState } from 'react';

import {
  CaldendarIconColored,
  Calendar,
  CalendarGrayColored,
  Flex,
  mergeStyles,
  Tab,
  Text,
  VStack,
} from '@causw/cds';

import {
  CALENDAR_EVENTS_TYPE_MAP,
  type CalendarScheduleItem,
  transformToCalendarEvents,
  useCalendarMonth,
  useCalendarSchedules,
} from '@/entities/calendar';

import { COPY, ROUTES } from '@/shared/constants';
import { checkIsUpcoming, formatDateRangeDash } from '@/shared/lib';
import {
  ErrorView,
  EventCard,
  NoDataView,
  QueryErrorBoundary,
} from '@/shared/ui';

import { TAB_OPTIONS } from '../model';

export function CalendarEventList() {
  const [selectedTab, setSelectedTab] = useState('ALL');

  const { viewMonth, setViewMonth, scheduleApiParams } = useCalendarMonth();

  const { data: schedulesItems = [] } = useCalendarSchedules(scheduleApiParams);

  const { upcomingItems, pastItems } = useMemo(() => {
    const tabFiltered = schedulesItems.filter(
      (item) => selectedTab === 'ALL' || item.type === selectedTab,
    );
    // const tabFiltered = schedulesItems.filter((item) => {
    //   if (selectedTab === 'ALL') return item.type !== 'HOLIDAY';
    //   return item.type === selectedTab;
    // });

    return {
      upcomingItems: tabFiltered.filter((item) => checkIsUpcoming(item.end)),
      pastItems: tabFiltered.filter((item) => !checkIsUpcoming(item.end)),
    };
  }, [schedulesItems, selectedTab]);
  return (
    <QueryErrorBoundary FallbackComponent={ErrorView}>
      <VStack className="gap-6">
        <Calendar
          events={transformToCalendarEvents(schedulesItems)}
          defaultMonth={viewMonth}
          onPrevMonth={setViewMonth}
          onNextMonth={setViewMonth}
        />

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
              isUpcomingSection={true}
            />
            <ScheduleSection
              title={COPY.PAST_SCHEDULE}
              items={pastItems}
              emptyMessage={COPY.EMPTY_PAST_SCHEDULE}
              isUpcomingSection={false}
            />
          </Flex>
        </VStack>
      </VStack>
    </QueryErrorBoundary>
  );
}

function ScheduleSection({
  title,
  items,
  emptyMessage,
  isUpcomingSection,
}: {
  title: string;
  items: CalendarScheduleItem[];
  emptyMessage: string;
  isUpcomingSection: boolean;
}) {
  return (
    <VStack className="flex-1 gap-3">
      <Text typography="subtitle-16-bold">{title}</Text>
      <VStack className="gap-3">
        {items.length > 0 ? (
          items.map((item) => (
            <EventCard
              key={item.id}
              link={
                item.targetPostId
                  ? `/${ROUTES.FEED}/${item.targetPostId}`
                  : null
              }
              title={item.title}
              icon={<CaldendarIconColored size={24} />}
              iconBgClass={
                isUpcomingSection ? 'bg-blue-gradient' : 'bg-gray-100'
              }
              descriptions={[
                formatDateRangeDash(item.start, item.end),
                CALENDAR_EVENTS_TYPE_MAP[
                  item.type as keyof typeof CALENDAR_EVENTS_TYPE_MAP
                ] ?? item.type,
              ]}
              className={mergeStyles(
                'rounded-xl border border-gray-100 bg-white p-4',
              )}
            />
          ))
        ) : (
          <NoDataView>
            <NoDataView.Icon>
              <CalendarGrayColored size={48} />
            </NoDataView.Icon>
            <NoDataView.Message>{emptyMessage}</NoDataView.Message>
          </NoDataView>
        )}
      </VStack>
    </VStack>
  );
}
