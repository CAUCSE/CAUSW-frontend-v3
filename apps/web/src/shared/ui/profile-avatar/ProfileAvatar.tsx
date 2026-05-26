'use client';

import { type ComponentProps } from 'react';

import { Avatar } from '@causw/cds';

import { getProfileImageUrl } from '../../lib';
import type { UserProfileImageType } from '../../types';

type BaseAvatarProps = Omit<ComponentProps<typeof Avatar>, 'size' | 'src'>;

interface ProfileAvatarProps extends BaseAvatarProps {
  profileImageType: UserProfileImageType;
  profileImageUrl?: string | null;
  size: number;
}

export const ProfileAvatar = ({
  profileImageType,
  profileImageUrl,
  size,
  ...props
}: ProfileAvatarProps) => {
  const requestWidth = size * 3;
  const imageSrc = getProfileImageUrl({
    profileImageType,
    profileImageUrl,
    width: requestWidth,
    quality: 90,
  });

  return <Avatar size={size} src={imageSrc ?? undefined} {...props} />;
};
