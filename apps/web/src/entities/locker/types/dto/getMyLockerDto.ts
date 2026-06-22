export interface GetMyLockerResponseDto {
  hasLocker: boolean;
  lockerId: string | null;
  displayName: string | null;
  expiredAt: string | null;
}
