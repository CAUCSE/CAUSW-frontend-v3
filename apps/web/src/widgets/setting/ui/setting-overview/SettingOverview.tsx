import { Suspense } from 'react';

import { VStack } from '@causw/cds';

import { SettingAccountSection } from './SettingAccountSection';
import { SettingActivitySection } from './SettingActivitySection';
import { SettingProfileEditButton } from './SettingProfileEditButton';
import { SettingProfileImageSection } from './SettingProfileImageSection';
import { SettingProfileImageSectionSkeleton } from './SettingProfileImageSectionSkeleton';
import { SettingSupportSection } from './SettingSupportSection';

export const SettingOverview = () => {
  return (
    <VStack align="center" gap="md" className="w-full">
      <Suspense fallback={<SettingProfileImageSectionSkeleton />}>
        <SettingProfileImageSection />
      </Suspense>
      <SettingProfileEditButton />
      <SettingActivitySection />
      <SettingAccountSection />
      <SettingSupportSection />
    </VStack>
  );
};
