'use client';

import { useFormContext } from 'react-hook-form';

import { Button, Chip, Close, HStack, VStack } from '@causw/cds';

import {
  ALUMNI_CONTACTS_EDIT_FORM_FIELD,
  type AlumniContactsEditForm,
  useWatchAlumniContactsEditFormField,
} from '@/entities/alumni-contacts';

import { AlumniContactsInterestDomainAddDialog } from '../alumni-contacts-interest-domain-add-dialog';

export const AlumniContactsEditFormInterestDomainSection = () => {
  const userInterestDomain = useWatchAlumniContactsEditFormField(
    ALUMNI_CONTACTS_EDIT_FORM_FIELD.USER_INTEREST_DOMAIN,
  );

  const { setValue } = useFormContext<AlumniContactsEditForm>();

  const handleDeleteInterestDomain = (idx: number) => {
    setValue(
      ALUMNI_CONTACTS_EDIT_FORM_FIELD.USER_INTEREST_DOMAIN,
      userInterestDomain
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
      {userInterestDomain.length > 0 && (
        <HStack gap="sm" className="overflow-x-auto">
          {userInterestDomain.map((interestDomain, idx) => (
            <Chip key={interestDomain} size="md" color="lightgray">
              {interestDomain}
              <Button
                type="button"
                className="h-fit w-fit p-0 hover:bg-transparent!"
                onClick={() => handleDeleteInterestDomain(idx)}
              >
                <Close size={12} color="gray-500" />
              </Button>
            </Chip>
          ))}
        </HStack>
      )}
      <AlumniContactsInterestDomainAddDialog />
    </VStack>
  );
};
