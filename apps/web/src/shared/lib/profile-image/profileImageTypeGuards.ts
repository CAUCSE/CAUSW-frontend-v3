import { DEFAULT_PROFILE_IMAGE_TYPES } from '@/shared/constants';
import type { DefaultProfileImageType } from '@/shared/types';

const DEFAULT_PROFILE_IMAGE_TYPE_SET = new Set<string>(
  DEFAULT_PROFILE_IMAGE_TYPES,
);

export const isCustomProfileImageType = (value: string): value is 'CUSTOM' =>
  value === 'CUSTOM';

export const isDefaultProfileImageType = (
  value: string,
): value is DefaultProfileImageType =>
  DEFAULT_PROFILE_IMAGE_TYPE_SET.has(value);
