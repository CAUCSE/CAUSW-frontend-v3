import { useQuery } from '@tanstack/react-query';

import { CalendarScheduleParams } from '..';
import { getCalendarSchedules } from '../../api';
import { calendarQueryKeys } from '../../config';

export const useCalendarSchedules = (params: CalendarScheduleParams = {}) => {
  return useQuery({
    queryKey: calendarQueryKeys.list(params),
    queryFn: () => getCalendarSchedules(params),
    staleTime: 1000 * 60 * 5,
    throwOnError: true,
  });
};
