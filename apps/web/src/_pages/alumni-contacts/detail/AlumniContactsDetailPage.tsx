'use client';

import React from 'react';

import { useSuspenseQuery } from '@tanstack/react-query';

import { VStack } from '@causw/cds';

import {
  AlumniContactsDetailHeader,
  AlumniContactsDetailHero,
  AlumniContactsDetailSection,
} from '@/widgets/alumni-contacts';

import { alumniContactsQueryOptions } from '@/entities/alumni-contacts';

interface AlumniContactsDetailPageProps {
  alumniContactsId: string;
}

export const AlumniContactsDetailPage = ({
  alumniContactsId,
}: AlumniContactsDetailPageProps) => {
  console.log({ alumniContactsId });

  const { data: alumniContactsDetail } = useSuspenseQuery(
    alumniContactsQueryOptions.detail({ alumniContactsId }),
  );

  console.log(alumniContactsDetail);

  return (
    <div className="flex size-full justify-center">
      <VStack className="w-full max-w-225 gap-0 md:px-8 md:py-6">
        <VStack
          gap="none"
          className="bg-[linear-gradient(180deg,#4C688F_0%,#1E2E3F_25.625rem,#fff_25.625rem,#fff_100%)] pt-4 md:rounded-t-lg"
        >
          <AlumniContactsDetailHeader alumniContactsId={alumniContactsId} />
          <AlumniContactsDetailHero
            alumniContactsDetail={alumniContactsDetail}
          />
          <AlumniContactsDetailSection
            alumniContactsDetail={alumniContactsDetail}
          />
        </VStack>
      </VStack>
    </div>
  );
};
