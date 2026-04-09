import { type AlumniContactsFilter } from '@/entities/alumni-contacts';

import { type NextSearchParams } from '@/shared/types';

import { AlumniContactsPage } from '@/_pages/alumni-contacts';

const Page = ({
  searchParams,
}: {
  searchParams: NextSearchParams<AlumniContactsFilter>;
}) => {
  return <AlumniContactsPage searchParams={searchParams} />;
};

export default Page;
