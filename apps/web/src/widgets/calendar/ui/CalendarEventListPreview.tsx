'use client';

import Link from 'next/link';

//TODO : NoDataView ui확인필요 (@영현님 : NoDataView 일반화 해주신다고 했음)
import {
  CaldendarIconColored,
  Calendar,
  CalendarGrayColored,
  CTAButton,
  Flex,
  VStack,
} from '@causw/cds';

import {
  CALENDAR_EVENTS_TYPE_MAP,
  CalendarScheduleItem,
  useCalendarMonth,
  useCalendarSchedules,
  CalendarTitle,
  transformToCalendarEvents,
} from '@/entities/calendar';

import { COPY, ROUTES } from '@/shared/constants';
import { checkIsUpcoming, formatDateRangeDash } from '@/shared/lib';
import { EventCard, NoDataView } from '@/shared/ui';

export function CalendarEventListPreview() {
  const { viewMonth, setViewMonth, scheduleApiParams, currentMonth } =
    useCalendarMonth();

  const { data: schedulesItems = [] } = useCalendarSchedules(scheduleApiParams);
  return (
    <VStack>
      {/* Desktop Calendar */}
      <Flex className="desktop:flex hidden flex-col gap-2">
        <CalendarTitle typography="title-22-bold" month={currentMonth} />

        <Calendar
          events={transformToCalendarEvents(schedulesItems)}
          defaultMonth={viewMonth}
          onPrevMonth={setViewMonth}
          onNextMonth={setViewMonth}
        />
      </Flex>

      <VStack className="gap-5 rounded-2xl bg-white p-5">
        <VStack className="gap-5">
          <CalendarTitle
            typography="subtitle-18-bold"
            className="desktop:hidden"
            month={currentMonth}
          />

          {schedulesItems.length > 0 ? (
            schedulesItems.slice(0, 4).map((item: CalendarScheduleItem) => {
              const upcomingStatus = checkIsUpcoming(item.end);

              return (
                <EventCard
                  key={item.id}
                  title={item.title}
                  icon={<CaldendarIconColored size={24} />}
                  iconBgClass={
                    upcomingStatus ? 'bg-blue-gradient' : 'bg-blue-100'
                  }
                  descriptions={[
                    formatDateRangeDash(item.start, item.end),
                    CALENDAR_EVENTS_TYPE_MAP[
                      item.type as keyof typeof CALENDAR_EVENTS_TYPE_MAP
                    ],
                  ]}
                  // TODO : target link 실제 주소에 맞게 수정
                  link={`/board/boardId/${item.targetPostId}`}
                />
              );
            })
          ) : (
            <NoDataView
              message={COPY.EMPTY_SCHEDULE}
              icon={<CalendarGrayColored size={48} />}
            />
          )}
        </VStack>
        <Link href={ROUTES.SCHEDULE} className="w-full">
          <CTAButton fullWidth color="blue" className="bg-blue-100">
            {COPY.ENTIRE_SCHEDULE}
          </CTAButton>
        </Link>
      </VStack>
    </VStack>
  );
}
