import type { CeremonyType } from '@/shared/types';

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
