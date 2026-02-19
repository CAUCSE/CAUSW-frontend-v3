'use client';
// TODO : 요일 길 때 글자 잘리는 거 디자인 시스템 수정 후 확인
import {
  Calendar as CDSCalendar,
  type CalendarProps as CDSCalendarProps,
} from '@causw/cds';

export type CalendarProps = CDSCalendarProps;

export function Calendar(props: CalendarProps) {
  return (
    <div className="calendar-fix">
      <CDSCalendar className="calendar-root !py-4" {...props} />

      <style jsx global>{`
        /* wrapper padding (className으로도 안 먹을 때 대비) */
        .calendar-fix .calendar-root {
          padding: 8px 16px !important;
        }

        /* 헤더 네비 버튼: Calendar 내부에서 type="button"은 사실상 저 2개뿐이라 안전 */
        .calendar-fix .calendar-root button[type='button'] {
          width: 26px !important;
          height: 26px !important;
          padding: 0 !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
        }

        .calendar-fix .calendar-root button[type='button'] svg {
          width: 6px !important;
          height: 10px !important;
        }
      `}</style>
    </div>
  );
}
