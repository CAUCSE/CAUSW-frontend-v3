import { Suspense } from 'react';

import { Spacer, VStack } from '@causw/cds';

import {
  SettingAccountSection,
  SettingActivitySection,
  SettingProfileEditButton,
  SettingProfileImageSectionServerComponent,
  SettingProfileImageSectionSkeleton,
  SettingSupportSection,
} from '@/widgets/setting';

import { DesktopOnly, MobileOnly } from '@/shared/ui';

export const SettingPage = () => {
  return (
    <VStack
      align="center"
      gap="md"
      className="w-full px-5 py-7 md:px-0 md:py-0"
    >
      <Suspense fallback={<SettingProfileImageSectionSkeleton />}>
        <SettingProfileImageSectionServerComponent />
      </Suspense>
      <SettingProfileEditButton />
      <SettingActivitySection />
      <SettingAccountSection />
      <SettingSupportSection />
      <MobileOnly>
        <Spacer size={16} />
      </MobileOnly>
      <DesktopOnly>
        <Spacer size={4} />
      </DesktopOnly>
    </VStack>
  );
};
