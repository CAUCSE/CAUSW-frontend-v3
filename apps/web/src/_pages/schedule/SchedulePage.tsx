'use client';
//TODO : api 연결 후에 ScheduleListCard shared로 분리 + Home에 있는 거 까지 혹은 listcard로 분리
//TODO : 곧 다가올 목록이 단순이 upcoming만의 분기가 아닐수도 남은 일정 + 곧 바로 남은 일정
//TODO : empty state 아이콘 변경 (디자인 시스템에 추가)
import { useState } from 'react';

import { useRouter } from 'next/navigation';

import {
  CaldendarIconColored,
  Flex,
  mergeStyles,
  Tab,
  Text,
  VStack,
} from '@causw/cds';

import { ScheduleItem, TAB_OPTIONS } from '@/widgets/schedule';

import { ActionHeader } from '@/shared/ui/ActionHeader';

import { ActionCard, EmptyStateView } from '@/shared';
import { COPY, ROUTES } from '@/shared';
import { Calendar, CalendarEvent } from '@/widgets';

//더미
const SCHEDULE_ITEMS: ScheduleItem[] = [
  {
    id: 1,
    title: '소프트 챌린저스',
    date: '10/10 - 10/24',
    tag: '집행부',
    isUpcoming: false,
    link: 'has',
  },
  {
    id: 2,
    title: '2학기 중간고사 기간',
    date: '10/10 - 10/24',
    tag: '학사',
    link: 'has',
    isUpcoming: false,
  },
  {
    id: 3,
    title: '총모꼬지',
    date: '10/26',
    tag: '집행부',
    link: 'has',
    isUpcoming: false,
  },

  {
    id: 4,
    title: '크자회의 날',
    date: '10/31',
    tag: '크자회',
    link: '',
    isUpcoming: false,
  },
  {
    id: 5,
    title: '출시날',
    date: '3/31',
    tag: '크자회',
    link: '',
    isUpcoming: true,
  },
  {
    id: 6,
    title: '베타테스트 날',
    date: '3/3',
    tag: '크자회',
    link: '',
    isUpcoming: true,
  },
  {
    id: 7,
    title: '베타테스트 날2',
    date: '2/28',
    tag: '집행부',
    link: '',
    isUpcoming: false,
  },
];

const CALENDAR_EVENTS: CalendarEvent[] = [
  // Holidays
  {
    id: 'h1',
    title: '개천절',
    startDate: '2025-10-03',
    type: 'holiday',
  },
  {
    id: 'h2',
    title: '한글날',
    startDate: '2025-10-09',
    type: 'holiday',
  },
  // Schedule Items converted
  {
    id: 1,
    title: '소프트 챌린저스',
    startDate: '2025-10-10',
    endDate: '2025-10-24',
    type: 'event',
  },
  {
    id: 2,
    title: '중간고사',
    startDate: '2025-10-10',
    endDate: '2025-10-24',
    type: 'event',
  },
  {
    id: 3,
    title: '총모꼬지',
    startDate: '2025-10-26',
    type: 'event',
  },
  {
    id: 4,
    title: '크자회의 날',
    startDate: '2025-10-31',
    type: 'event',
  },
];

export function SchedulePage() {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState('전체');

  // 필터링 로직
  const filteredItems = SCHEDULE_ITEMS.filter(
    (item) => selectedTab === '전체' || item.tag === selectedTab,
  );

  const upcomingItems = filteredItems.filter((item) => item.isUpcoming);
  const pastItems = filteredItems.filter((item) => !item.isUpcoming);

  return (
    <VStack className="max-w-laptop w-full">
      <ActionHeader title="뒤로" className="pt-6">
        <ActionHeader.BackButton onClick={() => router.back()}>
          뒤로
        </ActionHeader.BackButton>
      </ActionHeader>

      <VStack className="tablet:px-12 desktop:gap-10 tablet:pt-6 w-full gap-3 px-4 pb-40">
        <VStack className="gap-2">
          <Text typography="title-24-bold" textColor="gray-900">
            {COPY.MONTHLY_SCHEDULE_TITLE}
          </Text>
        </VStack>

        <VStack className="desktop:gap-10 gap-6">
          <Calendar
            events={CALENDAR_EVENTS}
            enableHover={true}
            onEventClick={(event: CalendarEvent) => {
              console.log('이벤트 클릭:', event.title);
            }}
            className="tablet:py-20 tablet:px-4"
          />

          <Tab.Root
            variant="chip"
            value={selectedTab}
            onValueChange={(val) => setSelectedTab(val)}
          >
            <Tab.List className="scrollbar-hide overflow-x-auto">
              {TAB_OPTIONS.map((opt) => (
                <Tab.TabItem key={opt.value} value={opt.value}>
                  {opt.label}
                </Tab.TabItem>
              ))}
            </Tab.List>
          </Tab.Root>

          {/* Schedule Lists */}
          <Flex className="desktop:flex-row desktop:gap-10 flex-col gap-6">
            {/* Upcoming Schedules */}
            <VStack className="flex-1 gap-3">
              <Text typography="subtitle-16-bold">곧 다가올 일정</Text>
              <VStack className="gap-3">
                {upcomingItems.length > 0 ? (
                  upcomingItems.map((item) => (
                    <ActionCard
                      key={item.id}
                      link={item.link}
                      title={item.title}
                      icon={<CaldendarIconColored size={24} />}
                      iconBgClass={
                        item.isUpcoming ? 'bg-blue-gradient' : 'bg-gray-100'
                      }
                      descriptions={[item.date, item.tag]}
                      size="md"
                      className={mergeStyles(
                        'rounded-xl border border-gray-100 bg-white p-4',
                        item.link ? 'cursor-pointer' : 'cursor-default',
                      )}
                    />
                  ))
                ) : (
                  <EmptyStateView message="다가올 일정이 없어요" />
                )}
              </VStack>
            </VStack>

            {/* Past Schedules */}
            <VStack className="flex-1 gap-3">
              <Text typography="subtitle-16-bold">끝난 일정</Text>
              <VStack className="gap-3">
                {pastItems.length > 0 ? (
                  pastItems.map((item) => (
                    <ActionCard
                      key={item.id}
                      link={item.link ? ROUTES.SCHEDULE : undefined}
                      title={item.title}
                      icon={<CaldendarIconColored size={24} />}
                      iconBgClass={
                        item.isUpcoming ? 'bg-blue-gradient' : 'bg-gray-100'
                      }
                      descriptions={[item.date, item.tag]}
                      className={mergeStyles(
                        'rounded-xl border border-gray-100 bg-white p-4',
                        item.link ? 'cursor-pointer' : 'cursor-default',
                      )}
                    />
                  ))
                ) : (
                  <EmptyStateView message="지난 일정이 없어요" />
                )}
              </VStack>
            </VStack>
          </Flex>
        </VStack>
      </VStack>
    </VStack>
  );
}
