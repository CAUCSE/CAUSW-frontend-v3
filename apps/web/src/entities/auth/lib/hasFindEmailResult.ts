import type { EmailFindResponse } from '../model';

// API 클라이언트가 data: null 응답을 빈 객체로 unwrap하므로 필드 존재 여부로 판별한다.
export const hasFindEmailResult = (
  data: EmailFindResponse | null | undefined,
): data is EmailFindResponse => {
  if (!data) return false;

  return !!data.email?.trim() || (data.socialAccounts?.length ?? 0) > 0;
};
