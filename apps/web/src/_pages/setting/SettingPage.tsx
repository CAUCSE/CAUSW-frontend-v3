import { Suspense } from 'react';

import { VStack } from '@causw/cds';

import {
  SettingAccountSection,
  SettingProfileEditButton,
  SettingProfileImageSectionServerComponent,
  SettingProfileImageSectionSkeleton,
  SettingSupportSection,
} from '@/widgets/setting';

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
      {/* <SettingActivitySection /> */}
      <SettingAccountSection />
      <SettingSupportSection />
    </VStack>
  );
};
