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

//TODO : HOLIDAY는 기획/COMPETITION는백쪽 수정되면 삭제하기
export type CalendarScheduleType =
  | 'ACADEMIC'
  | 'DEPARTMENT'
  | 'CCSSAA'
  | 'STUDENT_COUNCIL'
  // | 'COMPETITION'
  | 'HOLIDAY';

//TODO : HOLIDAY는 기획/COMPETITION는백쪽 수정되면 삭제하기
export const CALENDAR_EVENTS_TYPE_MAP: Record<CalendarScheduleType, string> = {
  ACADEMIC: '학사',
  DEPARTMENT: '학부',
  CCSSAA: '크자회',
  STUDENT_COUNCIL: '집행부',
  // COMPETITION: '대회/공모전',
  HOLIDAY: '공휴일',
};
export type CalendarEventype = 'holiday' | 'event' | 'important';
