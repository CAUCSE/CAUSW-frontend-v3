import { Text } from '@causw/cds';

import { PROFILE_EDIT_HREF } from '@/entities/setting';

type ProfileEditButtonProps = {
  onNavigate: (href: string) => void;
};

const CARD_BUTTON_CLASS =
  'flex w-full cursor-pointer justify-center rounded-lg bg-white px-4 py-3 transition-colors hover:bg-gray-50 active:bg-gray-100';

export const ProfileEditButton = ({ onNavigate }: ProfileEditButtonProps) => {
  return (
    <button
      type="button"
      className={CARD_BUTTON_CLASS}
      onClick={() => onNavigate(PROFILE_EDIT_HREF)}
    >
      <Text
        typography="subtitle-18-bold"
        className="transition-colors hover:text-gray-700"
      >
        내 동문수첩 수정
      </Text>
    </button>
  );
};
