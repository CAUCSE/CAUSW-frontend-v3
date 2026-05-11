export interface CalendarScheduleItem {
  id: string;
  title: string;
  type: string;
  start: string;
  end: string;
  targetPostId: string | null;
}

export interface CalendarScheduleResponse {
  count: number;
  data: CalendarScheduleItem[];
}
export interface CalendarScheduleParams {
  from?: Date;
  to?: Date;
  types?: string[];
}

export type CalendarScheduleType =
  | 'ACADEMIC'
  | 'DEPARTMENT'
  | 'CCSSAA'
  | 'STUDENT_COUNCIL'
  | 'HOLIDAY';

export const CALENDAR_EVENTS_TYPE_MAP: Record<CalendarScheduleType, string> = {
  ACADEMIC: '학사',
  DEPARTMENT: '학부',
  CCSSAA: '크자회',
  STUDENT_COUNCIL: '집행부',
  HOLIDAY: '공휴일',
};
export type CalendarEventType = 'holiday' | 'event' | 'important';
