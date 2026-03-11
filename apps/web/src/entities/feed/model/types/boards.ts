/** 게시판 기본 정보 */
export interface Board {
  id: string;
  name: string;
}

/** 조회 가능한 게시판 리스트 */
export interface BoardAvailableListResponseDto {
  boards: Board[];
}
