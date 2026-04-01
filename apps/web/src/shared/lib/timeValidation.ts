const TIME_FORMAT_REGEX = /^\d{2}:\d{2}$/;
const MAX_HOURS = 23;
const MAX_MINUTES = 59;

/**
 * HH:MM 형식의 시간 문자열이 유효한지 검증
 * 허용 범위: 00:00 ~ 23:59
 */
export const isValidTimeFormat = (value: string): boolean => {
  if (!TIME_FORMAT_REGEX.test(value)) return false;

  const [hours, minutes] = value.split(':').map(Number);

  return (
    hours >= 0 && hours <= MAX_HOURS && minutes >= 0 && minutes <= MAX_MINUTES
  );
};

const toDateOnly = (date: Date): number => new Date(date).setHours(0, 0, 0, 0);

/**
 * 종료일시가 시작 일시보다 이전인지 판단
 * - 날짜가 다르면 날짜만으로 비교
 * - 같은 날짜면 양쪽 시간이 모두 유효할 때 시간까지 비교
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
