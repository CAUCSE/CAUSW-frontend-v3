import { CalendarEvent as CDSEvent } from '@causw/cds';

export type CalendarEvent = Omit<CDSEvent, 'type'> & {
  type: 'holiday' | 'event' | 'important';
};

export interface CalendarEventItem {
  id: number;
  title: string;
  date: string;
  tag: string;
  isUpcoming?: boolean;
  link: string;
}
//TODO : 수정 after api
