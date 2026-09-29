'use client';

import { useState } from 'react';

import { Browser } from '@capacitor/browser';

import { EXTERNAL_ROUTES } from '@/shared/constants';
import { trackMixpanelEvent } from '@/shared/lib/analytics';

export const useAlumniContactsContactBottomSheet = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClickContact = () => {
    setIsOpen(true);
  };

  const handleClickCoffeeChat = () => {
    trackMixpanelEvent({ name: 'contact_profile_coffeechat' });
    void Browser.open({
      url: EXTERNAL_ROUTES.ALUMNI_CONTACTS_COFFEE_CHAT_FORM,
    });
  };

  return {
    isOpen,
    setIsOpen,
    handleClickContact,
    handleClickCoffeeChat,
  };
};
