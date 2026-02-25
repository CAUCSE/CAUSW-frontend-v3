/** 경조사 승인 상태 */
export type CeremonyState = 'ACCEPT' | 'REJECT' | 'AWAIT' | 'CLOSE';

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

export type CeremonyTypeApi = 'CELEBRATION' | 'CONDOLENCE';

export type CeremonyCategoryApi = 'ETC' | string;

export type RelationType = 'ME' | 'FAMILY' | 'ALUMNI';

export type FamilyRelation = 'SON' | string;

export type AlumniRelation = 'SPOUSE' | string;

// POST /api/v2/ceremonies (multipart/form-data)
export interface CeremonyCreateRequest {
  ceremonyType: CeremonyTypeApi;
  ceremonyCategory: CeremonyCategoryApi;
  ceremonyCustomCategory: string | null;
  startDate: string;
  endDate: string | null;
  startTime: string | null;
  endTime: string | null;
  relationType: RelationType;
  familyRelation: FamilyRelation | null;
  alumniRelation: AlumniRelation | null;
  alumniName: string | null;
  alumniAdmissionYear: string | null;
  content: string | null;
  address: string | null;
  postalAddress: string | null;
  detailedAddress: string | null;
  contact: string | null;
  link: string | null;
  isSetAll: boolean;
  targetAdmissionYears: string[] | null;
}

export interface CeremonyDetailResponse {
  id: string;
  title: string;
  type: string;
  category: string;
  startDate: string;
  endDate: string | null;
  startTime: string | null;
  endTime: string | null;
  applicant: string;
  subject: string;
  content: string | null;
  attachedImageUrlList: string[];
  address: string | null;
  postalAddress: string | null;
  detailedAddress: string | null;
  contact: string | null;
  link: string | null;
  isSetAll: boolean | null;
  targetAdmissionYears: string[] | null;
  state: CeremonyState;
  note: string | null;
}
