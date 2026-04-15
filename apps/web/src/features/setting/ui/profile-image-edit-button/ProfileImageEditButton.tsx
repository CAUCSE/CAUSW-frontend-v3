import { Float, Pen } from '@causw/cds';

import type { UserProfileImageType } from '@/shared/types';
import { ProfileAvatar } from '@/shared/ui';

type ProfileImageEditButtonProps = {
  onClick: () => void;
  profileImageType: UserProfileImageType;
  profileImageUrl?: string | null;
};

export const ProfileImageEditButton = ({
  onClick,
  profileImageType,
  profileImageUrl,
}: ProfileImageEditButtonProps) => {
  return (
    <button
      type="button"
      className="relative cursor-pointer rounded-full transition-opacity hover:opacity-90 active:opacity-80"
      onClick={onClick}
    >
      <ProfileAvatar
        size="lg"
        profileImageType={profileImageType}
        profileImageUrl={profileImageUrl}
        className="my-1 shrink-0"
      />
      <Float floatType="absolute" right={0} bottom={0}>
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-black p-1.5">
          <Pen size={12} color="white" />
        </div>
      </Float>
    </button>
  );
};
