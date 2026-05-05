const getSafeDate = (value?: string | null) => {
  if (!value) return null;

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return date;
};

export const formatDateTime = (value?: string | null) => {
  const date = getSafeDate(value);

  if (!date) {
    return value ?? '-';
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}`;
};

export const formatDateTimeWithMeridiem = (value?: string | null) => {
  const date = getSafeDate(value);

  if (!date) {
    return value ?? '-';
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const meridiem = date.getHours() < 12 ? '오전' : '오후';
  const hours = String(date.getHours() % 12 || 12).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${year}-${month}-${day} ${meridiem} ${hours}:${minutes}`;
};

export const getFloorNameFromDisplayName = (displayName?: string | null) => {
  return displayName?.split(' ')[0] ?? null;
};
