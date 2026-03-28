import { AlumniContactsFilter } from '@/entities/alumni-contacts';

import { NextSearchParams } from '@/shared/types';

import { AlumniContactsPage } from '@/_pages/alumni-contacts';

export default function Page({
  searchParams,
}: {
  searchParams: NextSearchParams<AlumniContactsFilter>;
}) {
  return <AlumniContactsPage searchParams={searchParams} />;
}
