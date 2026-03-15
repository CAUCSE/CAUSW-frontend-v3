'use client';

import { use } from 'react';

import { useSuspenseQuery } from '@tanstack/react-query';

import { AlumniInfoWidget } from '@/widgets/alumni-contacts/ui';
import { AlumniDetailCard } from '@/widgets/alumni-contacts/ui/AlumniDetailCard';

import { alumniContactsQueryOptions } from '@/entities/alumni-contacts';

import { ContentLayout } from '@/shared/ui';

export function AlumniDetailPage({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = use(params);
  const { data: displayData } = useSuspenseQuery(
    alumniContactsQueryOptions.detail(userId),
  );

  return (
    <ContentLayout>
      <AlumniDetailCard data={displayData} />
      <AlumniInfoWidget data={displayData} />
    </ContentLayout>
  );
}
