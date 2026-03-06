import type {
  CeremonyType,
  CeremonyTypeApi,
  CeremonyCategoryApi,
  RelationType,
} from '@/entities/ceremony';

import type { CategoryOption } from './types';

export const CUSTOM_VALUE = 'custom';

export const CEREMONY_TYPES: CeremonyType[] = ['경사', '조사'];

export const HAPPY_CATEGORIES: CategoryOption[] = [
  { value: '결혼식', emoji: '💍' },
  { value: '돌잔치', emoji: '👶' },
  { value: '개업', emoji: '🏪' },
  { value: '생신잔치', emoji: '🎁' },
  { value: CUSTOM_VALUE, label: '직접 입력' },
];

export const SAD_CATEGORIES: CategoryOption[] = [
  { value: '장례식' },
  { value: '사고' },
  { value: '투병' },
  { value: CUSTOM_VALUE, label: '직접 입력' },
];

export const CATEGORY_MAP: Record<CeremonyType, CategoryOption[]> = {
  경사: HAPPY_CATEGORIES,
  조사: SAD_CATEGORIES,
};

export const RELATIONSHIP_OPTIONS = [
  '본인',
  '가족',
  '동문소식 대신 전달',
] as const;

export const FAMILY_RELATIONS = [
  '배우자',
  '부',
  '모',
  '장인',
  '장모',
  '아들',
  '딸',
  '형제',
  '자매',
  '남매',
  '조부',
  '조모',
] as const;

export const ALUMNI_RELATIONS = [
  '동문 본인',
  '배우자',
  '부',
  '모',
  '장인',
  '장모',
  '아들',
  '딸',
] as const;

/** 경조사 분류 API 매핑 */
export const CEREMONY_TYPE_API_MAP: Record<CeremonyType, CeremonyTypeApi> = {
  경사: 'CELEBRATION',
  조사: 'CONDOLENCE',
};

/** 카테고리 API 매핑 */
export const CATEGORY_API_MAP: Record<string, CeremonyCategoryApi> = {
  결혼식: 'MARRIAGE',
  돌잔치: 'FIRST_BIRTHDAY',
  개업: 'OPENING',
  생신잔치: 'BIRTHDAY',
  장례식: 'FUNERAL',
  사고: 'ACCIDENT',
  투병: 'ILLNESS',
};

/** 관계 API 매핑 */
export const RELATIONSHIP_API_MAP: Record<string, RelationType> = {
  본인: 'ME',
  가족: 'FAMILY',
  '동문소식 대신 전달': 'INSTEAD',
};
