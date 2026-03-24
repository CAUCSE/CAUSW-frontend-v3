'use client';

import { useState } from 'react';

import { Box, VStack } from '@causw/cds';

import { type AlumniDetailResponseDto } from '@/entities/alumni-contacts/types';
import { ActionButtons } from '@/entities/profile';

import { CardHeader } from './CardHeader';
import { ProfileInfo } from './ProfileInfo';

interface AlumniDetailCardProps {
  data: AlumniDetailResponseDto;
  isMyProfile?: boolean;
  isEditing?: boolean;
  onActionClick?: () => void;
  onOpenDialog?: (type: string, initialValue?: string | boolean) => void;
}

export const AlumniDetailCard = ({
  data,
  isMyProfile,
  isEditing,
  onActionClick,
  onOpenDialog,
}: AlumniDetailCardProps) => {
  const [isMobile] = useState(
    () =>
      typeof navigator !== 'undefined' &&
      /Mobi|Android/i.test(navigator.userAgent),
  );

  return (
    <Box className="rounded-none bg-gradient-to-b from-[#4C688F] to-[#1E2E3F] pb-6 md:rounded-t-2xl">
      <CardHeader
        isMyProfile={isMyProfile}
        isEditing={isEditing}
        onActionClick={onActionClick}
      />

      <VStack align="start" gap="none" className="px-6">
        <ProfileInfo
          data={data}
          isEditing={isEditing}
          onOpenDialog={onOpenDialog}
        />

        <ActionButtons
          data={data}
          isEditing={isEditing}
          isMobile={isMobile}
          onOpenDialog={onOpenDialog}
        />
      </VStack>
    </Box>
  );
};
