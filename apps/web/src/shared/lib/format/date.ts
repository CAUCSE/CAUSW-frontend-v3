/**
 * 날짜를 `YYYY.MM.DD` 형식의 문자열로 변환합니다.
 *
 * @param time ISO 문자열 또는 Date 객체
 * @returns 예: "2024.01.26"
 */
export const formatDateYMD = (time: string | Date) => {
  const date = new Date(time);

  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
    .format(date)
    .replace(/\. /g, '.')
    .replace(/\.$/, '');
};

/**
 * 날짜를 상대 시간 형식으로 변환합니다.
 *
 * 과거:
 * - 1분 미만: "방금 전"
 * - 1시간 미만: "N분 전"
 * - 24시간 미만: "N시간 전"
 *
 * 미래:
 * - 1분 미만: "잠시 후"
 * - 1시간 미만: "N분 후"
 * - 24시간 미만: "N시간 후"
 *
 * 24시간 이상:
 * - 과거: `YYYY.MM.DD`
 * - 미래: `YYYY.MM.DD`
 *
 * @param time ISO 문자열 또는 Date 객체
 * @returns 상대 시간 또는 날짜 문자열
 */
export const formatRelativeTime = (time: string | Date) => {
  const now = new Date();
  const date = new Date(time);

  const diffSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  const absDiff = Math.abs(diffSeconds);

  const isFuture = diffSeconds < 0;

  if (absDiff < 60) {
    return isFuture ? '잠시 후' : '방금 전';
  }

  if (absDiff < 3600) {
    const minutes = Math.floor(absDiff / 60);
    return isFuture ? `${minutes}분 후` : `${minutes}분 전`;
  }

  if (absDiff < 86400) {
    const hours = Math.floor(absDiff / 3600);
    return isFuture ? `${hours}시간 후` : `${hours}시간 전`;
  }

  return formatDateYMD(time);
};

/**
 * "YYYY-MM-DD" 형식을 "YY/MM/DD" 형식으로 변환합니다.
 * 예: "2026-03-22" -> "2026/03/22")
 */
export const formatToYearMonthDay = (dateString?: string | null) => {
  if (!dateString) return '';
  const parts = dateString.split('-');
  if (parts.length !== 3) return dateString;

  const [year, month, day] = parts;

  // 연도 2자리로 하고 싶으면 year -> year.slice(2)
  return `${year}/${month}/${day}`;
};

/**
 * "YYYY-MM-DD" 형식을 "MM/DD" 형식으로 변환합니다.
 * 예: "2026-03-22" -> "03/22"
 */
export const formatToMonthDay = (dateString?: string | null) => {
  if (!dateString) return '';
  const parts = dateString.split('-');
  if (parts.length !== 3) return dateString;

  const [, month, day] = parts;
  return `${month}/${day}`;
};
