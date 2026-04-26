'use client';

import {
  type ChangeEvent,
  type CompositionEvent,
  type KeyboardEvent,
  useMemo,
  useRef,
  useState,
} from 'react';

import { useFormContext } from 'react-hook-form';

import {
  ALUMNI_CONTACTS_EDIT_FORM_FIELD,
  type AlumniContactsEditForm,
  useWatchAlumniContactsEditFormField,
} from '@/entities/alumni-contacts';
import { ALUMNI_CONTACTS_EDIT_FORM_MAX_LIMIT } from '@/entities/alumni-contacts/config';

export const useAlumniContactsSnsAddDialog = () => {
  const { setValue } = useFormContext<AlumniContactsEditForm>();

  const socialLinks = useWatchAlumniContactsEditFormField(
    ALUMNI_CONTACTS_EDIT_FORM_FIELD.SOCIAL_LINKS,
  );

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [newSocialLink, setNewSocialLink] = useState<string>('');

  const addButtonRef = useRef<HTMLButtonElement>(null);
  const isComposingRef = useRef(false);

  const canAdd = useMemo(() => {
    return (
      socialLinks.length < ALUMNI_CONTACTS_EDIT_FORM_MAX_LIMIT.SOCIAL_LINKS
    );
  }, [socialLinks]);

  const SNS_URL_PREFIX = 'https://';

  const isValid = useMemo(() => {
    if (newSocialLink.trim() === '') {
      return true;
    }
    return newSocialLink.startsWith(SNS_URL_PREFIX);
  }, [newSocialLink]);

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

  const handleCompositionStart = () => {
    isComposingRef.current = true;
  };

  const handleCompositionEnd = (event: CompositionEvent<HTMLInputElement>) => {
    isComposingRef.current = false;
    setNewSocialLink(event.currentTarget.value);
  };

  const handleEnterPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.nativeEvent.isComposing || isComposingRef.current) {
      return;
    }

    if (event.key === 'Enter') {
      addButtonRef.current?.click();
    }
  };

  const handleClickAddButton = () => {
    if (newSocialLink.trim() === '') {
      return;
    }

    // 중복 SNS 링크 덮어쓰기
    const currentSocialLinkSet = new Set(socialLinks);
    currentSocialLinkSet.add(newSocialLink);

    setValue(
      ALUMNI_CONTACTS_EDIT_FORM_FIELD.SOCIAL_LINKS,
      Array.from(currentSocialLinkSet).sort((a, b) =>
        a.localeCompare(b, 'en-US'),
      ),
      {
        shouldValidate: true,
      },
    );
    setNewSocialLink('');
  };

  return {
    isOpen,
    newSocialLink,
    isValid,
    addButtonRef,
    canAdd,
    handleClickTrigger,
    handleOpenChange,
    handleNewSocialLinkChange,
    handleCompositionStart,
    handleCompositionEnd,
    handleEnterPress,
    handleClickAddButton,
  };
};
