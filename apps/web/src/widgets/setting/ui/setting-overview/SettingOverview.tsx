import { Flex, VStack } from '@causw/cds';

import { SettingAccountSection } from './SettingAccountSection';
import { SettingActivitySection } from './SettingActivitySection';
import { SettingProfileEditButton } from './SettingProfileEditButton';
import { SettingProfileImageSection } from './SettingProfileImageSection';
import { SettingSupportSection } from './SettingSupportSection';

type SettingOverviewProps = {
  onNavigate: (href: string) => void;
};

export const SettingOverview = ({ onNavigate }: SettingOverviewProps) => {
  return (
    <Flex justify="center">
      <VStack
        align="center"
        gap="md"
        className="w-full max-w-[900px] px-5 py-8 md:px-8 md:py-10"
      >
        <SettingProfileImageSection onNavigate={onNavigate} />
        <SettingProfileEditButton onNavigate={onNavigate} />
        <SettingActivitySection onNavigate={onNavigate} />
        <SettingAccountSection onNavigate={onNavigate} />
        <SettingSupportSection onNavigate={onNavigate} />
      </VStack>
    </Flex>
  );
};
