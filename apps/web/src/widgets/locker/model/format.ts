export const formatDateTime = (value?: string | null) => {
  if (!value) return '-';

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${year}.${month}.${day} ${hours}:${minutes}`;
};

export const getPeriodLabel = (startAt?: string, endAt?: string) => {
  if (!startAt || !endAt) return '기간 정보가 없어요';
  return `${formatDateTime(startAt)} - ${formatDateTime(endAt)}`;
};

export const getFloorNameFromDisplayName = (displayName?: string | null) => {
  return displayName?.split(' ')[0] ?? null;
};
