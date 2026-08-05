'use client';

import { VStack, Grid } from '@causw/cds';

import {
  AlumniContactsCoffeeChatAvailableToggleButton,
  AlumniContactsContactVisibilityToggleButton,
  AlumniContactsDescriptionTextArea,
} from '@/features/alumni-contacts';

import { AlumniContactsBasicInfo } from '@/entities/alumni-contacts';
import { type GetMyAlumniContactsResponseDto } from '@/entities/alumni-contacts/model';

interface AlumniContactsEditFormHeroProps {
  myAlumniContacts: GetMyAlumniContactsResponseDto;
}

export const AlumniContactsEditFormHero = ({
  myAlumniContacts,
}: AlumniContactsEditFormHeroProps) => {
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
        />
        <AlumniContactsDescriptionTextArea />
        <Grid columns={2} gap="xs" className="overflow-x-auto">
          <AlumniContactsCoffeeChatAvailableToggleButton />
          <AlumniContactsContactVisibilityToggleButton />
        </Grid>
      </VStack>
    </VStack>
  );
};
