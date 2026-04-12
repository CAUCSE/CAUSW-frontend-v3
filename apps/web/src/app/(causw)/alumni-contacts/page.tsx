import { AlumniContactsListPage } from '@/_pages/alumni-contacts';

import { type AlumniContactsFilter } from '@/entities/alumni-contacts';

import { type NextSearchParams } from '@/shared/types';

export default function Page({
  searchParams,
}: {
  searchParams: NextSearchParams<AlumniContactsFilter>;
}) {
  return <AlumniContactsListPage searchParams={searchParams} />;
}
