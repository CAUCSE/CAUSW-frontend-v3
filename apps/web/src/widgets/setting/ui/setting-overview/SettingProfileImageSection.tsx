import { VStack } from '@causw/cds';

import { ProfileImageEditButton } from '@/features/setting';

import { ProfileIdentity } from '@/entities/setting';

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
        name="이름"
        primaryInfo="이메일"
        secondaryInfo="이메일"
      />
    </VStack>
  );
};
