'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { alumniContactsQueryOptions } from '@/entities/alumni-contacts';

import { AlumniContactsDetailHero } from '../alumni-contacts-detail-hero';
import { AlumniContactsDetailSection } from '../alumni-contacts-detail-section';
interface AlumniContactsDetailMainProps {
  alumniContactsId: string;
}

export const AlumniContactsDetailMain = ({
  alumniContactsId,
}: AlumniContactsDetailMainProps) => {
  const { data: alumniContactsDetail } = useSuspenseQuery(
    alumniContactsQueryOptions.detail({ alumniContactsId }),
  );
  return (
    <>
      <AlumniContactsDetailHero alumniContactsDetail={alumniContactsDetail} />
      <AlumniContactsDetailSection
        alumniContactsDetail={alumniContactsDetail}
      />
    </>
  );
};
