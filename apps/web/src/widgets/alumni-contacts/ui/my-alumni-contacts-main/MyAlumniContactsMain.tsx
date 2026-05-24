'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { VStack } from '@causw/cds';

import { alumniContactsQueryOptions } from '@/entities/alumni-contacts';

import { AlumniContactsDetailHero } from '../alumni-contacts-detail-hero';
import { AlumniContactsDetailSection } from '../alumni-contacts-detail-section';

export const MyAlumniContactsMain = () => {
  const { data: myAlumniContacts } = useSuspenseQuery(
    alumniContactsQueryOptions.my(),
  );

  return (
    <>
      <VStack className="bg-linear-to-b from-[#4C688F] to-[#1E2E3F]">
        <AlumniContactsDetailHero alumniContactsDetail={myAlumniContacts} />
      </VStack>
      <AlumniContactsDetailSection alumniContactsDetail={myAlumniContacts} />
    </>
  );
};
