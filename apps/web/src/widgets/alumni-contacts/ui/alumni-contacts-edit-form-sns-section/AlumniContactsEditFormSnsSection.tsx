'use client';

import { useFormContext } from 'react-hook-form';

import { HStack, Text, VStack } from '@causw/cds';

import { AlumniContactsEditFormSnsItem } from '@/features/alumni-contacts';

import { ALUMNI_CONTACTS_EDIT_FORM_FIELD } from '@/entities/alumni-contacts';
import {
  type AlumniContactsEditForm,
  useWatchAlumniContactsEditFormField,
} from '@/entities/alumni-contacts/model';

import { AlumniContactsSnsAddDialog } from '../alumni-contacts-sns-add-dialog';

export const AlumniContactsEditFormSnsSection = () => {
  const { setValue } = useFormContext<AlumniContactsEditForm>();

  const socialLinks = useWatchAlumniContactsEditFormField(
    ALUMNI_CONTACTS_EDIT_FORM_FIELD.SOCIAL_LINKS,
  );

  const handleDeleteSocialLink = (socialLink: string) => {
    setValue(
      ALUMNI_CONTACTS_EDIT_FORM_FIELD.SOCIAL_LINKS,
      socialLinks
        .filter((link) => link !== socialLink)
        .sort((a, b) => a.localeCompare(b)),
      {
        shouldValidate: true,
        shouldDirty: true,
      },
    );
  };

  return (
    <VStack className="w-full gap-3">
      <HStack gap="sm" className="overflow-x-auto pt-3 pr-3">
        {socialLinks.map((socialLink) => {
          return (
            <AlumniContactsEditFormSnsItem
              key={socialLink}
              socialLink={socialLink}
              onClickDelete={() => handleDeleteSocialLink(socialLink)}
            />
          );
        })}
      </HStack>
      <VStack gap="sm">
        <AlumniContactsSnsAddDialog />
        <Text
          typography="body-14-regular"
          textColor="gray-400"
          className="text-center"
        >
          최대 10개까지 등록 가능합니다.
        </Text>
      </VStack>
    </VStack>
  );
};
