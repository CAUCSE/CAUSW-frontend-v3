'use client';
//TODO : 곧 다가올 목록이 단순이 upcoming만의 분기

import { useRouter } from 'next/navigation';

import { Text, VStack } from '@causw/cds';

import {
  Calendar,
  CalendarEvent,
  CalendarEventItem,
  CalendarEventList,
} from '@/widgets/calendar';

import { COPY } from '@/shared/constants';
import { ActionHeader } from '@/shared/ui';

//더미
const SCHEDULE_ITEMS: CalendarEventItem[] = [
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

  return (
    <VStack className="max-w-laptop w-full gap-2">
      <ActionHeader title={COPY.BACK} className="pt-6">
        <ActionHeader.BackButton onClick={() => router.back()}>
          {COPY.BACK}
        </ActionHeader.BackButton>
      </ActionHeader>

      <VStack className="tablet:px-12 w-full gap-3 px-4 pb-40">
        <VStack className="gap-2">
          <Text typography="title-24-bold" textColor="gray-900">
            {COPY.MONTHLY_SCHEDULE_TITLE}
          </Text>
        </VStack>

        <VStack className="gap-6">
          <Calendar
            events={CALENDAR_EVENTS}
            className="tablet:py-20 tablet:px-4 shadow-none!"
          />

          <CalendarEventList items={SCHEDULE_ITEMS} />
        </VStack>
      </VStack>
    </VStack>
  );
}
