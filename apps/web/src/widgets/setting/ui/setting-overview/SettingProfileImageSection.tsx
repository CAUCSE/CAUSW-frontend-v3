'use client';

import * as React from 'react';

import { VStack } from '@causw/cds';

import { ProfileImageEditDialog } from '@/widgets/setting';

import {
  ProfileImageEditButton,
  useProfileImageEdit,
} from '@/features/setting';

import { useMyInfoSuspenseQuery } from '@/entities/auth';
import { ProfileInfo } from '@/entities/setting';

export const SettingProfileImageSection = () => {
  const { data: myInfo } = useMyInfoSuspenseQuery();
  const [profileImageDialogOpen, setProfileImageDialogOpen] =
    React.useState(false);
  const { currentProfileImage, handleSubmitProfileImage } = useProfileImageEdit(
    {
      myInfo,
    },
  );

  return (
    <>
      <VStack align="center" gap="xs">
        <ProfileImageEditButton
          onClick={() => setProfileImageDialogOpen(true)}
          profileImageType={currentProfileImage.profileImageType}
          profileImageUrl={currentProfileImage.profileImageUrl}
        />

        <ProfileInfo name={myInfo.name} admissionYear={myInfo.admissionYear} />
      </VStack>

      {profileImageDialogOpen && (
        <ProfileImageEditDialog
          open={profileImageDialogOpen}
          onOpenChange={setProfileImageDialogOpen}
          initialValue={currentProfileImage}
          onSubmit={handleSubmitProfileImage}
        />
      )}
    </>
  );
};
