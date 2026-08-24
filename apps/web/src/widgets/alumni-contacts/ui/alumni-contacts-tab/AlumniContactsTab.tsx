'use client';

import { usePathname, useRouter } from 'next/navigation';

import { Tab } from '@causw/cds';

import { ROUTES } from '@/shared/constants';

const ALUMNI_CONTACTS_TAB = {
  ALUMNI: 'alumni-contacts',
  COMMUNITY: 'community',
} as const;

const ALUMNI_CONTACTS_TAB_ROUTE: Record<string, string> = {
  [ALUMNI_CONTACTS_TAB.ALUMNI]: ROUTES.ALUMNI_CONTACTS,
  [ALUMNI_CONTACTS_TAB.COMMUNITY]: ROUTES.COMMUNITY,
};

export const AlumniContactsTab = () => {
  const router = useRouter();
  const pathname = usePathname();

  const currentTab = pathname.startsWith(ROUTES.COMMUNITY)
    ? ALUMNI_CONTACTS_TAB.COMMUNITY
    : ALUMNI_CONTACTS_TAB.ALUMNI;

  const handleTabChange = (value: string) => {
    router.push(ALUMNI_CONTACTS_TAB_ROUTE[value]);
  };

  return (
    <Tab.Root
      variant="plain"
      value={currentTab}
      onValueChange={handleTabChange}
      className="px-1 py-2 md:pt-0"
    >
      <Tab.List>
        <Tab.TabItem value={ALUMNI_CONTACTS_TAB.ALUMNI}>동문수첩</Tab.TabItem>
        {/* <Tab.TabItem value={ALUMNI_CONTACTS_TAB.COMMUNITY}>소통</Tab.TabItem> */}
      </Tab.List>
    </Tab.Root>
  );
};
