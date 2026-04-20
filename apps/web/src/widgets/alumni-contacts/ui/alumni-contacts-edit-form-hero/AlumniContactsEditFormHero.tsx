'use client';

import { HStack, Mail, Text, VStack } from '@causw/cds';

import { AlumniContactsBasicInfo } from '@/entities/alumni-contacts';
import {
  useAlumniContactsHeaderBoundaryContext,
  type GetMyAlumniContactsResponseDto,
} from '@/entities/alumni-contacts/model';

import { AlumniContactsContactVisibilityDialog } from '../alumni-contacts-contact-visibility-dialog';
import { AlumniContactsDescriptionEditDialog } from '../alumni-contacts-description-edit-dialog';

interface AlumniContactsEmailProps {
  email: string;
}

const AlumniContactsEmail = ({ email }: AlumniContactsEmailProps) => {
  return (
    <HStack className="items-center gap-1.5 rounded-sm bg-gray-100 px-3 py-2">
      <Mail size={16} />
      <Text typography="body-14-semibold" textColor="gray-500">
        {email}
      </Text>
    </HStack>
  );
};

interface AlumniContactsEditFormHeroProps {
  myAlumniContacts: GetMyAlumniContactsResponseDto;
}

export const AlumniContactsEditFormHero = ({
  myAlumniContacts,
}: AlumniContactsEditFormHeroProps) => {
  const { alumniContactsHeroRef } = useAlumniContactsHeaderBoundaryContext();

  return (
    <VStack
      className="bg-linear-to-b from-[#4C688F] to-[#1E2E3F]"
      ref={alumniContactsHeroRef}
    >
      <VStack className="gap-4 p-6">
        <AlumniContactsBasicInfo
          name={myAlumniContacts.name}
          admissionYear={myAlumniContacts.admissionYear}
          academicStatus={myAlumniContacts.academicStatus}
          profileImageUrl={myAlumniContacts.profileImage.profileImageUrl}
        />
        <AlumniContactsDescriptionEditDialog />
        <HStack gap="md">
          <AlumniContactsContactVisibilityDialog />
          <AlumniContactsEmail email={myAlumniContacts.email} />
        </HStack>
      </VStack>
    </VStack>
  );
};
