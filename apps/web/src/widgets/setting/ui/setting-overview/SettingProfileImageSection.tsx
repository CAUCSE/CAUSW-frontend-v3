import { VStack } from '@causw/cds';

import { ProfileImageEditButton } from '@/features/setting';

import { ProfileIdentity } from '@/entities/setting';

import { SETTING_PROFILE_IDENTITY } from '../../config';

type SettingProfileImageSectionProps = {
  onNavigate: (href: string) => void;
};

export const SettingProfileImageSection = ({
  onNavigate,
}: SettingProfileImageSectionProps) => {
  return (
    <VStack align="center" gap="xs">
      <ProfileImageEditButton onNavigate={onNavigate} />

      <ProfileIdentity
        name={SETTING_PROFILE_IDENTITY.name}
        primaryInfo={SETTING_PROFILE_IDENTITY.primaryInfo}
        secondaryInfo={SETTING_PROFILE_IDENTITY.secondaryInfo}
      />
    </VStack>
  );
};
