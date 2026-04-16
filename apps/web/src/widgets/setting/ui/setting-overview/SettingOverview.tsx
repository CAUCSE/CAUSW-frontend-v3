import { VStack } from '@causw/cds';

import type { UserResponseDto } from '@/entities/auth';

import { SettingAccountSection } from './SettingAccountSection';
import { SettingActivitySection } from './SettingActivitySection';
import { SettingProfileEditButton } from './SettingProfileEditButton';
import { SettingProfileImageSection } from './SettingProfileImageSection';
import { SettingSupportSection } from './SettingSupportSection';

type SettingOverviewProps = {
  myInfo: UserResponseDto;
};

export const SettingOverview = ({ myInfo }: SettingOverviewProps) => {
  return (
    <VStack
      align="center"
      gap="md"
      className="w-full px-5 py-7 md:px-0 md:py-0"
    >
      <SettingProfileImageSection myInfo={myInfo} />
      <SettingProfileEditButton />
      <SettingActivitySection />
      <SettingAccountSection />
      <SettingSupportSection />
    </VStack>
  );
};
