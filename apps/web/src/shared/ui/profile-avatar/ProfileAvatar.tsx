'use client';

import { Avatar } from '@causw/cds';

import { getProfileImageUrl } from '../../lib';
import type { UserProfileImageType } from '../../types';

interface ProfileAvatarProps {
  profileImageType: UserProfileImageType;
  profileImageUrl?: string | null;
  size?: 'lg' | 'sm';
  className?: string;
}

const AVATAR_SIZE_MAP = {
  lg: '88',
  sm: '36',
} as const;

const IMAGE_REQUEST_WIDTH_MAP = {
  lg: Number(AVATAR_SIZE_MAP.lg) * 3,
  sm: Number(AVATAR_SIZE_MAP.sm) * 3,
} as const;

export const ProfileAvatar = ({
  profileImageType,
  profileImageUrl,
  size = 'sm',
  ...props
}: ProfileAvatarProps) => {
  const avatarSize = AVATAR_SIZE_MAP[size];
  const requestWidth = IMAGE_REQUEST_WIDTH_MAP[size];
  const imageSrc = getProfileImageUrl({
    profileImageType,
    profileImageUrl,
    width: requestWidth,
    quality: 90,
  });

  return <Avatar size={avatarSize} src={imageSrc ?? undefined} {...props} />;
};
