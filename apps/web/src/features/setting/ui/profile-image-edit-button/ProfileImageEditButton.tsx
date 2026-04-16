import { Avatar, Float, Pen } from '@causw/cds';

import { PROFILE_EDIT_HREF } from '@/entities/setting';

type ProfileImageEditButtonProps = {
  onNavigate: (href: string) => void;
};

export const ProfileImageEditButton = ({
  onNavigate,
}: ProfileImageEditButtonProps) => {
  return (
    <button
      type="button"
      className="relative cursor-pointer rounded-full transition-opacity hover:opacity-90 active:opacity-80"
      onClick={() => onNavigate(PROFILE_EDIT_HREF)}
    >
      <Avatar size={120} className="my-1 shrink-0" />
      <Float floatType="absolute" right={0} bottom={0}>
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-black p-1.5">
          <Pen size={12} color="white" />
        </div>
      </Float>
    </button>
  );
};
