'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { alumniContactsQueryOptions } from '@/entities/alumni-contacts';

export const useAlumniContactsCoffeeChatAvailableToggleButton = () => {
  const { data: myAlumniContacts } = useSuspenseQuery(
    alumniContactsQueryOptions.my(),
  );

  return {
    isCoffeeChatAvailable: myAlumniContacts.isCoffeeChatAvailable,
  };
};
