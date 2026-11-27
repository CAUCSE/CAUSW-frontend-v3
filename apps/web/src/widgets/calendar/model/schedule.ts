import type { CalendarScheduleItem } from '@/entities/calendar';

export function dateKey(date: Date) {
  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, '0'),
    String(date.getDate()).padStart(2, '0'),
  ].join('-');
}

export function schedulesOnDate(items: CalendarScheduleItem[], date: Date) {
  const key = dateKey(date);
  return items.filter(
    (item) => item.start.slice(0, 10) <= key && item.end.slice(0, 10) >= key,
  );
}

export function scheduleTime(item: CalendarScheduleItem) {
  const start = item.start.split('T')[1]?.slice(0, 5);
  const end = item.end.split('T')[1]?.slice(0, 5);
  if (
    !start ||
    !end ||
    (start === '00:00' && (end === '23:59' || end === '00:00'))
  )
    return '종일';
  return `${start}–${end}`;
}
