import { ProfileEditButton } from '@/features/setting';

type SettingProfileEditButtonProps = {
  onNavigate: (href: string) => void;
};

export const SettingProfileEditButton = ({
  onNavigate,
}: SettingProfileEditButtonProps) => {
  return <ProfileEditButton onNavigate={onNavigate} />;
};
