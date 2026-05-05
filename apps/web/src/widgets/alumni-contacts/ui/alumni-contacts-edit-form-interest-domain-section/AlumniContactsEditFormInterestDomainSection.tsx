'use client';

import { Chip, HStack, Text, VStack } from '@causw/cds';

import {
  ALUMNI_CONTACTS_EDIT_FORM_FIELD,
  useWatchAlumniContactsEditFormField,
} from '@/entities/alumni-contacts';

import { AlumniContactsInterestDomainAddDialog } from '../alumni-contacts-interest-domain-add-dialog';
import { AlumniContactsInterestDomainEditDialog } from '../alumni-contacts-interest-domain-edit-dialog';

export const AlumniContactsEditFormInterestDomainSection = () => {
  const userInterestDomain = useWatchAlumniContactsEditFormField(
    ALUMNI_CONTACTS_EDIT_FORM_FIELD.USER_INTEREST_DOMAIN,
  );

  return (
    <VStack className="w-full gap-3 pt-3">
      {userInterestDomain.length > 0 && (
        <HStack gap="sm" className="overflow-x-auto">
          {userInterestDomain.map((interestDomain, idx) => (
            <Chip key={interestDomain} size="md" color="lightgray">
              <Text typography="body-14-semibold" textColor="gray-500">
                {interestDomain}
              </Text>
              <AlumniContactsInterestDomainEditDialog
                interestDomainIndex={idx}
              />
            </Chip>
          ))}
        </HStack>
      )}
      <AlumniContactsInterestDomainAddDialog />
    </VStack>
  );
};
