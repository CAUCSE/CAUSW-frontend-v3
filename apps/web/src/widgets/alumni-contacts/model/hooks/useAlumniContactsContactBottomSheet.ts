'use client';

import { useState } from 'react';

export const useAlumniContactsContactBottomSheet = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClickContact = () => {
    setIsOpen(true);
  };

  return {
    isOpen,
    setIsOpen,
    handleClickContact,
  };
};
