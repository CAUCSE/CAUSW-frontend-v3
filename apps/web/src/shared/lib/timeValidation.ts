const TIME_FORMAT_REGEX = /^\d{2}:\d{2}$/;
const MAX_HOURS = 24;
const MAX_MINUTES = 59;
const MIDNIGHT_MINUTES = 0;

/**
 * HH:MM 형식의 시간 문자열이 유효한지 검증
 * 범위: 00:00 ~ 24:00 (24:00은 자정으로)
 */
export const isValidTimeFormat = (value: string): boolean => {
  if (!TIME_FORMAT_REGEX.test(value)) return false;

  const [hours, minutes] = value.split(':').map(Number);

  const isHoursInRange = hours >= 0 && hours <= MAX_HOURS;
  const isMinutesInRange = minutes >= 0 && minutes <= MAX_MINUTES;
  const isMidnight = hours === MAX_HOURS;

  if (!isHoursInRange || !isMinutesInRange) return false;
  if (isMidnight && minutes !== MIDNIGHT_MINUTES) return false;

  return true;
};

const toDateOnly = (date: Date): number => new Date(date).setHours(0, 0, 0, 0);

/**
 * 종료일시가 시작 일시보다 이전인지 판단
 * - 날짜가 다르면 날짜만으로 비교
 * - 같은 날짜면 양쪽 시간이 모두 유효할 때 시간 비교
 */
export const isEndDateTimeBeforeStart = (
  startDate: Date,
  endDate: Date,
  startTime?: string,
  endTime?: string,
): boolean => {
  const startDateOnly = toDateOnly(startDate);
  const endDateOnly = toDateOnly(endDate);

  if (endDateOnly !== startDateOnly) {
    return endDateOnly < startDateOnly;
  }

  // 같은 날짜면 시간 비교 (양쪽 모두 유효한 시간일 때만)
  const canCompareTime =
    startTime &&
    endTime &&
    isValidTimeFormat(startTime) &&
    isValidTimeFormat(endTime);

  if (canCompareTime) {
    return endTime < startTime;
  }

  return false;
};
