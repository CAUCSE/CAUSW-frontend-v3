'use client';

import { useFormContext } from 'react-hook-form';

import { Button, Chip, Close, HStack, VStack } from '@causw/cds';

import {
  ALUMNI_CONTACTS_EDIT_FORM_FIELD,
  type AlumniContactsEditForm,
  useWatchAlumniContactsEditFormField,
} from '@/entities/alumni-contacts';

import { AlumniContactsInterestTechAddDialog } from '../alumni-contacts-interest-tech-add-dialog';

export const AlumniContactsEditFormInterestTechSection = () => {
  const userInterestTech = useWatchAlumniContactsEditFormField(
    ALUMNI_CONTACTS_EDIT_FORM_FIELD.USER_INTEREST_TECH,
  );
  const { setValue } = useFormContext<AlumniContactsEditForm>();

  const handleDeleteInterestTech = (idx: number) => {
    setValue(
      ALUMNI_CONTACTS_EDIT_FORM_FIELD.USER_INTEREST_TECH,
      userInterestTech
        .filter((_, i) => i !== idx)
        .sort((a, b) => a.localeCompare(b)),
      {
        shouldValidate: true,
        shouldDirty: true,
      },
    );
  };

  return (
    <VStack className="w-full gap-3 pt-3">
      {userInterestTech.length > 0 && (
        <HStack gap="sm" className="overflow-x-auto">
          {userInterestTech.map((interestTech, idx) => (
            <Chip key={interestTech} size="md" color="lightgray">
              {interestTech}
              <Button
                type="button"
                className="h-fit w-fit p-0 hover:bg-transparent!"
                onClick={() => handleDeleteInterestTech(idx)}
              >
                <Close size={12} color="gray-500" />
              </Button>
            </Chip>
          ))}
        </HStack>
      )}
      <AlumniContactsInterestTechAddDialog />
    </VStack>
  );
};
