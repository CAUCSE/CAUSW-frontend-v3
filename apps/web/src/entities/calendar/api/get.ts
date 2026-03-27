import { API } from '@/shared/api';
import { withQuery } from '@/shared/utils';

import {
  type CalendarScheduleResponse,
  type CalendarScheduleItem,
  type CalendarScheduleParams,
} from '../model';

import { formatCalendarParams } from './formatter';

export const getCalendarSchedules = async (
  params: CalendarScheduleParams,
): Promise<CalendarScheduleItem[]> => {
  const queryString = formatCalendarParams(params);
  const url = withQuery('/api/v2/schedules', queryString);

  const response = await API.get<CalendarScheduleResponse>(url);
  return response.data ?? [];
};
