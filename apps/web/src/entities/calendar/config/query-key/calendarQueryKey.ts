import { type CalendarScheduleParams } from '../../model';

export const calendarQueryKeys = {
  all: ['calendar'] as const,
  list: (params: CalendarScheduleParams) =>
    [...calendarQueryKeys.all, params] as const,
};
