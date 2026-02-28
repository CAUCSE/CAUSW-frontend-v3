import { CalendarScheduleItem, CalendarEventype } from '../model';
export const transformToCalendarEvents = (items: CalendarScheduleItem[]) => {
  return items.map((item) => ({
    id: item.id,
    title: item.title,
    startDate: item.start.split('T')[0],
    endDate: item.end.split('T')[0],
    type: (item.type === 'HOLIDAY' ? 'holiday' : 'event') as CalendarEventype,
  }));
};
