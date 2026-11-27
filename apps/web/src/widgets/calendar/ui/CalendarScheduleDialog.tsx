'use client';

import type { RefObject } from 'react';

import Link from 'next/link';

import { Button, ChevronRight, Dialog, Text } from '@causw/cds';

import {
  CALENDAR_EVENTS_TYPE_MAP,
  type CalendarScheduleItem,
  type CalendarScheduleType,
  getCalendarScheduleColor,
  getCalendarScheduleLink,
} from '@/entities/calendar';

import { scheduleTime } from '../model/schedule';

const COLOR_LINES = {
  gray: 'bg-gray-100',
  blue: 'bg-blue-200',
  orange: 'bg-orange-100',
  red: 'bg-red-100',
  skyblue: 'bg-skyblue-100',
  purple: 'bg-purple-100',
};

export function CalendarScheduleDialog({
  date,
  items,
  onClose,
  triggerRef,
  onNavigate,
}: {
  date: Date | null;
  items: CalendarScheduleItem[];
  onClose: () => void;
  triggerRef: RefObject<HTMLElement | null>;
  onNavigate: () => void;
}) {
  return (
    <Dialog
      open={date !== null && items.length > 0}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <Dialog.Content
        aria-describedby={undefined}
        className="max-h-[calc(100dvh-2rem)] w-[calc(100vw-2rem)]! max-w-105! gap-6 overflow-y-auto rounded-xl p-4"
        onCloseAutoFocus={(event) => {
          event.preventDefault();
          triggerRef.current?.focus({ preventScroll: true });
        }}
      >
        <Dialog.Title className="typo-subtitle-18-bold text-gray-700">
          {date?.toLocaleDateString('ko-KR', {
            month: 'long',
            day: 'numeric',
            weekday: 'long',
          })}
        </Dialog.Title>
        <div className="flex flex-col gap-4">
          {items.map((item) => {
            const href = getCalendarScheduleLink(item);
            const content = (
              <>
                <span
                  aria-hidden="true"
                  className={`w-1 shrink-0 self-stretch rounded-full ${COLOR_LINES[getCalendarScheduleColor(item)]}`}
                />
                <div className="min-w-0 flex-1">
                  <Text
                    typography="subtitle-16-bold"
                    textColor="gray-700"
                    className="break-words"
                  >
                    {item.title}
                  </Text>
                  <div className="typo-body-14-regular flex flex-wrap items-center gap-x-2 text-gray-500">
                    <span>{scheduleTime(item)}</span>
                    <span aria-hidden="true" className="h-2 w-px bg-gray-200" />
                    <span>
                      {CALENDAR_EVENTS_TYPE_MAP[
                        item.type as CalendarScheduleType
                      ] ?? item.type}
                    </span>
                  </div>
                </div>
                {href && (
                  <ChevronRight size={20} className="shrink-0 text-gray-300" />
                )}
              </>
            );
            const className =
              'flex items-center gap-5 rounded-md py-1 text-left';
            return href ? (
              <Link
                key={item.id}
                href={href}
                className={`${className} hover:bg-gray-50 focus-visible:outline-2 focus-visible:outline-blue-700`}
                onClick={(event) => {
                  if (
                    event.button !== 0 ||
                    event.metaKey ||
                    event.ctrlKey ||
                    event.shiftKey ||
                    event.altKey
                  )
                    return;
                  onNavigate();
                  onClose();
                }}
              >
                {content}
              </Link>
            ) : (
              <div key={item.id} className={className}>
                {content}
              </div>
            );
          })}
        </div>
        <Dialog.Close asChild>
          <Button color="gray" className="h-12 w-full">
            닫기
          </Button>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog>
  );
}
