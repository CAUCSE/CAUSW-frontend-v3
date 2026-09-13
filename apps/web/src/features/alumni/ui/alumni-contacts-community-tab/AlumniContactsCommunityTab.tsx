'use client';

import { usePathname, useRouter } from 'next/navigation';

import { Tab } from '@causw/cds';

import {
  ALUMNI_CONTACTS_TAB,
  ALUMNI_CONTACTS_TAB_ROUTE,
  type AlumniContactsTabType,
} from '@/entities/alumni';

import { ROUTES } from '@/shared/constants';

export const AlumniContactsCommunityTab = () => {
  const router = useRouter();
  const pathname = usePathname();

  const currentTab = pathname.startsWith(ROUTES.COMMUNITY)
    ? ALUMNI_CONTACTS_TAB.COMMUNITY
    : ALUMNI_CONTACTS_TAB.ALUMNI;

  const handleTabChange = (value: string) => {
    router.push(ALUMNI_CONTACTS_TAB_ROUTE[value as AlumniContactsTabType]);
  };

  return (
    <Tab.Root
      variant="plain"
      value={currentTab}
      onValueChange={handleTabChange}
      className="px-1 py-2 md:px-0 md:pt-0"
    >
      <Tab.List>
        <Tab.TabItem value={ALUMNI_CONTACTS_TAB.ALUMNI}>동문수첩</Tab.TabItem>
        <Tab.TabItem value={ALUMNI_CONTACTS_TAB.COMMUNITY}>소통</Tab.TabItem>
      </Tab.List>
    </Tab.Root>
  );
};
