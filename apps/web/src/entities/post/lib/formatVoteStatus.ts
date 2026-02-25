/**
 * 투표 종료 상태를 반환합니다.
 *
 * - 마감됨: "투표 종료됨"
 * - 1시간 미만: "N분 후 종료"
 * - 24시간 미만: "N시간 후 종료"
 * - 24시간 이상: "N일 후 종료"
 */
export const formatVoteStatus = (endTime: string | Date) => {
  const now = new Date();
  const end = new Date(endTime);

  const diffSeconds = Math.floor((end.getTime() - now.getTime()) / 1000);

  if (diffSeconds <= 0) {
    return '투표 종료됨';
  }

  const minutes = Math.floor(diffSeconds / 60);
  const hours = Math.floor(diffSeconds / 3600);
  const days = Math.floor(diffSeconds / 86400);

  if (diffSeconds < 3600) {
    return `${Math.max(1, minutes)}분 후 종료`;
  }

  if (diffSeconds < 86400) {
    return `${hours}시간 후 종료`;
  }

  return `${days}일 후 종료`;
};
