'use client';

import { useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import { VStack, Grid } from '@causw/cds';

import { ProfileImageEditDialog } from '@/widgets/setting';

import {
  // AlumniContactsCoffeeChatAvailableToggleButton,
  AlumniContactsContactVisibilityToggleButton,
  AlumniContactsDescriptionTextArea,
} from '@/features/alumni-contacts';
import { useProfileImageEdit } from '@/features/setting';

import {
  AlumniContactsBasicInfo,
  alumniContactsQueryKeys,
} from '@/entities/alumni-contacts';
import { type GetMyAlumniContactsResponseDto } from '@/entities/alumni-contacts/model';
import { useMyInfoSuspenseQuery } from '@/entities/auth';

interface AlumniContactsEditFormHeroProps {
  myAlumniContacts: GetMyAlumniContactsResponseDto;
}

export const AlumniContactsEditFormHero = ({
  myAlumniContacts,
}: AlumniContactsEditFormHeroProps) => {
  const queryClient = useQueryClient();
  const { data: myInfo } = useMyInfoSuspenseQuery();
  const [isProfileImageDialogOpen, setIsProfileImageDialogOpen] =
    useState(false);
  const { currentProfileImage, handleSubmitProfileImage } = useProfileImageEdit(
    {
      myInfo,
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: alumniContactsQueryKeys.my(),
        });
      },
    },
  );

  return (
    <VStack className="bg-white md:rounded-t-lg md:border md:border-b-0 md:border-gray-200">
      <VStack className="gap-4 p-4 pt-2 md:px-5 md:pt-7">
        <AlumniContactsBasicInfo
          name={myAlumniContacts.name}
          admissionYear={myAlumniContacts.admissionYear}
          academicStatus={myAlumniContacts.academicStatus}
          departmentLabel={myAlumniContacts.departmentDescription}
          profileImage={myAlumniContacts.profileImage}
          isCoffeeChatAvailable={myAlumniContacts.isCoffeeChatAvailable}
          onClickEditPhoto={() => setIsProfileImageDialogOpen(true)}
        />
        <AlumniContactsDescriptionTextArea />
        {/* TODO: 커피챗 행사 기간 이후 노출 예정 */}
        {/* <Grid columns={2} gap="xs" className="overflow-x-auto">
          <AlumniContactsCoffeeChatAvailableToggleButton /> */}
        <Grid columns={1} gap="xs" className="overflow-x-auto">
          <AlumniContactsContactVisibilityToggleButton />
        </Grid>
      </VStack>
      {isProfileImageDialogOpen && (
        <ProfileImageEditDialog
          open={isProfileImageDialogOpen}
          onOpenChange={setIsProfileImageDialogOpen}
          initialValue={currentProfileImage}
          onSubmit={handleSubmitProfileImage}
        />
      )}
    </VStack>
  );
};
