import { useQuery } from '@tanstack/react-query';

import { QUERY_STALE_TIME } from '@/shared/constants';

import { CalendarScheduleParams } from '..';
import { getCalendarSchedules } from '../../api';
import { calendarQueryKeys } from '../../config';

export const useCalendarSchedules = (params: CalendarScheduleParams = {}) => {
  return useQuery({
    queryKey: calendarQueryKeys.list(params),
    queryFn: () => getCalendarSchedules(params),
    staleTime: QUERY_STALE_TIME.DEFAULT,
    throwOnError: true,
  });
};
