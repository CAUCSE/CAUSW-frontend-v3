'use client';

import { useFormContext } from 'react-hook-form';

import { Button, Chip, Close, HStack, VStack } from '@causw/cds';

import {
  ALUMNI_CONTACTS_EDIT_FORM_FIELD,
  useWatchAlumniContactsEditFormField,
} from '@/entities/alumni-contacts';
import { type AlumniContactsEditForm } from '@/entities/alumni-contacts/model';

import { AlumniContactsTechStackAddDialog } from '../alumni-contacts-tech-stack-add-dialog';

export const AlumniContactsEditFormTechStackSection = () => {
  const userTechStack = useWatchAlumniContactsEditFormField(
    ALUMNI_CONTACTS_EDIT_FORM_FIELD.USER_TECH_STACK,
  );

  const { setValue } = useFormContext<AlumniContactsEditForm>();

  const handleDeleteTechStack = (idx: number) => {
    setValue(
      ALUMNI_CONTACTS_EDIT_FORM_FIELD.USER_TECH_STACK,
      userTechStack
        .filter((_, i) => i !== idx)
        .sort((a, b) => a.localeCompare(b)),
      {
        shouldValidate: true,
      },
    );
  };

  return (
    <VStack className="w-full gap-3">
      <HStack gap="sm" className="overflow-x-auto pt-3">
        {userTechStack.map((techStack, idx) => (
          <Chip key={techStack} size="md" color="lightgray">
            {techStack}
            <Button
              type="button"
              className="h-fit w-fit p-0 hover:bg-transparent!"
              onClick={() => handleDeleteTechStack(idx)}
            >
              <Close size={12} color="gray-500" />
            </Button>
          </Chip>
        ))}
      </HStack>
      <AlumniContactsTechStackAddDialog />
    </VStack>
  );
};
