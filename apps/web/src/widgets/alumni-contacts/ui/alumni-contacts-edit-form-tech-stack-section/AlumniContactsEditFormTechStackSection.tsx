'use client';

import { Chip, HStack, Text, VStack } from '@causw/cds';

import {
  ALUMNI_CONTACTS_EDIT_FORM_FIELD,
  useWatchAlumniContactsEditFormField,
} from '@/entities/alumni-contacts';

import { AlumniContactsTechStackAddDialog } from '../alumni-contacts-tech-stack-add-dialog';
import { AlumniContactsTechStackEditDialog } from '../alumni-contacts-tech-stack-edit-dialog';

export const AlumniContactsEditFormTechStackSection = () => {
  const userTechStack = useWatchAlumniContactsEditFormField(
    ALUMNI_CONTACTS_EDIT_FORM_FIELD.USER_TECH_STACK,
  );

  return (
    <VStack className="w-full gap-3">
      <HStack gap="sm" className="overflow-x-auto pt-3">
        {userTechStack.map((techStack, idx) => (
          <Chip
            key={techStack}
            size="sm"
            color="lightgray"
            className="items-center gap-1 px-2.5"
          >
            <Text typography="body-14-semibold" textColor="gray-500">
              {techStack}
            </Text>
            <AlumniContactsTechStackEditDialog techStackIndex={idx} />
          </Chip>
        ))}
      </HStack>
      <AlumniContactsTechStackAddDialog />
    </VStack>
  );
};
