'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { alumniContactsQueryOptions } from '@/entities/alumni-contacts';

import { AlumniContactsDetailHero } from '../alumni-contacts-detail-hero';
import { AlumniContactsDetailSection } from '../alumni-contacts-detail-section';

export const MyAlumniContactsMain = () => {
  const { data: myAlumniContacts } = useSuspenseQuery(
    alumniContactsQueryOptions.my(),
  );
  return (
    <>
      <AlumniContactsDetailHero alumniContactsDetail={myAlumniContacts} />
      <AlumniContactsDetailSection alumniContactsDetail={myAlumniContacts} />
    </>
  );
};
