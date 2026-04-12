/* 사용자 차단 */
export interface BlockUserResponseDto {
  blockId: string;
  blockedUserId: string;
  blockedUserName: string;
  createdAt: string;
}
