import { type AlumniContactsFilter } from '@/entities/alumni-contacts';

import { type NextSearchParams } from '@/shared/types';

import { AlumniContactsPage } from '@/_pages/alumni-contacts';

export default function Page({
  searchParams,
}: {
  searchParams: NextSearchParams<AlumniContactsFilter>;
}) {
  return <AlumniContactsPage searchParams={searchParams} />;
}
