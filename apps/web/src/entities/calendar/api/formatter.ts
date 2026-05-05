import { formatToISOWithTime } from '@/shared/lib';

import { type CalendarScheduleParams } from '../model';

export const formatCalendarParams = (
  params: CalendarScheduleParams,
): string => {
  const query = new URLSearchParams();

  if (params.from) {
    query.append('from', formatToISOWithTime(params.from, 'start'));
  }
  if (params.to) {
    query.append('to', formatToISOWithTime(params.to, 'end'));
  }
  params.types?.forEach((t) => query.append('types', t));

  return query.toString();
};
