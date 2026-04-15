import { VStack } from '@causw/cds';

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
    <VStack align="center" gap="md" className="w-full py-7 md:py-0">
      <SettingProfileImageSection onNavigate={onNavigate} />
      <SettingProfileEditButton onNavigate={onNavigate} />
      <SettingActivitySection onNavigate={onNavigate} />
      <SettingAccountSection onNavigate={onNavigate} />
      <SettingSupportSection onNavigate={onNavigate} />
    </VStack>
  );
};
