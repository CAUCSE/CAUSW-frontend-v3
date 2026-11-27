import type { CalendarEvent } from '@causw/cds';

import type { CalendarScheduleItem } from '../model';

const SCHEDULE_COLORS: Partial<Record<string, CalendarEvent['color']>> = {
  ACADEMIC: 'gray',
  DEPARTMENT: 'blue',
  CCSSAA: 'skyblue',
  STUDENT_COUNCIL: 'orange',
  HOLIDAY: 'red',
  CEREMONY: 'purple',
};

export const transformToCalendarEvents = (
  items: CalendarScheduleItem[],
): CalendarEvent[] => {
  return items.map((item) => ({
    id: item.id,
    title: item.title,
    startDate: item.start.split('T')[0],
    endDate: item.end.split('T')[0],
    color: SCHEDULE_COLORS[item.type] ?? 'gray',
  }));
};
