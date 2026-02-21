/** 경조사 승인 상태 */
export type CeremonyState = 'ACCEPT' | 'REFUSED' | 'AWAIT';

/** 경조사 종류 (경사/조사) */
export type CeremonyType = '경사' | '조사';

/** 경조사 카테고리 (세부 분류) */
export type CeremonyCategory =
  | '결혼식'
  | '돌잔치'
  | '개업'
  | '생신잔치'
  | '장례식'
  | '사고'
  | '투병'
  | string;

/** 경조사 아이템 */
export interface CeremonyItem {
  id: string;
  title: string;
  type: CeremonyType;
  category: CeremonyCategory;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  state: CeremonyState;
}

/** 경조사 목록 페이지네이션 응답 (data 필드) */
export interface CeremonyListData {
  content: CeremonyItem[];
  totalElements: number;
  totalPages: number;
  last: boolean;
  first: boolean;
  size: number;
  number: number;
  numberOfElements: number;
  empty: boolean;
}

/** 경조사 필터 탭 타입 */
export type CeremonyFilterType = '전체' | '경사' | '조사';
