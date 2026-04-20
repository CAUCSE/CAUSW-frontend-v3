import { DEFAULT_PROFILE_IMAGE_TYPES } from '@/shared/constants';
import type {
  DefaultProfileImageType,
  UserProfileImageType,
} from '@/shared/types';

import { getOptimizedImageUrl } from '../cloudfront';

interface ProfileImageProps {
  profileImageType: UserProfileImageType;
  profileImageUrl?: string | null;
  width?: number;
  quality?: number;
}

const DEFAULT_PROFILE_AVATAR_PATHS = Object.fromEntries(
  DEFAULT_PROFILE_IMAGE_TYPES.map((type) => [
    type,
    `/images/profile/${type}.svg`,
  ]),
) as Record<DefaultProfileImageType, string>;

const DEFAULT_PROFILE_IMAGE_URL_MAP: Record<
  Exclude<UserProfileImageType, 'CUSTOM'>,
  string
> = {
  ...DEFAULT_PROFILE_AVATAR_PATHS,
  GHOST: '/images/profile/MALE_1.svg',
};

export const getProfileImageUrl = ({
  profileImageType,
  profileImageUrl,
  width,
  quality,
}: ProfileImageProps) => {
  if (profileImageType === 'CUSTOM') {
    if (!profileImageUrl) {
      return '';
    }

    return getOptimizedImageUrl(profileImageUrl, {
      width,
      quality,
      format: 'webp',
    });
  }

  return DEFAULT_PROFILE_IMAGE_URL_MAP[profileImageType];
};
