'use client';

import {
  ALUMNI_CONTACTS_SCROLL_RESTORATION_STORAGE_KEY,
  type GetPaginatedAlumniContactsResponseDto,
  type AlumniContactsScrollRestorationState,
  type GetAlumniContactsQuery,
} from '@/entities/alumni-contacts';

import { useSessionStorage } from '@/shared/hooks';

type AlumniContactsListItem =
  GetPaginatedAlumniContactsResponseDto['content'][number];

export const useAlumniContactsScrollSave = () => {
  const [, setAlumniContactsScrollRestoration] =
    useSessionStorage<AlumniContactsScrollRestorationState>(
      ALUMNI_CONTACTS_SCROLL_RESTORATION_STORAGE_KEY.LIST,
      {
        alumniContactsId: '',
        query: {},
      },
      {
        initializeWithValue: false,
      },
    );

  const handleNavigateToAlumniContacts = (
    alumniContactsId: AlumniContactsListItem['id'],
    query: GetAlumniContactsQuery,
  ) => {
    setAlumniContactsScrollRestoration({
      alumniContactsId,
      query,
    });
  };

  return {
    handleNavigateToAlumniContacts,
  };
};
