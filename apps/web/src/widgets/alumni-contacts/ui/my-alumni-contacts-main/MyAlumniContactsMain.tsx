'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { VStack } from '@causw/cds';

import {
  alumniContactsQueryOptions,
  useAlumniContactsHeaderBoundaryContext,
} from '@/entities/alumni-contacts';

import { AlumniContactsDetailHero } from '../alumni-contacts-detail-hero';
import { AlumniContactsDetailSection } from '../alumni-contacts-detail-section';

export const MyAlumniContactsMain = () => {
  const { data: myAlumniContacts } = useSuspenseQuery(
    alumniContactsQueryOptions.my(),
  );

  const { alumniContactsHeroRef } = useAlumniContactsHeaderBoundaryContext();

  return (
    <>
      <VStack
        className="bg-linear-to-b from-[#4C688F] to-[#1E2E3F]"
        ref={alumniContactsHeroRef}
      >
        <AlumniContactsDetailHero alumniContactsDetail={myAlumniContacts} />
      </VStack>
      <AlumniContactsDetailSection alumniContactsDetail={myAlumniContacts} />
    </>
  );
};
