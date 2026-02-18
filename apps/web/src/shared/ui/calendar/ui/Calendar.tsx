import {
  Calendar as CDSCalendar,
  type CalendarProps as CDSCalendarProps,
} from '@causw/cds';

export type CalendarProps = CDSCalendarProps;

export function Calendar(props: CalendarProps) {
  return (
    <div className="calendar-fix">
      <style jsx global>{`
        /* 1. 이벤트 컨테이너들: 글자가 칸(하루)을 넘어갈 수 있도록 오버플로우 개방 */
        .calendar-fix [class*='eventList'],
        .calendar-fix [class*='eventItemHeight'],
        .calendar-fix [class*='eventItem'] {
          overflow: visible !important;
          position: relative !important;
        }

        /* 2. 텍스트 래퍼: 부모 크기(1칸)를 넘어서 렌더링 허용 */
        .calendar-fix [class*='textWrapper'] {
          width: 100% !important;
          overflow: visible !important; /* 여기가 visible이어야 자식(3일치)이 보임 */
          display: block !important;
          position: relative !important;
        }

        /* 3. 실제 글자(span) */
        .calendar-fix [class*='textWrapper'] span {
          display: block !important;

          /* 인라인 스타일 width(calc)를 존중하되, 최소 1칸은 차지 */
          min-width: 100% !important;
          max-width: none !important;
          /* 절대 width !important를 주지 않음으로써 인라인 width 사용 유도 */

          /* 말줄임표 처리: 여기가 실제 visible 영역의 끝이 됨 (인라인 width 기준) */
          white-space: nowrap !important;
          overflow: hidden !important;
          text-overflow: ellipsis !important;

          /* 위치 리셋 */
          position: relative !important;
          left: auto !important;
          right: auto !important;
          text-align: left !important;
          padding-left: 4px !important;
          z-index: 50 !important;
        }

        /* 3. 아이콘 및 헤더 레이아웃 수정 */
        .calendar-fix button[class*='navButton'] {
          width: 32px !important;
          height: 32px !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          padding: 0 !important;
        }

        .calendar-fix [class*='navIcon'] {
          width: 16px !important;
          height: 16px !important;
        }

        .calendar-fix [class*='header'] {
          margin-bottom: 20px !important;
          padding: 0 16px !important;
        }
      `}</style>
      <CDSCalendar {...props} />
    </div>
  );
}
