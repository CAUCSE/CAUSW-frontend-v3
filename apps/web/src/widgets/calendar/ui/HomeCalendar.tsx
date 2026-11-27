'use client';

import { type ReactNode, useEffect, useRef, useState } from 'react';

import { Calendar, Checkbox } from '@causw/cds';

import {
  type CalendarScheduleParams,
  transformToCalendarEvents,
  useCalendarMonth,
  useCalendarSchedules,
} from '@/entities/calendar';

import {
  useLocalStorage,
  useScrollRestoration,
  useSessionStorage,
} from '@/shared/hooks';
import { QueryErrorBoundary } from '@/shared/ui';

import { dateKey, schedulesOnDate } from '../model/schedule';

import { CalendarScheduleDialog } from './CalendarScheduleDialog';

const CATEGORIES = [
  { type: 'ACADEMIC', label: '학사', dotClassName: 'bg-[#9ca3af]' },
  { type: 'DEPARTMENT', label: '학부', dotClassName: 'bg-[#60a5fa]' },
  { type: 'CCSSAA', label: 'CCSSAA', dotClassName: 'bg-[#7dd3fc]' },
  { type: 'STUDENT_COUNCIL', label: '학생회', dotClassName: 'bg-[#fb923c]' },
  { type: 'HOLIDAY', label: '공휴일', dotClassName: 'bg-[#f87171]' },
  { type: 'CEREMONY', label: '경조사', dotClassName: 'bg-[#ae71f8]' },
] as const;

export function HomeCalendar({
  userId,
  headerAction,
  banner,
}: {
  userId: string;
  headerAction: ReactNode;
  banner: ReactNode;
}) {
  const { viewMonth, setViewMonth, scheduleApiParams } = useCalendarMonth({
    includeAdjacentDays: true,
  });
  const [selectedCategories, setSelectedCategories] = useLocalStorage<string[]>(
    `calendar-categories:${userId}`,
    [],
    {
      initializeWithValue: false,
      deserializer: (raw) => {
        const parsed: unknown = JSON.parse(raw);
        return Array.isArray(parsed)
          ? parsed.filter((value): value is string =>
              CATEGORIES.some(({ type }) => type === value),
            )
          : [];
      },
    },
  );
  const [savedMonth, setSavedMonth] = useSessionStorage(
    `calendar-month:${userId}`,
    '',
    { initializeWithValue: false },
  );
  useEffect(() => {
    const restoredMonth = new Date(savedMonth + 'T00:00:00');
    if (
      /^\d{4}-\d{2}-01$/.test(savedMonth) &&
      !Number.isNaN(restoredMonth.getTime())
    )
      setViewMonth(restoredMonth);
  }, [savedMonth, setViewMonth]);

  return (
    <>
      <div className="z-sticky tablet:static sticky top-0 bg-white">
        <Calendar.Nav
          month={viewMonth}
          onMonthChange={(month) => {
            setViewMonth(month);
            setSavedMonth(
              dateKey(new Date(month.getFullYear(), month.getMonth(), 1)),
            );
          }}
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
          key={[dateKey(viewMonth), ...selectedCategories].join(':')}
          month={viewMonth}
          params={scheduleApiParams}
          selectedCategories={selectedCategories}
        />
      </QueryErrorBoundary>

      <fieldset className="tablet:grid-cols-3 grid min-w-0 grid-cols-2 gap-x-8 gap-y-2 border-b-[12px] border-gray-100 px-6 py-4">
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
  const gridRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const { saveScrollPosition } = useScrollRestoration('home-calendar-scroll');
  const { data: schedules = [], isPending } = useCalendarSchedules(params);
  const visibleSchedules = selectedCategories.length
    ? schedules.filter(({ type }) => selectedCategories.includes(type))
    : schedules;
  const selectedItems = selectedDate
    ? schedulesOnDate(visibleSchedules, selectedDate)
    : [];

  // CDS 0.1.0의 날짜 셀은 .group이며 일정 블록은 클릭 전파를 막는다.
  // 셀에 날짜와 키보드 동작을 보완하고 capture에서 실제 클릭 날짜를 사용한다.
  useEffect(() => {
    const firstDay = new Date(month.getFullYear(), month.getMonth(), 1);
    firstDay.setDate(1 - firstDay.getDay());
    gridRef.current
      ?.querySelectorAll<HTMLElement>('.group')
      .forEach((cell, index) => {
        const date = new Date(firstDay);
        date.setDate(date.getDate() + index);
        const count = schedulesOnDate(visibleSchedules, date).length;
        cell.dataset.calendarDate = dateKey(date);
        cell.tabIndex = count ? 0 : -1;
        cell.setAttribute('role', 'button');
        cell.setAttribute('aria-disabled', String(!count));
        cell.setAttribute('aria-haspopup', 'dialog');
        cell.setAttribute(
          'aria-label',
          `${date.toLocaleDateString('ko-KR', { month: 'long', day: 'numeric', weekday: 'long' })}, 일정 ${count}개`,
        );
        cell.classList.add(
          'focus-visible:outline-2',
          'focus-visible:outline-blue-700',
        );
        cell.style.cursor = count ? 'pointer' : 'default';
      });
  });

  function openDate(cell: HTMLElement) {
    const date = new Date(cell.dataset.calendarDate + 'T00:00:00');
    if (!schedulesOnDate(visibleSchedules, date).length) return;
    triggerRef.current = cell;
    setSelectedDate(date);
  }

  return (
    <>
      <section
        ref={gridRef}
        aria-label="월간 일정"
        aria-busy={isPending}
        onClickCapture={(event) => {
          const target = event.target as HTMLElement;
          const cell = target.closest<HTMLElement>('[data-calendar-date]');
          if (!cell) return;
          const dateNumber = cell.firstElementChild;
          const eventBlocks = [...(cell.children[1]?.children ?? [])];
          if (
            !dateNumber?.contains(target) &&
            !eventBlocks.some(
              (block) => block.children.length > 0 && block.contains(target),
            )
          )
            return;
          event.stopPropagation();
          openDate(cell);
        }}
        onKeyDown={(event) => {
          if (event.key !== 'Enter' && event.key !== ' ') return;
          const cell = (event.target as HTMLElement).closest<HTMLElement>(
            '[data-calendar-date]',
          );
          if (!cell) return;
          event.preventDefault();
          openDate(cell);
        }}
      >
        <Calendar
          hideHeader
          month={month}
          events={transformToCalendarEvents(visibleSchedules)}
          className="min-w-0 md:min-w-0 [&_.bg-blue-100]:bg-blue-200"
        />
      </section>
      <CalendarScheduleDialog
        date={selectedDate}
        items={selectedItems}
        onClose={() => setSelectedDate(null)}
        triggerRef={triggerRef}
        onNavigate={saveScrollPosition}
      />
    </>
  );
}
