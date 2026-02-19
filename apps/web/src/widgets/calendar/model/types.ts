import { CalendarEvent as CDSEvent } from '@causw/cds';

export type CalendarEvent = Omit<CDSEvent, 'type'> & {
  type: 'holiday' | 'event' | 'important';
};
