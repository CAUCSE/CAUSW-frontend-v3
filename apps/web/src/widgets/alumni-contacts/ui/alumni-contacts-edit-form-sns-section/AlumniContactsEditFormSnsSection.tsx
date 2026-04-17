'use client';

import { useFormContext } from 'react-hook-form';

import { HStack } from '@causw/cds';

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
    <HStack gap="sm" className="overflow-x-auto pt-3 pr-3">
      <AlumniContactsSnsAddDialog />
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
  );
};
