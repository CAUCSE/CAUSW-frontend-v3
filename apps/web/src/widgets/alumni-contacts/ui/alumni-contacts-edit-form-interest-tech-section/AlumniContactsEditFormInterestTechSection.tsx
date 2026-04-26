'use client';

import { Chip, HStack, Text, VStack } from '@causw/cds';

import {
  ALUMNI_CONTACTS_EDIT_FORM_FIELD,
  useWatchAlumniContactsEditFormField,
} from '@/entities/alumni-contacts';

import { AlumniContactsInterestTechAddDialog } from '../alumni-contacts-interest-tech-add-dialog';
import { AlumniContactsInterestTechEditDialog } from '../alumni-contacts-interest-tech-edit-dialog';

export const AlumniContactsEditFormInterestTechSection = () => {
  const userInterestTech = useWatchAlumniContactsEditFormField(
    ALUMNI_CONTACTS_EDIT_FORM_FIELD.USER_INTEREST_TECH,
  );

  return (
    <VStack className="w-full gap-3 pt-3">
      {userInterestTech.length > 0 && (
        <HStack gap="sm" className="overflow-x-auto">
          {userInterestTech.map((interestTech, idx) => (
            <Chip key={interestTech} size="md" color="lightgray">
              <Text typography="body-14-semibold" textColor="gray-500">
                {interestTech}
              </Text>
              <AlumniContactsInterestTechEditDialog interestTechIndex={idx} />
            </Chip>
          ))}
        </HStack>
      )}
      <AlumniContactsInterestTechAddDialog />
    </VStack>
  );
};
