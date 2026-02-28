import { useQuery } from '@tanstack/react-query';

import { getCalendarSchedules } from '../../api';
import { calendarQueryKeys } from '../../config';
import { CalendarScheduleParams } from '../../model';

export const useCalendarSchedules = (params: CalendarScheduleParams = {}) => {
  return useQuery({
    queryKey: calendarQueryKeys.list(params),
    queryFn: () => getCalendarSchedules(params),
    staleTime: 1000 * 60 * 5,
    throwOnError: true,
  });
};
