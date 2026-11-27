import type { CalendarEvent } from '@causw/cds';

import { ROUTES } from '@/shared/constants';

import type { CalendarScheduleItem } from '../model';

const SCHEDULE_COLORS: Partial<Record<string, CalendarEvent['color']>> = {
  ACADEMIC: 'gray',
  DEPARTMENT: 'blue',
  CCSSAA: 'skyblue',
  STUDENT_COUNCIL: 'orange',
  HOLIDAY: 'red',
  CEREMONY: 'purple',
};

export const getCalendarScheduleColor = (item: CalendarScheduleItem) =>
  item.color ?? SCHEDULE_COLORS[item.type] ?? 'gray';

export const getCalendarScheduleLink = (item: CalendarScheduleItem) => {
  if (item.type === 'CEREMONY') {
    return `${ROUTES.CEREMONY}/${encodeURIComponent(item.id)}`;
  }
  return item.targetPostId
    ? `${ROUTES.FEED}/${encodeURIComponent(item.targetPostId)}`
    : null;
};

export const transformToCalendarEvents = (
  items: CalendarScheduleItem[],
): CalendarEvent[] => {
  return items.map((item) => ({
    id: item.id,
    title: item.title,
    startDate: item.start.split('T')[0],
    endDate: item.end.split('T')[0],
    color: getCalendarScheduleColor(item),
  }));
};
