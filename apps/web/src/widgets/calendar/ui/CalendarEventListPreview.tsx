'use client';
import { ComponentProps } from 'react';

import Link from 'next/link';

// TODO: 일정 지났을떄 계산 여부 체크 -> 색 변경 연결(api)
// TODO : SCHEDULE_ITEMS 타입 정의
//TODO : 더미 데이터 삭제 {new Date().getMonth() + 1}
//TODO : 기간 길때 글자 잘리는 거 디자인 시스템 수정 후 확인
//TODO : NoDataView ui확인필요 (NoDataView 일반화 해주신다고 했음)
import {
  CaldendarIconColored,
  Calendar,
  CalendarGrayColored,
  Flex,
  Text,
  VStack,
} from '@causw/cds';

import { CalendarEvent } from '@/widgets/calendar';

import { COPY, ROUTES } from '@/shared/constants';
import { EventCard, NoDataView } from '@/shared/ui';

interface ScheduleItem {
  id: number;
  title: string;
  date: string;
  tag: string;
  isUpcoming: boolean;
  link: string;
}

const SCHEDULE_ITEMS: ScheduleItem[] = [
  {
    id: 1,
    title: '소프트 챌린저스',
    date: '10/10 - 10/24',
    tag: '집행부',
    isUpcoming: false,
    link: '',
  },
  {
    id: 2,
    title: '2학기 중간고사 기간',
    date: '10/10 - 10/24',
    tag: '학사',
    isUpcoming: true,
    link: 'd',
  },
  {
    id: 3,
    title: '총모꼬지',
    date: '10/26',
    tag: '집행부',
    isUpcoming: false,
    link: 'd',
  },
  {
    id: 4,
    title: '크자회의 날',
    date: '10/31',
    tag: '크자회',
    isUpcoming: false,
    link: 'd',
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
    title: '소프트 챌린저스ㅇㄴㄹㄴㅇㄹㄴㅇㄹㄴㅇ ㄴㄴㅇㄹㄴㅇㄹㅇㄹㄴㅇㄹㄴㅇ',
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

export function CalendarEventListPreview() {
  return (
    <VStack>
      {/* Desktop Calendar */}
      <Flex className="desktop:flex hidden flex-col gap-2">
        <CalendarTitle typography="title-22-bold" />
        {/* TODO : 달력 UI 확인 사항 (홈페이지/일정 상세 ui 다른 부분 ; v3말고 cds에서 수정 필요)- 이전달/다음달 버튼 px 다른거 & py 값 다른거 & 바깥 shadow 없어야 함 */}
        <Calendar events={CALENDAR_EVENTS} />
      </Flex>
      <VStack className="gap-5 rounded-2xl bg-white p-5">
        <VStack className="gap-5">
          <CalendarTitle
            typography="subtitle-18-bold"
            className="desktop:hidden"
          />

          {SCHEDULE_ITEMS.length > 0 ? (
            SCHEDULE_ITEMS.map((item) => (
              <EventCard
                key={item.id}
                link={item.link}
                title={item.title}
                icon={<CaldendarIconColored size={24} />}
                iconBgClass={
                  item.isUpcoming ? 'bg-blue-gradient' : 'bg-blue-100'
                }
                descriptions={[item.date, item.tag]}
              />
            ))
          ) : (
            <NoDataView
              message={COPY.EMPTY_SCHEDULE}
              icon={<CalendarGrayColored size={48} />}
            />
          )}
        </VStack>

        <Link
          href={ROUTES.SCHEDULE}
          className="flex w-full items-center justify-center rounded-[0.75rem] bg-blue-100 px-4 py-3.5"
        >
          <Text typography="body-15-semibold" textColor="blue-700">
            {COPY.ENTIRE_SCHEDULE}
          </Text>
        </Link>
      </VStack>
    </VStack>
  );
}

function CalendarTitle({
  typography,
  className,
}: {
  typography: ComponentProps<typeof Text>['typography'];
  className?: string;
}) {
  return (
    <Text typography={typography} textColor="blue-700" className={className}>
      10월{' '}
      <Text typography={typography} textColor="gray-800">
        {COPY.MAIN_SCHEDULE_TITLE}
      </Text>
    </Text>
  );
}
