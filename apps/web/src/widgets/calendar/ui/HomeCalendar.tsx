'use client';

import { type ReactNode, useState } from 'react';

import { useRouter } from 'next/navigation';

import { Calendar, Checkbox } from '@causw/cds';

import {
  type CalendarScheduleParams,
  transformToCalendarEvents,
  useCalendarMonth,
  useCalendarSchedules,
} from '@/entities/calendar';

import { ROUTES } from '@/shared/constants';
import { useBreakpoint } from '@/shared/hooks';
import { QueryErrorBoundary } from '@/shared/ui';

const CATEGORIES = [
  { type: 'ACADEMIC', label: '학사', dotClassName: 'bg-[#9ca3af]' },
  { type: 'DEPARTMENT', label: '학부', dotClassName: 'bg-[#60a5fa]' },
  { type: 'CCSSAA', label: 'CCSSAA', dotClassName: 'bg-[#7dd3fc]' },
  { type: 'STUDENT_COUNCIL', label: '학생회', dotClassName: 'bg-[#fb923c]' },
  { type: 'HOLIDAY', label: '공휴일', dotClassName: 'bg-[#f87171]' },
  { type: 'CEREMONY', label: '경조사', dotClassName: 'bg-[#ae71f8]' },
] as const;

export function HomeCalendar({
  headerAction,
  banner,
}: {
  headerAction: ReactNode;
  banner: ReactNode;
}) {
  const { viewMonth, setViewMonth, scheduleApiParams } = useCalendarMonth({
    includeAdjacentDays: true,
  });
  const { isTabletSize, isDesktopSize } = useBreakpoint();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  return (
    <>
      <div className="z-sticky tablet:static sticky top-0 bg-white">
        <Calendar.Nav
          month={viewMonth}
          onMonthChange={setViewMonth}
          headerAction={
            <div className="tablet:hidden -mr-2.5 flex h-7 items-center">
              {headerAction}
            </div>
          }
        />
      </div>

      {banner}

      <QueryErrorBoundary
        resetKeys={[viewMonth]}
        fallbackMessage="일정을 불러오지 못했어요"
      >
        <HomeCalendarGrid
          month={viewMonth}
          params={scheduleApiParams}
          selectedCategories={
            isTabletSize || isDesktopSize ? selectedCategories : []
          }
        />
      </QueryErrorBoundary>

      <fieldset className="tablet:grid hidden min-w-0 grid-cols-3 gap-x-8 gap-y-2 border-b-[12px] border-gray-100 px-6 py-4">
        <legend className="sr-only">일정 카테고리 필터</legend>
        {CATEGORIES.map(({ type, label, dotClassName }) => (
          <Checkbox
            key={type}
            checked={selectedCategories.includes(type)}
            onCheckedChange={(checked) =>
              setSelectedCategories((current) =>
                checked
                  ? [...current, type]
                  : current.filter((item) => item !== type),
              )
            }
            className="rounded-xs outline-blue-700 has-focus-visible:outline-2 has-focus-visible:outline-offset-2 [&>span:first-of-type]:size-4"
          >
            <Checkbox.Indicator />
            <span
              aria-hidden="true"
              className={`size-2 shrink-0 rounded-full ${dotClassName}`}
            />
            <Checkbox.Label typography="body-14-medium" textColor="gray-500">
              {label}
            </Checkbox.Label>
          </Checkbox>
        ))}
      </fieldset>
    </>
  );
}

function HomeCalendarGrid({
  month,
  params,
  selectedCategories,
}: {
  month: Date;
  params: CalendarScheduleParams;
  selectedCategories: string[];
}) {
  const router = useRouter();
  const { data: schedules = [], isPending } = useCalendarSchedules(params);
  const visibleSchedules = selectedCategories.length
    ? schedules.filter(({ type }) => selectedCategories.includes(type))
    : schedules;

  return (
    <section aria-label="월간 일정" aria-busy={isPending}>
      <Calendar
        hideHeader
        month={month}
        events={transformToCalendarEvents(visibleSchedules)}
        onEventClick={(event) => {
          const postId = schedules.find(
            ({ id }) => id === event.id,
          )?.targetPostId;
          if (postId) router.push(`${ROUTES.FEED}/${postId}`);
        }}
        className="min-w-0 md:min-w-0 [&_.bg-blue-100]:bg-blue-200"
      />
    </section>
  );
}
