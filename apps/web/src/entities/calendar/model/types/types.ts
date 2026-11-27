export interface CalendarScheduleItem {
  id: string;
  title: string;
  type: string;
  start: string;
  end: string;
  targetPostId: string | null;
  color?: 'gray' | 'blue' | 'orange' | 'red' | 'skyblue' | 'purple';
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
  | 'HOLIDAY'
  | 'CEREMONY';

export const CALENDAR_EVENTS_TYPE_MAP: Record<CalendarScheduleType, string> = {
  ACADEMIC: '학사',
  DEPARTMENT: '학부',
  CCSSAA: 'CCSSAA',
  STUDENT_COUNCIL: '학생회',
  HOLIDAY: '공휴일',
  CEREMONY: '경조사',
};
