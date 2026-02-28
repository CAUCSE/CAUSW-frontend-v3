import { API } from '@/shared/api';
import { formatToISOWithTime } from '@/shared/lib';

import {
  CalendarScheduleResponse,
  CalendarScheduleItem,
  CalendarScheduleParams,
} from '../model';

export const getCalendarSchedules = async (
  params: CalendarScheduleParams,
): Promise<CalendarScheduleItem[]> => {
  const query = new URLSearchParams();

  if (params.from) {
    query.append('from', formatToISOWithTime(params.from, 'start'));
  }
  if (params.to) {
    query.append('to', formatToISOWithTime(params.to, 'end'));
  }
  params.types?.forEach((t) => query.append('types', t));

  const response = await API.get<CalendarScheduleResponse>(
    `/api/v2/schedules?${query.toString()}`,
  );

  return response.data ?? [];
};
