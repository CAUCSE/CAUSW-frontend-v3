'use client';

import {
  ALUMNI_CONTACTS_CONTACT_ACTION,
  type AlumniContactsContactActionType,
} from '@/entities/alumni-contacts';

import { toast } from '@/shared/model';

export const useAlumniContactsContactAction = () => {
  const handleClickContactActionButton = async (
    type: AlumniContactsContactActionType,
    value: string,
  ) => {
    const isMobileUA =
      typeof navigator !== 'undefined' &&
      /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);

    if (isMobileUA) {
      window.location.href = `${ALUMNI_CONTACTS_CONTACT_ACTION[type].mobileUrl}${value}`;
      return;
    }

    try {
      await navigator.clipboard.writeText(value);
      toast.success(ALUMNI_CONTACTS_CONTACT_ACTION[type].copySuccessText);
    } catch {
      toast.error(ALUMNI_CONTACTS_CONTACT_ACTION[type].copyErrorText);
    }
  };

  return {
    handleClickContactActionButton,
  };
};
