'use client';

import { type ChangeEvent, type KeyboardEvent, useRef, useState } from 'react';

import { useFormContext } from 'react-hook-form';

import { ALUMNI_CONTACTS_EDIT_FORM_FIELD } from '@/entities/alumni-contacts';
import {
  type AlumniContactsEditForm,
  useWatchAlumniContactsEditFormField,
} from '@/entities/alumni-contacts/model';

export const useAlumniContactsSnsAddDialog = () => {
  const { setValue } = useFormContext<AlumniContactsEditForm>();

  const socialLinks = useWatchAlumniContactsEditFormField(
    ALUMNI_CONTACTS_EDIT_FORM_FIELD.SOCIAL_LINKS,
  );

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [newSocialLink, setNewSocialLink] = useState<string>('');
  const addButtonRef = useRef<HTMLButtonElement>(null);

  const handleClickTrigger = () => {
    setIsOpen(true);
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setNewSocialLink('');
    }
    setIsOpen(open);
  };

  const handleNewSocialLinkChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewSocialLink(event.target.value);
  };

  const handleEnterPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      addButtonRef.current?.click();
    }
  };

  const handleClickAddButton = () => {
    if (newSocialLink.trim() === '') {
      return;
    }

    setValue(
      ALUMNI_CONTACTS_EDIT_FORM_FIELD.SOCIAL_LINKS,
      [...socialLinks, newSocialLink].sort((a, b) => a.localeCompare(b)),
      {
        shouldValidate: true,
        shouldDirty: true,
      },
    );
    setNewSocialLink('');
  };

  return {
    isOpen,
    newSocialLink,
    addButtonRef,
    handleClickTrigger,
    handleOpenChange,
    handleNewSocialLinkChange,
    handleEnterPress,
    handleClickAddButton,
  };
};
