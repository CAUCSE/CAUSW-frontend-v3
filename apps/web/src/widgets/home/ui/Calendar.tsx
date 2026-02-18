'use client';
//TODO : ArrowRIght 아이콘 적용되면 ArrowDown 아이콘 추가
import { useState } from 'react';

import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameDay,
  isSameMonth,
  getDate,
  differenceInCalendarDays,
} from 'date-fns';

import { ArrowDown, Button, Text } from '@causw/cds';

export type CalendarEvent = {
  id: number | string;
  title: string;
  startDate: string;
  endDate?: string;
  type: 'holiday' | 'event' | 'important';
  isRange?: boolean;
};

interface CalendarProps {
  className?: string;
  defaultMonth?: Date;
  today?: Date;
  events?: CalendarEvent[];
  onDateClick?: (date: Date) => void;
}

export function Calendar({
  className,
  defaultMonth = new Date(),
  today = new Date(),
  events = [],
}: CalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(defaultMonth);

  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const days = eachDayOfInterval({
    start: startDate,
    end: endDate,
  });

  const weekDays = ['일', '월', '화', '수', '목', '금', '토'];

  const getEventsForDay = (date: Date) => {
    return events.filter((event) => {
      const eventStart = new Date(event.startDate);
      eventStart.setHours(0, 0, 0, 0);

      if (event.endDate) {
        const eventEnd = new Date(event.endDate);
        eventEnd.setHours(0, 0, 0, 0);

        const current = new Date(date);
        current.setHours(0, 0, 0, 0);

        return current >= eventStart && current <= eventEnd;
      }

      return isSameDay(eventStart, date);
    });
  };

  return (
    <div
      className={`w-full rounded-[20px] bg-white p-4 shadow-sm ${className}`}
    >
      <div className="flex flex-col items-center gap-4">
        {/* Header */}
        <div className="flex w-full items-center justify-between px-4">
          <Button
            onClick={prevMonth}
            color="white"
            className="flex h-[26px] w-[26px] items-center justify-center rounded-[0.5rem] border border-gray-200 bg-white"
          >
            <ArrowDown size={16} className="block shrink-0 rotate-90" />
          </Button>

          <Text typography="subtitle-16-bold">
            {format(currentMonth, 'yyyy년 M월')}
          </Text>
          <Button
            onClick={nextMonth}
            color="white"
            className="flex h-[26px] w-[26px] items-center justify-center rounded-[0.5rem] border border-gray-200 bg-white"
          >
            <ArrowDown size={16} className="block shrink-0 rotate-270" />
          </Button>
        </div>

        {/* Days Header */}
        <div className="grid w-full grid-cols-7 text-center">
          {weekDays.map((day) => (
            <div key={day} className="flex h-10 items-center justify-center">
              <Text typography="body-14-regular" textColor="gray-400">
                {day}
              </Text>
            </div>
          ))}
        </div>

        {/* Days Grid */}
        <div className="grid w-full grid-cols-7 gap-y-4">
          {days.map((day) => {
            const isCurrentMonth = isSameMonth(day, monthStart);
            if (!isCurrentMonth) return <div key={day.toString()} />;

            const isTodayDate = isSameDay(day, today);
            const dayEvents = getEventsForDay(day);

            return (
              <div
                key={day.toString()}
                className="flex min-h-[50px] flex-col items-center gap-1"
              >
                {/* Date Number */}
                <div
                  className={`flex h-[30px] w-[30px] items-center justify-center rounded-lg ${
                    isTodayDate ? 'bg-gray-700' : 'bg-white'
                  }`}
                >
                  <Text
                    typography="body-15-semibold"
                    textColor={isTodayDate ? 'white' : 'gray-700'}
                  >
                    {getDate(day)}
                  </Text>
                </div>

                {/* Events */}
                <div className="flex w-full flex-col gap-[2px]">
                  {dayEvents.map((event, idx) => {
                    // Logic for visual rendering
                    const eventStart = new Date(event.startDate);
                    eventStart.setHours(0, 0, 0, 0);

                    const eventEnd = event.endDate
                      ? new Date(event.endDate)
                      : eventStart;
                    eventEnd.setHours(0, 0, 0, 0);

                    const current = new Date(day);
                    current.setHours(0, 0, 0, 0);

                    const isRange =
                      event.endDate &&
                      eventStart.getTime() !== eventEnd.getTime();

                    const isEventStart =
                      current.getTime() === eventStart.getTime();
                    const isEventEnd = current.getTime() === eventEnd.getTime();
                    const isWeekStart = day.getDay() === 0; // Sunday
                    const isWeekEnd = day.getDay() === 6; // Saturday

                    const connectsLeft =
                      isRange && !isEventStart && !isWeekStart;
                    const connectsRight = isRange && !isEventEnd && !isWeekEnd;

                    // Text visibility: Show in the middle of the visible span
                    const weekStart = startOfWeek(day);
                    const weekEnd = endOfWeek(day);

                    // Clamp event range to current week
                    const visibleStart =
                      eventStart > weekStart ? eventStart : weekStart;
                    const visibleEnd = eventEnd < weekEnd ? eventEnd : weekEnd;

                    const spanDays =
                      differenceInCalendarDays(visibleEnd, visibleStart) + 1;

                    const showTitle = isSameDay(day, visibleStart);

                    // Styling classes
                    const zIndex = showTitle ? 'z-20' : 'z-10';
                    const baseClasses = `flex h-5 items-center justify-center px-1 text-[11px] font-medium leading-none tracking-tight relative ${zIndex}`;
                    const colorClasses =
                      event.type === 'holiday'
                        ? 'bg-[#FFEFEE] text-red-400'
                        : 'bg-gray-100 text-gray-500';

                    const leftClass = connectsLeft
                      ? 'rounded-l-none -ml-[1px] border-l-0'
                      : 'rounded-l-md ml-[2px]';

                    const rightClass = connectsRight
                      ? 'rounded-r-none -mr-[1px] border-r-0'
                      : 'rounded-r-md mr-[2px]';

                    return (
                      <div
                        key={`${event.id}-${idx}`}
                        className={`${baseClasses} ${colorClasses} ${leftClass} ${rightClass}`}
                      >
                        {showTitle && (
                          <span
                            className="absolute top-1/2 left-[12px] -translate-y-1/2 truncate text-center"
                            style={{ width: `calc(${spanDays} * 100% - 24px)` }}
                          >
                            {event.title}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
